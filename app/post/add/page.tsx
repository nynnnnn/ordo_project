'use client'

import { Post } from '@/app/util/CommonCall';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const PostAdd = () => {
   const router: any = useRouter();

   const [tite, setTitle] = useState<string>('');
   const [body, setBody] = useState<string>('');

   const getPostAdd = async () => {
      let param: any = new FormData();
      param.append('title', tite);
      param.append('body', body);

      const result: any = await Post(`/api/v2/posts/create`, param);

      if (result.status === 200) {
         toast.success('글이 등록되었습니다.');
         router.push('/');
      }
   }

   return (
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
                     <input className="h-10 w-5/6 px-6 py-4text-gray-700" type='text' onChange={(e: any) => { setTitle(e.target.value); }} />
                  </tr>
                  <tr className='bg-white dark:bg-gray-800' >
                     <td scope="row" className="w-1/6 px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white bg-gray-300">내용</td>
                     <input className="w-5/6 h-40 px-6 py-4 text-gray-700" type='text' onChange={(e: any) => { setBody(e.target.value); }}></input>
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
               onClick={() => { getPostAdd(); }}>등록</button>
         </div>
      </>
   )

}
export default PostAdd;