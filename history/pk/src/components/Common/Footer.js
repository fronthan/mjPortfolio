import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <div className="terms">
                <ul className="terms_wrap">
                    <li>이용약관</li>
                    <li>개인정보처리방침</li>
                </ul>
            </div>
            <div className="notice">
                <p className="notice_area">이 사이트는 프론트엔드 개발자의 포트폴리오를 위한 가상 웹사이트입니다.</p>
            </div>
        </footer>
    );
}

export default Footer;