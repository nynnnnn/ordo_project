'use client'

import TextModal from "./TextModal";
import postCreateModal from "@/app/hooks/postAddModal";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Post } from "@/app/util/CommonCall";
import { useState } from "react";

const PostAddMadal = () => {
  const router = useRouter();
  const createModal = postCreateModal();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const getPostCreate = async () => {
    let params = new FormData();
    params.append('title', title);
    params.append('body', body);

    const result = await Post(`/api/v2/posts/create`, params);

    if (result.status === 200) {
      toast.success('글이 등록되었습니다.')
      window.location.reload();
      createModal.onClose();
    }
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <p>
        <label>제목 :</label>
        <input type='text' className='' onChange={(e: any) => { setTitle(e.target.value); }} />
      </p>
      <p>
        <label>내용 :</label>
        <textarea className='' onChange={(e: any) => { setBody(e.target.value); }} />
      </p>
      <button type='button' className='' onClick={() => { getPostCreate(); }} >등록</button>
    </div>
  )

  return (
    <TextModal
      disabled={isLoading}
      isOpen={createModal.isOpen}
      title="Post Create"
      onClose={createModal.onClose}
      body={bodyContent}
    />
  );
}

export default PostAddMadal;
