'use client'

import Cookies from 'js-cookie';
import { Post } from '../util/CommonCall';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

function LoginMain() {
  const router = useRouter();
  const [ID, setID] = useState<string>('');
  const [PWD, setPWD] = useState<string>('');

  function check() {
    if (ID === "") {
      alert('아이디를 입력하세요.')
      return false;
    }
    if (PWD === "") {
      alert('비밀번호를 입력하세요.')
      return false;
    }
    return true;
  }

  useEffect(() => {
    let mounted: any = true;

    if (mounted) {
      localStorage.removeItem('access_token');
      Cookies.remove('access_token');
    }
    return function cleanup() {
      mounted = false;
    }
  }, []);

  const getLogin = async () => {
    let param = new FormData();
    param.append('userName', ID);
    param.append('password', PWD);

    const result: any = await Post(`/api/v1/users/login`, param);

    if (result.status === 200) {
      const token: string = result.data.result.jwt;
      localStorage.setItem('access_token', token);
      Cookies.set('access_token', token);

      alert('로그인 성공')
      router.push(`${process.env.NEXT_PUBLIC_CONSOLE_DOMAIN}/post/list`);
    } else {
      console.log('error :::')
    }
  }

  return (
    <>
      <div>
        <div className='header' >
          <img
            alt='ordoIct'
            src='/ordo_ict.png'
            style={{
              margin: '0 auto',
              paddingTop: '9%',
              marginBottom: '10px'
            }}></img>
        </div>
        <div
          className="form-group"
          style={{
            width: '340px',
            margin: '0 auto'
          }}>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" placeholder="name@example.com" onChange={(e: any) => { setID(e.target.value); }} />
            <label htmlFor="ID">ID</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" placeholder="Password" onChange={(e: any) => { setPWD(e.target.value); }} />
            <label htmlFor="Password">Password</label>
          </div>
          <div className="join" style={{ textAlign: 'center', marginTop: '10px' }}>
            <a href='/join' style={{ fontSize: '13px' }}>회원가입</a>
          </div>
          <div className="d-grid gap-2" style={{ marginTop: '10px' }}>
            <button type="button" className="btn btn-dark btn-lg" onClick={() => { if(check()) { getLogin(); }}}>로그인</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default LoginMain;



