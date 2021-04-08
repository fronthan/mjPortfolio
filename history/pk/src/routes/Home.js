import React from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";

function Home() {
  
  return (
    <main className="pk_main" role="main">
      <div className="hello_message">
          <Link to="/mysns" className="user_name">player1님</Link> Have Fun!
      </div>
      {/* <div className="visitor_area">
        <Link to="login" className="btn_login">
          로그인
        </Link>
        <Link to="register" className="btn_register">
          회원가입
        </Link>
      </div> */}
      <div className="post_wrap">
        <Post src="./sns001.jpg" />      
        <Post src="./sns005.jpg" />
        <Post src="./sns004.jpg" />
        <Post src="./sns006.jpg" />
        <Post src="./sns007.jpg" />
        <Post src="./sns008.jpg" />
      </div>
    </main>
  );
}

export default Home;
