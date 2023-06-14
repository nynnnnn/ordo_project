'use client'

import Link from "next/link";
import { Table } from 'react-bootstrap';
import { Get } from "../../util/CommonCall"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

function ListMain() {
     const router = useRouter();
     const [conList, setConList] = useState<any>([]);

     useEffect(() => {
          let mounted: any = true;

          if (mounted) {
               getPost();
          }
          return function cleanup() {
               mounted = false;
          }
     }, []);

     // 목록 조회
     const getPost = async () => {
          const result: any = await Get(`/api/v1/posts`, {});

          if (result.status === 200) {
               setConList(result.data.result.content);
          } else {
               console.log('error :::')
          }
     }

     // 등록 페이지 이동
     const postAdd = () => {
          router.push(`/post/add`)
     }

     return (
          <>
               <div className=''>
                    <div>
                         <button type='button' className='btn btn-primary' onClick={() => { postAdd(); }}>등록</button>
                    </div>
                    <div className=''>
                         <Table className='table table-bordered table-hover text-center'>
                              <thead>
                                   <tr>
                                        <th>ID</th>
                                        <th>제목</th>
                                        <th>내용</th>
                                        <th>작성자</th>
                                        <th>작성일시</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        conList && conList.map((item: any, index: any) => (
                                             <tr className='tr-2' key={index}>
                                                  <td>{item.id}</td>
                                                  <td>
                                                       <Link
                                                            href={{
                                                                 pathname: '/post/detail',
                                                                 query: {
                                                                      id: item.id,
                                                                 },
                                                            }}
                                                       >
                                                            {item.title}
                                                       </Link>
                                                  </td>
                                                  <td>{item.body}</td>
                                                  <td>{item.userName}</td>
                                                  <td>{item.createdAt}</td>
                                             </tr>
                                        ))
                                   }
                              </tbody>
                         </Table>
                    </div>
               </div>
          </>
     )
}
export default ListMain;