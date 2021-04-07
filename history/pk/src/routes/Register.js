import React, { useState }  from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from "../_actions/user_action";
import { withRouter } from 'react-router-dom';

import PageTitle from '../components/Common/PageTitle'; 

function Register(props) {
    const dispatch = useDispatch("");

    const [Acnt, setAcnt] = useState("");
    const [Pw, setPw] = useState("");
    const [Nick, setNick] = useState("");
    const [ConfirmPw, setConfirmPw] = useState("");

    const EmailHandler = e => {
        setAcnt(e.currentTarget.value);
    }

    const NickHandler = e => {
        setNick(e.currentTarget.value);
    }

    const PwHandler = e => {
        setPw(e.currentTarget.value);
    }

    const ConfirmPwHandler = e => {
        setConfirmPw(e.currentTarget.value);
    }

    const SubmitHandler = e => {
        e.preventDefault();

        if(Pw !== ConfirmPw) {
            return alert('비밀번호 2가지가 같아야 합니다.')
        }

        let body = {
            email: Acnt,
            nick :Nick,
            password:Pw
        }

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success) {
                props.history.push('/login')
            } else {
                alert('회원가입에 실패했습니다.')
            }
        });
    }

    return (
        <div className="pk_main" role="main">
            <PageTitle h2title="회원가입"/>
            <form className="pk_register" onSubmit={SubmitHandler}>
                <fieldset>
                    <legend className="blind_block">회원가입 양식 - 이메일계정, 별명, 비밀번호, 비밀번호 확인</legend>
                    <div className="box_row">
                        <label htmlFor="inp_acnt" className="label">이메일계정</label>
                        <div className="box_inp">
                            <input type="text" className="inp_acnt" id="inp_acnt" placeholder="abc@naver.com" value={Acnt} onChange={EmailHandler}/>
                        </div>
                    </div>
                    <div className="box_row">
                        <label htmlFor="inp_nick" className="label">별명</label>
                        <div className="box_inp">
                            <input type="text" className="inp_nick" id="inp_nick" value={Nick} onChange={NickHandler}/>
                        </div>
                    </div>
                    <div className="box_row">
                        <label htmlFor="inp_pw" className="label">비밀번호</label>
                        <div className="box_inp">
                            <input type="password" className="inp_pw" id="inp_pw" value={Pw} onChange={PwHandler}/>
                        </div>
                    </div>
                    <div className="box_row">
                        <label htmlFor="inp_pw_confirm" className="label">비밀번호 확인</label>
                        <div className="box_inp">
                            <input type="password" className="inp_pw" id="inp_pw_confirm" value={ConfirmPw} onChange={ConfirmPwHandler}/>
                        </div>
                    </div>
                </fieldset>
                <button className="btn_register active">회원가입 완료</button>
            </form>
        </div>
    )
}

export default withRouter(Register);