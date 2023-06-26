'use client'

import Comment from "./comment";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Delete, Get, Post } from "@/app/util/CommonCall";
import { toast } from "react-hot-toast";

const PostDetail = (props: any) => {
  const router: any = useRouter();
  const [detailList, setDetailList] = useState<any>([]);
  const [commentList, setCommentList] = useState<any>([]);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [inputType, setInputType] = useState<boolean>(true);
  const [comment, setComment] = useState<string>('');
  const [isLoding, setIsLoding] = useState<boolean>(true);
  const [likeStatus, setLikeStatus] = useState<any>();

  useEffect(() => {
    let mounted: any = true;

    if (mounted) {
      getDetail();
      getLikeStatus();
    }
    return function cleanup() {
      mounted = false;
    }
  }, [inputType, isLoding, likeStatus]);

  const getDetail = async () => {
    const result: any = await Get(`/api/v2/posts/${props.searchParams.id}`, {});

    if (result.status === 200) {
      setDetailList(result.data.data);
      setCommentList(result.data.data.comment);
      setTitle(result.data.data.title);
      setBody(result.data.data.body);
    }
  }

  const getUpdate = async () => {
    let param: any = new FormData();
    param.append('title', title);
    param.append('body', body);
    param.append('id', props.searchParams.id);

    const result: any = await Post(`/api/v2/posts/modify`, param);

    if (result.status === 200) {
      toast.success('글이 수정되었습니다.');
      setInputType(true);
    }
  }

  const getDelete = async () => {
    const result: any = await Delete(`/api/v2/posts/delete/${props.searchParams.id}`, {});

    if (result.status === 200) {
      toast.success('글이 삭제되었습니다.');
      router.push('/')
    }
  }

  const getCommentAdd = async () => {
    let params: any = new FormData();
    params.append('comment', comment);

    const result: any = await Post(`/api/v2/posts/create/comment/${props.searchParams.id}`, params);

    if (result.status === 200) {
      toast.success(`댓글이 등록되었습니다.`);
      setIsLoding(!isLoding);
    }
  }

  const getLikeStatus = async() => {
    const result: any = await Get(`/api/v2/posts/like/status/${props.searchParams.id}`, {});

    if(result.status === 200) {
      setLikeStatus(result.data.data);
    }
  }

  const getLike = async () => {
    const result: any = await Post(`/api/v2/posts/like/${props.searchParams.id}`, {});

    if (result.status === 200) {
      toast.success('좋아요를 눌렀습니다.');
      setIsLoding(!isLoding);
    }
  }

  const getUnLike = async () => {
    const result: any = await Delete(`/api/v2/posts/like/cancel/${props.searchParams.id}`, {});

    if (result.status === 200) {
      toast.success('좋아요가 취소되었습니다.');
      setIsLoding(!isLoding);
    }
  }

  return (
    <>
      <div>
        {
          inputType === true
            ?
            <>
              <div className='relative overflow-x-auto float-none pb-4'>
                <table className='
            border
                    w-full 
                    text-sm 
                    text-left 
                    text-gray-500 
                    dark:text-gray-400'>
                  <thead className='
                    text-xs 
                    text-gray-700 
                    uppercase 
                    bg-gray-100 
                    dark:bg-gray-700 
                    dark:text-gray-400'>
                  </thead>

                  <tbody className='text-xs'>
                    <tr className='dark:bg-gray-800 border ' >
                      <td scope="row" className="w-1/6 px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white bg-gray-300">제목</td>
                      <td className="w-5/6 px-6 py-4text-gray-700">{detailList.title}</td>
                    </tr>
                    <tr className='bg-white dark:bg-gray-800' >
                      <td scope="row" className="w-1/6 px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white bg-gray-300">내용</td>
                      <td className="h-40 px-6 py-4 text-gray-700">{detailList.body}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {
                likeStatus === 0
                  ?
                  <div className='pb-4'>
                    <button type='button' className='mr-2' onClick={() => { getLike(); }}>👍좋아요</button><span>{detailList.likeCount}</span>
                  </div>
                  :
                  <div className='pb-4'>
                    <span></span>
                    <span>👍{detailList.likeCount}&nbsp; &nbsp; &nbsp;</span><button type='button' onClick={() => { getUnLike(); }}>❌ 좋아요 취소</button>
                  </div>
              }

              <div className='content-center pb-4'>
                <button type="button" className="
                                  py-2.5 
                                  px-5 
                                  mr-2 
                                  mb-2 s
                                  text-sm 
                                  font-medium 
                                  text-white 
                                  focus:outline-none 
                                  bg-blue-500 
                                  rounded-md
                                  border-rose-500  
                                  hover:white"
                  onClick={() => { router.push('/'); }}>목록</button>
                <button type="button" className="
                                  py-2.5 
                                  px-5 
                                  mr-2 
                                  mb-2 s
                                  text-sm 
                                  font-medium 
                                  text-white 
                                  focus:outline-none 
                                  bg-rose-500 
                                  rounded-md
                                  border-rose-500  
                                  hover:white"
                  onClick={() => { setInputType(false); }}>수정</button>
                <button type="button" className="
                          py-2.5 
                          px-5 
                          mr-2 
                          mb-2 s
                          text-sm 
                          font-medium 
                          text-white 
                          focus:outline-none 
                          bg-gray-500 
                          rounded-md
                          border-rose-500  
                          hover:white"
                  onClick={() => { getDelete(); }}>삭제</button>
              </div>

              <div className='pb-4'>
                <input type='text'
                  className='
              mt-1 mr-4 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                  size={50} onChange={(e: any) => { setComment(e.target.value); }} />
                <button type="button" className="
                            py-2 
                            px-3 
                            mr-2 
                            mb-2 s
                            text-xs
                            text-gray-500 
                            focus:outline-none 
                            border
                            border-blue-500
                            rounded-md
                            border-rose-500  
                            hover:white"
                  onClick={() => { getCommentAdd(); }}>댓글 등록</button>
              </div>
              {
                commentList && commentList.map((i: any, idx: any) => (
                  <div key={idx}>
                    <Comment list={i} />
                  </div>
                ))
              }
            </>
            :
            <>
              <div className='relative overflow-x-auto float-none pb-4'>
                <table className='
            border
                    w-full 
                    text-sm 
                    text-left 
                    text-gray-500 
                    dark:text-gray-400'>
                  <thead className='
                    text-xs 
                    text-gray-700 
                    uppercase 
                    bg-gray-100 
                    dark:bg-gray-700 
                    dark:text-gray-400'>
                  </thead>

                  <tbody className='text-xs'>
                    <tr className='dark:bg-gray-800 border ' >
                      <td scope="row" className="w-1/6 px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white bg-gray-300">제목</td>
                      <td className="w-5/6 px-6 py-4text-gray-700">
                        <input type='text' value={title} onChange={(e: any) => { setTitle(e.target.value); }} />
                      </td>
                    </tr>
                    <tr className='bg-white dark:bg-gray-800' >
                      <td scope="row" className="w-1/6 px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white bg-gray-300">내용</td>
                      <td className="h-40 px-6 py-4 text-gray-700">
                        <input type='text' value={body} onChange={(e: any) => { setBody(e.target.value); }} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='content-center pb-4'>
                <button type="button" className="
                                  py-2.5 
                                  px-5 
                                  mr-2 
                                  mb-2 s
                                  text-sm 
                                  font-medium s
                                  text-white 
                                  focus:outline-none 
                                  bg-blue-500 
                                  rounded-md
                                  border-rose-500  
                                  hover:white"
                  onClick={() => { setInputType(true); }}>취소</button>
                <button type="button" className="
                                  py-2.5 
                                  px-5 
                                  mr-2 
                                  mb-2 s
                                  text-sm 
                                  font-medium 
                                  text-white 
                                  focus:outline-none 
                                  bg-rose-500 
                                  rounded-md
                                  border-rose-500  
                                  hover:white"
                  onClick={() => { getUpdate(); }}>저장</button>
              </div>
            </>
        }
      </div>
    </>
  )
}
export default PostDetail;