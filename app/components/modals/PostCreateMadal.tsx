'use client'

import Modal from "./Modal";
import Input from "../inputs/Input";
import postCreateModal from "@/app/hooks/postCreateModal";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Post } from "@/app/util/CommonCall";
import { useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";

const PostCreateMadal = () => {
  const router = useRouter();
  const createModal = postCreateModal();

  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      body: ''
    },
  });

  // 글 등록
  const getPostCreate: SubmitHandler<FieldValues> = async (data) => {
    let params = new FormData();
    params.append('title', data.title);
    params.append('body', data.body);

    const result = await Post(`/api/v2/posts/create`, params);

    if (result.status === 200) {
      console.log(result);
      toast.success('글이 등록되었습니다.')
      router.refresh();
      createModal.onClose();
    }
  }

  // content
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="title"
        label="제목"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="body"
        label="내용"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={createModal.isOpen}
      title="Post Create"
      actionLabel="Create"
      onClose={createModal.onClose}
      onSubmit={handleSubmit(getPostCreate)}
      body={bodyContent}
    />
  );
}

export default PostCreateMadal;
