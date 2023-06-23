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
         <div>
            <div>
               <label>제목:</label><input type='text' onChange={(e: any) => { setTitle(e.target.value); }} />
            </div>
            <div>
               <label>내용:</label><input type='text' onChange={(e: any) => { setBody(e.target.value); }} />
            </div>
            <div>
               <button type='button' onClick={() => { router.push('/'); }}>뒤로가기</button>
            </div>
            <div>
               <button type='button' onClick={() => { getPostAdd(); }}>추가</button>
            </div>
         </div>
      </>
   )

}
export default PostAdd;