'use client'

import { Delete, Get, Post } from "@/app/util/CommonCall";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Comment = (props: any) => {
   const [commentList, setCommentList] = useState<any>([]);
   const [comment, setComment] = useState<string>('');
   const [commentType, setCommentType] = useState<boolean>(true);
   const [isLoding, setIsLoding] = useState<boolean>(true);
   const [IDX, setIDX] = useState<number>();

   useEffect(() => {
      let mounted: any = true;

      if (mounted) {
         getComment();
      }
      return function cleanup() {
         mounted = false;
      }
   }, [commentType, isLoding]);

   const getComment = async () => {
      const result: any = await Get(`/api/v2/posts/${props.id}`, {});

      if (result.status === 200) {
         setCommentList(result.data.data.comment);
      }
   }

   const getCommentAdd = async () => {
      let params: any = new FormData();
      params.append('comment', comment);

      const result: any = await Post(`/api/v2/posts/create/comment/${props.id}`, params);

      if (result.status === 200) {
         toast.success(`댓글이 등록되었습니다.`);
         setIsLoding(!isLoding);
      }
   }

   const getCommentUpdate = async (commentId: any) => {
      let params: any = new FormData();
      params.append('comment', comment);

      const result = await Post(`/api/v2/posts/modify/comment/${commentId}`, params);

      if (result.status === 200) {
         toast.success('댓글이 수정되었습니다.');
         setCommentType(true);
      }
   }

   const getCommentDelete = async (commentId: any) => {
      const result: any = await Delete(`/api/v2/posts/delete/comment/${commentId}`, {});

      if (result.status === 200) {
         toast.success(`댓글이 삭제되었습니다.`);
         setIsLoding(!isLoding);
      }
   }

   return (
      <>
         <div>
            {
               commentList && commentList.map((i: any, idx: any) => (
                  <div key={idx}>
                     {
                        commentType
                           ?
                           <div className="pr-4 inline-block">
                              <strong>{i.userName}</strong><span>{i.comment}</span>
                              <button type='button' className="border" onClick={() => { setCommentType(false); setIDX(i.id); }}>수정 {idx}</button>
                              <button type='button' className="border" onClick={() => { getCommentDelete(i.id)}}>삭제</button>
                           </div>
                           :
                           IDX !== i.id
                              ?
                              <div className="pr-4 inline-block">
                                 <strong>{i.userName}</strong><span>{i.comment}</span>
                                 <button type='button' className="border" onClick={() => { setCommentType(false); setIDX(i.id); }}>수정 {idx}</button>
                                 <button type='button' className="border" onClick={() => { getCommentDelete(i.id)}}>삭제</button>
                              </div>
                              :
                              <div className="pr-4 inline-block">
                                 <strong>{i.userName}</strong><input type='text' className="border pr-4" onChange={(e: any) => { setComment(e.target.value); }}></input>
                                 <button type='button' className="border" onClick={() => { getCommentUpdate(i.id); }}>저장 {idx} </button>
                                 <button type='button' className="border" onClick={() => { setCommentType(true); }}>취소</button>
                              </div>
                     }

                     
                  </div>
               ))
            }
         </div>
         <div>
            <input type='text' className="border" onChange={(e: any) => { setComment(e.target.value); }} />
            <button type='button' onClick={() => { getCommentAdd(); }}>등록</button>
         </div>
      </>
   )
}
export default Comment;