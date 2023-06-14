'use client'

import { Post } from '@/app/util/CommonCall';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

function AddMain() {
     const router = useRouter();
     const [title, setTitle] = useState<string>('');
     const [content, setContent] = useState<string>('');

     const getAdd = async() => {
          let param: any = new FormData();
          param.append('title', title);
          param.append('body', content);

          const result: any = await Post(`/api/v1/posts`, param);

          if(result.status === 200) {
               alert('등록 성공');
               router.push('/post/list')
          }else {
               console.log('error!!!');
          }
     }

     const back = () => {
          router.push('/post/list')
     }

     return (
          <>
               <div>
                    <div>
                         <label className=''>제목 :</label>
                         <input type='text' className='' onChange={(e: any) => { setTitle(e.target.value); }} />
                    </div>
                    <div>
                         <label className=''>내용: </label>
                         <textarea className='' onChange={(e: any) => { setContent(e.target.value); }}></textarea>
                    </div>
                    <div>
                         <button type='button' className='' onClick={() => { back(); }}>뒤로가기</button>
                         <button type='button' className='' onClick={() => { getAdd(); }}>등록</button>
                    </div>
               </div>
          </>
     )
}
export default AddMain;