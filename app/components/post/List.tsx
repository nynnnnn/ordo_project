'use client'

import PostCreateMadal from "../modals/PostCreateMadal";
import PostDetailModal from "../modals/PostDetailMadal";
import useLoginModal from "@/app/hooks/useLoginModal";
import postCreateModal from "@/app/hooks/postCreateModal";
import postDetailModal from "@/app/hooks/postDetailModal";

import { cUser } from "@/app/types";
import { Get } from "@/app/util/CommonCall";
import { useState, useEffect, useCallback } from 'react';

interface ListProps {
  currentUser?: cUser | null;
}

const List: React.FC<ListProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();               // login 팝업
  const postModal = postCreateModal();              // 글 추가 모달      
  const detailModal = postDetailModal();            // 상세 모달
  const [postArr, setPostArr] = useState<any>([]);  // 게시판 조회 리스트
  const [ID, setID] = useState<any>();

  useEffect(() => {
    let mounted: any = true;

    if (mounted) {
      getPostList();
    }
    return function cleanup() {
      mounted = false;
    }
  }, []);

  // 게시판 목록 조회
  const getPostList = async () => {
    const result = await Get(`/api/v2/posts`, {});

    if (result.status === 200) {
      setPostArr(result.data.data.content);
    }
  }

  return (
    <>
      <PostCreateMadal />
      <PostDetailModal ID={ID}/>
      <div>
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
          onClick={() => { currentUser ? postModal.onOpen() : loginModal.onOpen() }}>Create</button>
      </div>
      <div className='relative overflow-x-auto float-none'>
        <table className='
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
            <tr>
              <th scope="col" className="px-6 py-3 rounded-l-lg">번호</th>
              <th scope="col" className="px-6 py-3">제목</th>
              <th scope="col" className="px-6 py-3">내용</th>
              <th scope="col" className="px-6 py-3">작성자</th>
              <th scope="col" className="px-6 py-3 rounded-r-lg">작성일시</th>
            </tr>
          </thead>
          <tbody className='text-xs'>
            {postArr && postArr.map((i: any, idx: any) => (
              <tr className='bg-white dark:bg-gray-800' key={idx}>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{i.id}</td>
                <td className="px-6 py-4"><a href="#" onClick={() => { detailModal.onOpen(); setID(i.id); }}>{i.title}</a></td>
                <td className="px-6 py-4">{i.body}</td>
                <td className="px-6 py-4">{i.userName}</td>
                <td className="px-6 py-4">{i.createdAt}</td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default List;