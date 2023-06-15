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
    <div className="logtop logtop_login">
      <img
            alt='ordoIct'
            src='/ordo_ict.png'
            style={{
              margin: '0 auto',
              paddingTop: '9%',
              marginBottom: '10px'
            }} />
		</div>
    <div className="secLogin">
      <div className="logWrap" id="loginFormWrite">
        <h2 className="blind">로그인</h2>
          <form name="form" id="form" method="post" action="/Login/Login.asp" onSubmit={()=>{ alert("로그인");/* login_send(); */}}>
          <fieldset className="login_form"><legend className="blind">로그인 입력폼</legend>
            <input type="hidden" name="re_url" id="re_url" value="/" />
            <input type="hidden" name="idx" value="" />
            <input type="hidden" name="Div" value="" />
            <input type="hidden" name="BNo" value="" />
            <input type="hidden" id="IP_ONOFF" name="IP_ONOFF" value="Y" />
            <input type="hidden" name="Login_Stat" id="Login_Stat" value="" />
            <input type="hidden" name="LoginPage" value="/Login/Login_Tot.asp" />
            <input type="hidden" name="returnHost" id="returnHost" value="http://www.jobkorea.co.kr" />
            <input type="hidden" name="jkwww_host" id="jkwww_host" value="https://www.jobkorea.co.kr" />
            <input type="hidden" name="m_type" id="m_type" value="" />
            <input type="hidden" name="NaverReferReURL_Stat" id="NaverReferReURL_Stat" value="" />
            <input type="hidden" name="DB_Name" id="DB_Name" value="GG" />
            <input type="hidden" name="ignoreSession" id="ignoreSession" value="" />

            {/* 회원선택 */}
					  <div className="select_row">
						  <ul id="devMemTab">
							  <li className="on"><a href="#" data-m-type="M">개인회원</a></li>
							  <li><a href="#" data-m-type="Co">기업회원</a></li>
						  </ul>
					  </div>
					  <div className="select_row devHide" id="devCoTab">
						  <p className="sort">
                <input type="radio" id="lb_memberGi" name="Co_DB_Name" value="GI" onClick={()=>{alert("Co_DB_Name");/* fChkIntroGI('Co') */}} checked={true} data-href="https://www.jobkorea.co.kr/Join/GI_Regist" />
                <label /* for="lb_memberGi" */ className="radioOn">기업회원</label>
                <input type="radio" id="lb_memberSf" name="Co_DB_Name" value="SF" onClick={()=>{alert("Co_DB_Name");/* fChkIntroGI('Co') */}} data-href="https://www.jobkorea.co.kr/Join/HR_Regist" />
                <label /* for="lb_memberSf" */>서치펌회원</label>
						  </p>
					  </div>

					<div className="input_row">
						<label htmlFor="M_ID" id="lb_id" className="blind">아이디</label>
						<input type="text" className="inpTxt inpID off" name="M_ID" id="M_ID" size={16} maxLength={20} title="아이디 입력" /* style={"ime-mode:inactive;"} */ autoComplete="off" />
						<label htmlFor="M_PWD" id="lb_pw" className="blind">비밀번호</label>
						<input type="password" className="inpTxt inpPW off devCapsLock" name="M_PWD" id="M_PWD" size={16} title="비밀번호 입력" autoComplete="off" />
						<button type="submit" className="btLoin">로그인</button>
            <div className="lyCapsLock" id="ipNotice">
							<em>Caps Lock</em>이 켜져 있습니다.<span className="mainIcn mainIcnArrUp"></span>
						</div>
					</div>
					<div className="check_row">
						<input type="checkbox" name="lb_idSave" id="lb_idSave" value="Y" /> 
            <label htmlFor="lb_idSave">로그인 상태 유지</label>
						<span className="txtBar"> | </span>
						<a href="javascript:void(0)" className="devSecPop">IP보안</a> 
            <button type="button" className="btnSecurity btnSecurity_on" onClick={()=>{alert("ipCheckSetting()");}}>
              <span className="setOn">ON</span>
            </button>
						{/* <!--<span id="ipNotice" className="devHide"><img src="https://i.jobkorea.kr/content/images/login/ver_1/ip_layer_bg.png" alt="개인정보 보호를 위해 IP보완을 ON으로 변경해주세요"></span>--> */}
						<p className="sch">
              <a href="https://www.jobkorea.co.kr/Login/Search/search_id.asp" target="_new">아이디 찾기</a> 
              <span className="txtBar"> | </span> 
              <a href="https://www.jobkorea.co.kr/Login/Search/search_pwd.asp" target="_new">비밀번호 찾기</a>
            </p>
					</div>
				
					{/* <!--// 그림문자 입력폼 --> */}
					<div className="capck_row loginImgTxt devHide">
						<label htmlFor="gtxt" className="blind">그림문자</label>
						<input type="text" className="inpTxt inpCap" name="gtxt" id="gtxt" size={16} title="그림문자 입력" autoComplete="off" />{/* <!--[개발] end 추가하면 배경텍스트 사라짐 --> */}
						<div className="captcha">
							<span className="img"><img id="imgCaptcha" src="/login/captcha.asp" width="198" height="40" alt="그림문자" /></span>
							<a href="javascript:void(0)" className="changeImg" onClick={()=>{alert("RefreshImage('imgCaptcha')");}}><span className="skip">새로고침</span></a>
						</div>
					</div>
					{/* <!-- 그림문자 입력폼 //--> */}
				
					<p className="alarmMsg"></p>
					
					<div className="list-social">
						<ul>
							<li><a href="javascript:;" id="btnNvLogin" className="naver" onClick={()=>{alert("_LA.EVT('4287')");}}>네이버 로그인</a></li>
							<li><a href="javascript:;" id="btnKaLogin" className="kakao" onClick={()=>{alert("_LA.EVT('4286')");}}>카카오 로그인</a></li>
							<li><a href="javascript:;" id="btnFbLogin" className="facebook" onClick={()=>{alert("facebookLogin(); _LA.EVT('4285')");}}>페이스북 로그인</a></li>
							<li>
                <a href="javascript:;" id="btnGlLogin" className="" onClick={()=>{alert("_LA.EVT('4288')");}}>
                  <div className="S9gUrf-YoZ4jf" style={{position: "relative"}}>
                    <div></div>
                    <iframe src="https://accounts.google.com/gsi/button?type=icon&amp;shape=circle&amp;theme=outline&amp;size=large&amp;client_id=751392317978-jjc5ov9kf0tgnr4anlbe2crbfjk3it1c.apps.googleusercontent.com&amp;iframe_id=gsi_552521_940936&amp;as=YEfg19UD%2BgsQpwgS9mqlBQ" id="gsi_552521_940936" title="Google 계정으로 로그인 버튼" 
                        style={{display: "block", position: "relative", top: "0px", left: "0px", height: "44px", width: "64px", border: "0px", margin: "-2px -12px"}}></iframe>
                  </div>
                </a>
              </li>
							<li><a href="javascript:;" id="btnApLogin" className="apple">애플 로그인</a></li>
						</ul>
					</div>


					<div className="join">
						<div id="M_Alert">
              좋은 일을 찾으시나요? 회원가입하시고 다양한 혜택을 누리세요!
              <a href="https://www.jobkorea.co.kr/Join/M_Regist" target="_new">회원가입</a>
						</div>
						<div id="Co_Alert" style={{display: "none"}}>
              좋은 인재를 구하시나요? 회원가입하시고 다양한 혜택을 누리세요!
              <a href="https://www.jobkorea.co.kr/Join/GI_Regist" target="_new">회원가입</a>
              <div className="text-balloon">신규가입 <span>3종</span> 쿠폰 제공!</div>
						</div>
					</div>
          </fieldset>
          </form>
      </div>
    </div>
			{/* <div className="logWrap" id="loginFormWrite">
				<h2 className="blind">로그인</h2>

				<form name="form" id="form" method="post" action="/Login/Login.asp" onsubmit="return login_send();">
				<fieldset className="login_form"><legend className="blind">로그인 입력폼</legend>
					<input type="hidden" name="re_url" id="re_url" value="/">
					<input type="hidden" name="idx" value="">
					<input type="hidden" name="Div" value="">
					<input type="hidden" name="BNo" value="">
					<input type="hidden" id="IP_ONOFF" name="IP_ONOFF" value="Y">
					<input type="hidden" name="Login_Stat" id="Login_Stat" value="">
					<input type="hidden" name="LoginPage" value="/Login/Login_Tot.asp">
					<input type="hidden" name="returnHost" id="returnHost" value="http://www.jobkorea.co.kr">
					<input type="hidden" name="jkwww_host" id="jkwww_host" value="https://www.jobkorea.co.kr">
					<input type="hidden" name="m_type" id="m_type" value="">
					<input type="hidden" name="NaverReferReURL_Stat" id="NaverReferReURL_Stat" value="">
					<input type="hidden" name="DB_Name" id="DB_Name" value="GG">
					<input type="hidden" name="ignoreSession" id="ignoreSession" value="">

					

				</fieldset>
				</form>
			</div>
			<div className="adBan">
				<h2 className="skip">광고</h2>
				<iframe width="325" height="310" noresize="" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" src="https://yellow.contentsfeed.com/RealMedia/ads/adstream_sx.ads/jobkorea/login@x01" title="광고"></iframe>
			</div><!-- AD //-->
		</div> */}

      {/* <div>
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
      </div> */}
    </>
  )
}
export default LoginMain;



