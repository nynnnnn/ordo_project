'use client'

import { Delete, Get } from '@/app/util/CommonCall';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function PostDetail(props: any) {
     const router = useRouter();
     const [detailList, setDetailList] = useState<any>([]);

     useEffect(() => {
          let mounted: any = true;

          if (mounted) {
               getDetail();
          }
          return function cleanup() {
               mounted = false;
          }
     }, []);

     const getDetail = async () => {
          const result: any = await Get(`/api/v1/posts/detail/${props.searchParams.id}`, {});

          if (result.status === 200) {
               setDetailList(result.data.result);
          }
     }

     const back = () => {
          router.push('/post/list');
     }

     const del = async () => {
          const result: any = await Delete(`/api/v1/posts/${props.searchParams.id}`, {});

          if (result.status === 200) {
               alert('삭제 성공')
               router.push('/post/list');
          } else {
               console.log('error!!!');
          }
     }

     const update = () => {
          router.push(`/post/update?id=${props.searchParams.id}`);
     }

     return (
          <>
               <div>
                    <div>
                         <table>
                              <tbody>
                                   <tr>
                                        <th>NO</th>
                                        <td>{detailList.id}</td>
                                   </tr>
                                   <tr>
                                        <th>제목</th>
                                        <td>{detailList.title}</td>
                                   </tr>
                                   <tr>
                                        <th>내용</th>
                                        <td>{detailList.body}</td>
                                   </tr>
                                   <tr>
                                        <th>작성자</th>
                                        <td>{detailList.userName}</td>
                                   </tr>
                                   <tr>
                                        <th>작성일시</th>
                                        <td>{detailList.createdAt}</td>
                                   </tr>
                              </tbody>
                         </table>
                    </div>
                    <div>
                         <button type='button' className='' onClick={() => { back(); }} >목록</button>
                         <button type='button' className='' onClick={() => { update(); }} >수정</button>
                         <button type='button' className='' onClick={() => { del(); }} >삭제</button>
                    </div>
               </div>
          </>
     )
}
export default PostDetail;