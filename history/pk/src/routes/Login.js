import React from 'react'
import PageTitle from '../components/Common/PageTitle'; 

function Login() {
    return (
        <div className="pk_main">
            <PageTitle h2title="로그인"/>
            <div className="pk_main pk_login">
                <div className="box_inp">
                    <input type="text" className="inp_acnt" placeholder="abc@naver.com"/>
                </div>
                <div className="box_inp">
                    <input type="password" className="inp_pw"/>
                </div>
                <button className="btn_login">로그인</button>
                
            </div>
        </div>
    )
}

export default Login;