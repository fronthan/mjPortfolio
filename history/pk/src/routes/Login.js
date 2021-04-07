import React from 'react'
import PageTitle from '../components/Common/PageTitle'; 

function Login() {
    return (
        <div className="pk_main" role="main">
            <PageTitle h2title="로그인"/>
            <div className="pk_login">
                <div className="box_row">
                    <label htmlFor="inp_acnt" className="label">이메일계정</label>
                    <div className="box_inp">
                        <input type="text" className="inp_account" id="inp_account" placeholder="abc@naver.com"/>
                    </div>
                </div>
                <div className="box_row">
                    <label htmlFor="inp_pw" className="label">비밀번호</label>
                    <div className="box_inp">
                        <input type="password" className="inp_pw" id="inp_pw"/>
                    </div>
                </div>
                <button className="btn_login active" type="button">로그인</button>
            </div>
        </div>
    )
}

export default Login;