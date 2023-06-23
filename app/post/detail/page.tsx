'use client'

import Comment from "./comment";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Delete, Get, Post } from "@/app/util/CommonCall";
import { toast } from "react-hot-toast";

const PostDetail = (props: any) => {
  const router: any = useRouter();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [detailList, setDetailList] = useState<any>([]);
  const [inputType, setInputType] = useState<boolean>(true);

  useEffect(() => {
    let mounted: any = true;

    if (mounted) {
      getDetail();
    }
    return function cleanup() {
      mounted = false;
    }
  }, [inputType]);

  const getDetail = async () => {
    const result: any = await Get(`/api/v2/posts/${props.searchParams.id}`, {});

    if (result.status === 200) {
      setDetailList(result.data.data);
      setTitle(result.data.data.title);
      setBody(result.data.data.body);
    }
  }

  const getUpdate = async () => {
    let param: any = new FormData();
    param.append('title', title);
    param.append('body', body);
    param.append('id', props.searchParams.id);

    const result: any = await Post(`/api/v2/posts/modify`, param);

    if (result.status === 200) {
      toast.success('정상적으로 수정되었습니다.');
      setInputType(true);
    }
  }

  const getDelete = async () => {
    const result: any = await Delete(`/api/v2/posts/delete/${props.searchParams.id}`, {});

    if (result.status === 200) {
      toast.success('정상적으로 삭제되었습니다.');
      router.push('/')
    }
  }

  return (
    <>
      <div>
        <div>
          {
            inputType
              ?
              <>
                <div>
                  <label>제목: </label><span>{detailList.title}</span>
                </div>
                <div>
                  <label>내용: </label><span>{detailList.body}</span>
                </div>
              </>
              :
              <>
                <div>
                  <label>제목: </label><input type='text' value={title} onChange={(e: any) => { setTitle(e.target.value) }}></input>
                </div>
                <div>
                  <label>내용: </label><input type='text' value={body} onChange={(e: any) => { setBody(e.target.value) }}></input>
                </div>
              </>
          }
          <div>
            <p>
              <button type='button' onClick={() => { inputType ? router.push('/') : setInputType(true); }}>뒤로가기</button>
            </p>
            <p>
              <button type='button' onClick={() => { inputType ? setInputType(false) : getUpdate(); }}>{inputType ? '수정' : '저장'}</button>
            </p>
            <p>
              <button type='button' onClick={() => { getDelete(); }}>{inputType ? '삭제' : ''}</button>
            </p>
          </div>
        </div>
          <div style={{ marginTop: '20px' }}>
            <Comment id={props.searchParams.id} />
          </div>
      </div>
    </>
  )
}
export default PostDetail;