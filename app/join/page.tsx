'use client'

import { useState } from 'react';
import { Post } from '../util/CommonCall';
import { useRouter } from 'next/navigation';

function JoinMain() {
     const router = useRouter();
     const [name, setName] = useState<string>('');
     const [email, setEmail] = useState<string>('');
     const [pwd, setPwd] = useState<string>('');
     const [phon, setPhon] = useState<string>('');

     function check() {
          if (name === "") {
               alert('가입 성공');
               return false;
          }
          if (email === "") {
               alert('아이디를 입력하세요.');
               return false;
          }
          if (pwd === "") {
               alert('비밀번호를 입력하세요.');
               return false;
          }
          return true;
     }

     const getJoin = async () => {
          let param = new FormData();
          param.append('userName', email);
          param.append('password', pwd);

          const result: any = await Post(`/api/v1/users/join`, param);

          if (result.status === 200) {
               console.log('result :::', result);
               alert('가입 성공');
               router.push('/');
          }
     }

     const back = () => {
          router.push('/')
     }

     return (
          <>
               <div>
                    <div style={{ marginBottom: '80px' }}></div>
                    <div
                         style={{
                              width: '340px',
                              margin: '0 auto'
                         }}>
                         <div className="form-group">
                              <label htmlFor="exampleInputEmail1" className="form-label mt-4"><label style={{ color: 'red' }} >*&nbsp;</label>이름</label>
                              <input type="email" className="form-control" onChange={(e: any) => { setName(e.target.value); }}/>
                         </div>
                         <div className="form-group">
                              <label htmlFor="exampleInputEmail1" className="form-label mt-4"><label style={{ color: 'red' }} >*&nbsp;</label>아이디</label>
                              <input type="email" className="form-control" onChange={(e: any) => { setEmail(e.target.value); }}/>
                         </div>
                         <div className="form-group">
                              <label htmlFor="exampleInputPassword1" className="form-label mt-4"><label style={{ color: 'red' }} >*&nbsp;</label>비밀번호</label>
                              <input type="password" className="form-control" onChange={(e: any) => { setPwd(e.target.value) }}/>
                         </div>
                         <div className="form-group">
                              <label htmlFor="exampleInputEmail1" className="form-label mt-4">전화번호</label>
                              <input type="email" className="form-control" onChange={(e: any) => { setPhon(e.target.value) }}/>
                         </div>
                         <div style={{ marginTop: '25px' }}>
                              <button style={{ marginLeft: '100px' }} type="button" className="btn btn-outline-secondary" onClick={() => { back(); }}>취소</button>
                              <button style={{ marginLeft: '10px' }} type="button" className="btn btn-dark" onClick={() => { if(check()) { getJoin(); }}}>가입</button>
                         </div>
                    </div>
               </div>
          </>
     )
}
export default JoinMain;