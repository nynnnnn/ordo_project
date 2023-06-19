'use client'

import TextModal from "./TextModal";
import Input from "../inputs/Input";
import postDetailModal from "@/app/hooks/postDetailModal";

import { toast } from "react-hot-toast";
import { Get, Post } from "@/app/util/CommonCall";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PostDetailModal = (props: any) => {
  const router = useRouter();
  const detailModal = postDetailModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detailList, setDetailList] = useState<any>({});

  useEffect(() => {
    let mounted: any = true;

    if (mounted) {
      getPostDetail();
    }
    return function cleanup() {
      mounted = false;
    }
  }, []);

  // 상새 글 조회
  const getPostDetail = async () => {
    const result = await Get(`/api/v2/posts/${props.ID}`, {});

    if (result.status === 200) {
      setDetailList(result.data.data)
    }
  }

  // content
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <label>제목: </label><p id="title">{detailList.title}</p>
      <label>내용: </label><p id="body">{detailList.body}</p>
    </div>
  )

  return (
    <>
    <TextModal
      disabled={isLoading}
      isOpen={detailModal.isOpen}
      title="Post Detail"
      onClose={detailModal.onClose}
      body={bodyContent}
    />
    </>
  );
}

export default PostDetailModal;


