'use client';

import axios from "axios";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import Cookies from "js-cookie";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const params = new FormData();
    params.append('userName', data.email);
    params.append('password', data.password);

    await axios({
      method: 'POST',
      url: 'http://api.ordo.net:8090/api/v2/users/login',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: params
    })
      .then(function (response) {
        console.log('response :::', response);

        const token: string = response.data.data.result.jwt.accessToken;
        Cookies.set('access_token', token);
        localStorage.setItem('access_token', token);

        toast.success('로그인 성공');   
        router.refresh();               
        loginModal.onClose();           
      })
      .catch((error) => {
        console.log("error ::::: ");
        console.log(error);
        toast.error(error.response.data.result.message);
      });
  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>If you are not yet a member!
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
              font-bold
            "
          > Sign up</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}               
      isOpen={loginModal.isOpen}         
      title="Login"                     
      actionLabel="Continue"              
      onClose={loginModal.onClose}       
      onSubmit={handleSubmit(onSubmit)}   
      body={bodyContent}                 
      footer={footerContent}             
    />
  );
}

export default LoginModal;
