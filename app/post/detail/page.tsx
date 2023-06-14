'use client'

import { Delete, Get, Post, Put } from '@/app/util/CommonCall';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function PostDetail(props: any) {
     const router = useRouter();
     const [detailList, setDetailList] = useState<any>([]);

     const [commentsList, setCommentsList] = useState<any>([]);
     const [comment, setComment] = useState<string>('');
     const [commentType, setCommentType] = useState<boolean>(true);

     const [likeCount, setLikeCount] = useState<any>('');
     const [id, setId] = useState<any>();
     const [postId, setPostId] = useState<any>();
     
     useEffect(() => {
          let mounted: any = true;

          if (mounted) {
               getDetail();
               setCommentType(true);
          }
          return function cleanup() {
               mounted = false;
          }
     }, []);

     // 상세 조회
     const getDetail = async () => {
          const result: any = await Get(`/api/v1/posts/detail/${props.searchParams.id}`, {});

          if (result.status === 200) {
               setDetailList(result.data.result);
               getComment();
               getLikeCount();
          }
     }

     // 뒤로가기
     const back = () => {
          router.push('/post/list');
     }

     // 삭제
     const getDelete = async () => {
          const result: any = await Delete(`/api/v1/posts/${props.searchParams.id}`, {});

          if (result.status === 200) {
               alert('삭제 성공')
               router.push('/post/list');
          } else {
               console.log('error!!!');
          }
     }

     // 수정 페이지 이동
     const getUpdate = () => {
          router.push(`/post/update?id=${props.searchParams.id}`);
     }

     // 댓글 조회
     const getComment = async () => {
          const result: any = await Get(`/api/v1/posts/${props.searchParams.id}/comments`, {});
          console.log('id :::', props.searchParams.id);

          if (result.status === 200) {
               setCommentsList(result.data.result.content);
               setId(result.data.result.content.id);
               setPostId(result.data.result.content.postId);
          }
     }

     // 댓글 등록
     const getCommentAdd = async () => {
          let param: any = new FormData();
          param.append('comment', comment);

          const result: any = await Post(`/api/v1/posts/${props.searchParams.id}/comments`, param);

          if (result.status === 200) {
               alert('댓글이 등록되었습니다.')
               location.reload();
          }
     }

     // 댓글 수정
     const getCommentUpdate = async (id: any, postId: any) => {
          let param: any = new FormData();
          param.append('comment', comment);

          const result: any = await Put(`/api/v1/posts/${postId}/comments/${id}`, param);

          if (result.status === 200) {
               alert('댓글이 수정되었습니다.')
               location.reload();
          }
     }

     // 댓글 삭제
     const getCommentDelete = async (id: any, postId: any) => {
          const result: any = await Delete(`/api/v1/posts/${postId}/comments/${id}`, {});

          if (result.status === 200) {
               alert('댓글이 삭제되었습니다.')
               location.reload();
          }
     }

     // 좋아요 조회
     const getLikeCount = async () => {
          const result: any = await Get(`/api/v1/posts/${props.searchParams.id}/likes`, {});

          if (result.status === 200) {
               setLikeCount(result.data.result);
          }
     }

     // 좋아요 추가
     const getLike = async () => {
          const result: any = await Post(`/api/v1/posts/${props.searchParams.id}/likes`, {});

          if (result.status === 200) {
               alert('좋아요를 눌렀습니다.')
               location.reload();
          }

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
                                   <tr>
                                        <th>좋아요</th>
                                        <td>{likeCount}  <button type='button' onClick={() => { getLike(); }}>👍</button></td>
                                   </tr>
                              </tbody>
                         </table>
                    </div>
                    <div className='button'>
                         <button type='button' className='' onClick={() => { back(); }} >목록</button>
                         <button type='button' className='' onClick={() => { getUpdate(); }} >수정</button>
                         <button type='button' className='' onClick={() => { getDelete(); }} >삭제</button>
                    </div>
                    <div className='comments'>
                         <div>
                              <table>
                                   <tbody>
                                        {
                                             commentsList && commentsList.map((item: any, index: any) => (
                                                  <tr key={index}>
                                                       <th>{item.userName}</th>
                                                       {
                                                            commentType === true
                                                                 ?
                                                                 <>
                                                                      <td>{item.comment}</td>
                                                                      <td><button type='button' onClick={() => { setCommentType(false); }}>수정</button></td>
                                                                      <td><button type='button' onClick={() => { getCommentDelete(item.id, item.postId); }}>삭제</button></td>
                                                                 </>
                                                                 :
                                                                 <>
                                                                      <input type='text' value={item.comment} onChange={(e: any) => { setComment(e.target.value); }} />
                                                                      <button type='button' onClick={() => { getCommentUpdate(item.id, item.postId); }}>확인</button>
                                                                 </>
                                                       }
                                                  </tr>
                                             ))
                                        }
                                   </tbody>
                              </table>
                         </div>
                         <div>
                              <input type='text' onChange={(e: any) => { setComment(e.target.value) }} />
                              <button type='button' onClick={() => { getCommentAdd(); }}>등록</button>
                         </div>
                    </div>
               </div>
          </>
     )
}
export default PostDetail;