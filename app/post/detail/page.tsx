'use client'

import { Delete, Get, Post } from '@/app/util/CommonCall';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const PostDetail = (props: any) => {
  const router = useRouter();

  const [postDetailList, setPostDetailList] = useState<any>([]);
  const [postId, setPostId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [inputType, setInputType] = useState<boolean>(true);

  const [comment, setComment] = useState<string>('');
  const [commentList, setCommentList] = useState<any>([]);
  const [commentType, setCommentType] = useState<boolean>(true);
  const [commentTypeIdx, setCommentTypeIdx] = useState<number>();

  const [likeType, setLikeType] = useState<boolean>(false);

  useEffect(() => {
    let mounted: any = true;

    if (mounted) {
      getPostDetail();
    }
    return function cleanup() {
      mounted = false;
    }
  }, [inputType, commentType, likeType]);

  // 상세 | 댓글 리스트
  const getPostDetail = async () => {
    const result: any = await Get(`/api/v2/posts/${props.searchParams.id}`, {});

    if (result.status === 200) {
      setPostDetailList(result.data.data);
      setCommentList(result.data.data.comment);

      setPostId(result.data.data.id);
      setTitle(result.data.data.title);
      setBody(result.data.data.body);
    }
  }

  // 글 삭제
  const getPostDelete = async () => {
    const result: any = await Delete(`/api/v2/posts/delete/${props.searchParams.id}`, {});

    if (result.status === 200) {
      toast.success('글이 삭제되었습니다.');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  // 글 수정
  const getPostUpdate = async () => {
    let params: any = new FormData();
    params.append('title', title);
    params.append('body', body);
    params.append('id', postId);

    const result: any = await Post(`/api/v2/posts/modify`, params);

    if (result.status === 200) {
      toast.success(`수정이 완료되었습니다.`);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  // 댓글 등록
  const getCommentAdd = async () => {
    let params: any = new FormData();
    params.append('comment', comment);

    const result: any = await Post(`/api/v2/posts/create/comment/${postId}`, params);

    if (result.status === 200) {
      toast.success(`댓글이 등록되었습니다.`)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  // 댓글 삭제
  const getCommentDelete = async (id: any) => {
    const result: any = await Delete(`/api/v2/posts/delete/comment/${id}`, {});

    if (result.status === 200) {
      toast.success(`댓글이 삭제되었습니다.`);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  // 댓글 수정
  const getCommentUpdate = async (id: any) => {
    let params: any = new FormData();
    params.append('comment', comment);

    const result = await Post(`/api/v2/posts/modify/comment/${id}`, params);

    if (result.status === 200) {
      toast.success('댓글이 수정되었습니다.')
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  // 좋아요
  // const getPostLike = async() => {
  //   setLikeType(true);

  //   const result: any = await Post(`/api/v2/posts/like/${postId}`, {});

  //   if(result.status === 200) {
  //     toast.success('좋아요👍')
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 1000);
  //   }
  // }

  // 좋아요 취소
  // const getPostLikeCan = async() => {
  //   setLikeType(false);

  //   const result: any = await Delete(`/api/v2/posts/like/cancel/${postId}`, {});

  //   if(result.status === 200) {
  //     toast.success('좋아요 취소👎')
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 1000);
  //   }
  // }

  return (
    <>
      <div>
        <div>
          {
            inputType === true
              ?
              <>
                <div>
                  <div>
                    <label>제목</label>
                    <p>{postDetailList.title}</p>
                  </div>
                  <div>
                    <label>내용</label>
                    <p>{postDetailList.body}</p>
                  </div>
                  <div>
                    {/* <button type='button' onClick={() => { likeType === true ? getPostLike() : getPostLikeCan() }}>👍</button> */}
                  </div>
                  <div>
                    <button type='button' onClick={() => { router.push('/') }}>뒤로가기</button>
                  </div>
                  <div>
                    <button type='button' onClick={() => { setInputType(false); }}>글 수정</button>
                  </div>
                  <div>
                    <button type='button' onClick={() => { getPostDelete(); }}>글 삭제</button>
                  </div>
                </div>
              </>
              :
              <>
                <div>
                  <div>
                    <label>제목</label>
                    <input type='text' value={title} onChange={(e: any) => { setTitle(e.target.value); }} />
                  </div>
                  <div>
                    <label>내용</label>
                    <input type='text' value={body} onChange={(e: any) => { setTitle(e.target.value); }} />
                  </div>
                  <div>
                    <button type='button' onClick={() => { setInputType(true); }}>취소</button>
                  </div>
                  <div>
                    <button type='button' onClick={() => { getPostUpdate(); }}>저장</button>
                  </div>
                </div>
              </>
          }
        </div>
        <div>
          <div>
            {
              commentList && commentList.map((i: any, idx: any) => (
                <div key={idx}>
                  <tr>
                    {
                      commentType === true
                        ?
                        <p>{i.comment}</p>
                        :
                        commentTypeIdx !== idx
                          ?
                          <p>{i.comment}</p>
                          :
                          <input type='text' onChange={(e: any) => { setComment(e.target.value); }} />
                    }
                    <p>{i.createdAt}</p>
                    <p>{i.userName}</p>
                  </tr>
                  <div>
                    {
                      commentType === true
                        ?
                        <>
                          <button type='button' onClick={() => { getCommentDelete(i.id) }}>댓글 삭제</button>
                          <button type='button' onClick={() => { setCommentType(false); setCommentTypeIdx(idx); }}>댓글 수정</button>
                        </>
                        :
                        commentTypeIdx !== idx
                          ?
                          <>
                            <button type='button' onClick={() => { getCommentDelete(i.id) }}>댓글 삭제</button>
                            <button type='button' onClick={() => { setCommentType(false); setCommentTypeIdx(idx); }}>댓글 수정</button>
                          </>
                          :
                          <>
                            <button type='button' onClick={() => { setCommentType(true); }}>취소</button>
                            <button type='button' onClick={() => { getCommentUpdate(i.id); setCommentType(true); }}>저장</button>
                          </>
                    }
                  </div>
                </div>
              ))
            }
            <div>
              <input type='text' onChange={(e: any) => { setComment(e.target.value); }} />
            </div>
            <div>
              <button type='button' onClick={() => { getCommentAdd(); }}>댓글 등록</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default PostDetail;