import React from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";

function Home() {

  const bg_opt = {backgroundImage:"URL('btn_option.svg')", backgroundSize:'cover'}
  
  return (
    <main className="pk_main" role="main">
      <div className="cont_head">
        <span className="nick">player1</span>
        <Link to="/" className="btn_setme" data="계정 설정으로 가기, 생략" style={bg_opt}>
          <span className="blind_block">계정 설정하러 가기</span>
        </Link>
      </div>
      <div className="pk_mypage">
        <div className="posts">
          <Post data="add_post" />        
          <Post data="mysns" src="sns007.jpg"/>
          <Post data="mysns" src="sns005.jpg"/>
          <Post data="mysns" src="sns006.jpg"/>
          <Post data="mysns" src="sns006.jpg"/>
          <Post data="mysns" src="sns008.jpg"/>
        </div>
        
      </div>
    </main>
  );
}

export default Home;
