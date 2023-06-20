'use client'

import TextModal from "./TextModal";
import hookPostDetail from "@/app/hooks/postDetailModal";

import { toast } from "react-hot-toast";
import { Delete, Get, Post } from "@/app/util/CommonCall";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PostDetailModal = (props: any) => {
  const postDetailModal = hookPostDetail();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputType, setInputType] = useState<boolean>(true);

  const [postDetailList, setPostDetailList] = useState<any>([]);
  const [commentList, setCommentList] = useState<any>([]);
  const [comment, setComment] = useState<string>('');

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [postId, setPostId] = useState<string>('');
  const [commentType, setCommentType] = useState<boolean>(true);

  useEffect(() => {
    let mounted: any = true;

    if (mounted) {
      props.ID !== undefined && getPostDetailList();
    }
    return function cleanup() {
      mounted = false;
    }
  }, [props.ID]);

  const getPostDetailList = async () => {
    const result: any = await Get(`/api/v2/posts/${props.ID}`, {})

    if (result.status === 200) {
      setPostDetailList(result.data.data);
      setPostId(result.data.data.id);
      setTitle(result.data.data.title);
      setBody(result.data.data.body);

      setCommentList(result.data.data.comment);
    }
  }

  const getPostDelete = async () => {
    const result: any = await Delete(`/api/v2/posts/delete/${props.ID}`, {});

    if (result.status === 200) {
      toast.success(`글이 삭제되었습니다.`);
      postDetailModal.onClose();
      window.location.reload();
    }
  }

  const getPostUpdate = async() => {
    let params: any = new FormData();
    params.append('title', title);
    params.append('body', body);
    params.append('id', postId);

    const result: any = await Post(`/api/v2/posts/modify`, params);

    if(result.status === 200) {
      toast.success(`수정이 완료되었습니다.`);
      setInputType(true);
    }
  }

  const getCommentAdd = async () => {
    let params: any = new FormData();
    params.append('comment', comment);

    const result: any = await Post(`/api/v2/posts/create/comment/${props.ID}`, params);

    if (result.status === 200) {
      toast.success(`댓글이 등록되었습니다.`)
    }
  }

  const getCommentDelete = async(commentId: any) => {
    const result: any = await Delete(`/api/v2/posts/delete/comment/${commentId}`, {});

    if(result.status === 200) {
      toast.success(`댓글이 삭제되었습니다.`);
    }
  }

  const bodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <p id="title"><label>제목: </label>{postDetailList.title}</p>
        <p id="body"><label>내용: </label>{postDetailList.body}</p>
      </div>
      <div>
        <button className="" type="button" onClick={() => { getPostDelete(); }}>삭제</button>
        <button className="" type="button" onClick={() => { setInputType(false); }}>수정</button>
      </div>
    </>
  )

  const updateContent = (
    <>
      <div className="flex flex-col gap-4">
        제목: <input type="text" value={title} onChange={(e: any) => { setTitle(e.target.value) }}></input>
        내용: <input type="text" value={body} onChange={(e: any) => { setBody(e.target.value) }}></input>
      </div>
      <div>
        <button className="" type="button" onClick={() => { getPostUpdate(); }}>확인</button>
      </div>
    </>
  )

  const bodycomment = (
    <>
      <div>
        {
          commentList && commentList.map((i: any, index: any) => (
            <div key={index}>
              <p>{i.comment}</p>
              <p>{i.lastModifiedAt}</p>
              <p>{i.userName}</p>
              <button type='button' className="" onClick={() => { getCommentDelete(i.id); }}>댓글 삭제</button>
              <button type='button' className="" onClick={() => {  }}>댓글 수정</button>
            </div>
          ))
        }
      </div>
      <div>
        <input type='text' className="" onChange={(e: any) => { setComment(e.target.value); }} />
        <button type='button' className="" onClick={() => { getCommentAdd(); }}>댓글 등록</button>
      </div>
    </>
  )

  return (
    <>
      <TextModal
        disabled={isLoading}
        isOpen={postDetailModal.isOpen}
        title="Post Detail"
        onClose={postDetailModal.onClose}
        body={inputType === true ? bodyContent : updateContent}
        footer={inputType === true ? bodycomment : <></>}
      />
    </>
  );
}
export default PostDetailModal;