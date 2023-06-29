'use client'

import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Delete, Get, Post } from "@/app/util/CommonCall";

const Comment = (props: any) => {
   const [commentType, setCommentType] = useState<boolean>(true);
   const [isLoding, setIsLoding] = useState<boolean>(true);
   const [comment, setComment] = useState<string>(props.list.comment);
   const [user, setUser] = useState<string>(props.list.userName)
   const [tokenUserName, setTokenUserName] = useState<string>(props.tokenUserName);
   const [commentUserName, setCommentUserName] = useState<string>(props.commentUserName);

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
         setIsLoding(!isLoding)
      }
   }

   return (
      <>
         <div className='pb-4'>
            {
               commentType === true
                  ?
                  <>
                     <span className="
                    border w-full 
                    text-sm 
                    text-left 
                    text-gray-500 
                    dark:text-gray-400
                    mr-3"
                     >{user}</span>

                     <span className="
                    border w-full 
                    text-sm 
                    text-left 
                    text-gray-500 
                    dark:text-gray-400
                    mr-10"
                     >{comment}</span>

                     {
                        tokenUserName === commentUserName
                           ?
                           <>
                              <button type="button" className="
                                                      py-2 
                                                      px-3 
                                                      mr-2 
                                                      mb-2 s
                                                      text-xs
                                                      text-gray-500
                                                      focus:outline-none 
                                                      border
                                                      border-gray-500 
                                                      rounded-md
                                                      border-gray-500  
                                                      hover:white"
                                 onClick={() => { setCommentType(false); }}>댓글 수정</button>
                              <button type="button" className="
                                                      py-2 
                                                      px-3 
                                                      mr-2 
                                                      mb-2 s
                                                      text-xs
                                                      text-gray-500
                                                      focus:outline-none 
                                                      border
                                                      border-gray-500 
                                                      rounded-md
                                                      border-gray-500  
                                                      hover:white"
                                 onClick={() => { getCommentDelete(props.list.id); }}>댓글 삭제</button>
                           </>
                           :
                           null
                     }

                  </>
                  :
                  <>
                     <input type='text'
                        className='
                        mt-1 mr-4 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                        size={50} value={comment} onChange={(e: any) => { setComment(e.target.value); }}
                     />
                     <button type="button" className="
                    py-2 
                    px-3 
                    mr-2 
                    mb-2 s
                    text-xs
                    text-gray-500
                    focus:outline-none 
                    border
                    border-gray-500 
                    rounded-md
                    border-gray-500  
                    hover:white"
                        onClick={() => { getCommentUpdate(props.list.id); }}>댓글 저장</button>
                     <button type="button" className="
                    py-2 
                    px-3 
                    mr-2 
                    mb-2 s
                    text-xs
                    text-gray-500
                    focus:outline-none 
                    border
                    border-gray-5000 
                    rounded-md
                    border-gray-500  
                    hover:white"
                        onClick={() => { setCommentType(true); }}>취소</button>
                  </>
            }
         </div>
      </>
   )
}
export default Comment;
