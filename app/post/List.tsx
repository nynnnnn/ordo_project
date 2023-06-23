'use client'

import hookUserLogin from "@/app/hooks/useLoginModal";
import { cUser } from "@/app/types";
import { Delete, Get } from "@/app/util/CommonCall";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

interface ListProps {
  currentUser?: cUser | null;
}

const List: React.FC<ListProps> = ({ currentUser }) => {
  const router = useRouter();
  const loginModal = hookUserLogin();

  const [postList, setPostList] = useState<any>([]);
  const [postDetailList, setPostDetailList] = useState<any>([]);
  const [ID, setID] = useState<string>('');

  useEffect(() => {
    let mounted: any = true;

    if (mounted) {
      getPostList();
      ID !== undefined && getPostDetailList();
    }
    return function cleanup() {
      mounted = false;
    }
  }, [ID]);

  const getPostList = async () => {
    const result: any = await Get(`/api/v2/posts`, {});

    if (result.status === 200) {
      setPostList(result.data.data.content);
    }
  }

  const getPostDetailList = async () => {
    const result: any = await Get(`/api/v2/posts/${ID}`, {});

    if (result.status === 200) {
      setPostDetailList(result.data.data);
    }
  }

  return (
    <>
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
          onClick={() => { currentUser ? router.push('/post/add') : loginModal.onOpen() }}>Create</button>
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
            {postList && postList.map((i: any, idx: any) => (
              <tr className='bg-white dark:bg-gray-800' key={idx}>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{i.id}</td>
                <td className="px-6 py-4">
                  <Link href={{
                    pathname: '/post/detail',
                    query: {
                      id: i.id
                    }
                  }}>{i.title}</Link>
                </td>
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