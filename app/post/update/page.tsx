'use client'

import { Get, Post, Put } from '@/app/util/CommonCall';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';



function PostUpdate(props: any) {
     const router = useRouter();
     
     const [no, setNo] = useState<string>(props.searchParams.id);
     const [title, setTitle] = useState<string>('');
     const [content, setContent] = useState<string>('');
     const [name, setName] = useState<string>('');
     const [createAt, setCreateAt] = useState<string>('');

     useEffect(() => {
          let mounted: any = true;

          if(mounted) {
               getDetail();
          }
          return function cleanup() {
               mounted = false;
          }
     }, []);

     const getDetail = async() => {
          const result: any = await Get(`/api/v1/posts/detail/${no}`, {});

          if(result.status === 200) {
               setTitle(result.data.result.title);
               setContent(result.data.result.body);
               setName(result.data.result.userName);
               setCreateAt(result.data.result.createdAt);
          }
     }

     const getUpdate = async() => {
          let dto: any = {
               title: title,
               body: content
          }

          const result: any = await Put(`/api/v1/posts/${no}`, dto);

          if(result.status === 200) {
               console.log(result);
               alert('수정 성공');
               router.push('/post/list');
          }else {
               console.log('error!!!');
          }
     }

     const back = () => {
          router.push('/post/list');
     }

     return (
          <>
               <div>
                    <div>
                         <label className=''>NO :</label>
                         <input type='text' className='' value={no} disabled={true}/>
                    </div>
                    <div>
                         <label className=''>제목 :</label>
                         <input type='text' className='' value={title} onChange={(e: any) => { setTitle(e.target.value); }} />
                    </div>
                    <div>
                         <label className=''>내용: </label>
                         <textarea className='' value={content} onChange={(e: any) => { setContent(e.target.value); }}></textarea>
                    </div>
                    <div>
                         <label className=''>작성자: </label>
                         <textarea className='' value={name} disabled={true}></textarea>
                    </div>
                    <div>
                         <label className=''>작성일시: </label>
                         <textarea className='' value={createAt} disabled={true}></textarea>
                    </div>
                    <div>
                         <button type='button' className='' onClick={() => { back(); }}>뒤로가기</button>
                         <button type='button' className='' onClick={() => { getUpdate(); }}>수정</button>
                    </div>
               </div>
          </>
     )
}
export default PostUpdate;