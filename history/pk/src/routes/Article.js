import React from "react";

function Article() {
  return (
    <>     
        <div className="post_detail">
          <span className="box_img">
            <img src="sns002.jpg" alt="" />
          </span>
          <div className="update_info">
            <time className="post_date">3일 전</time>
            <div className="good_count">
              <img src="icon_heart_off.svg" alt="Heart by shwepes from the Noun Project" />
              <span className="count">3</span>
            </div>
            <div className="comment_count">
              <img src="icon_heart_off.svg" alt="" />
              <span className="count">3</span>
            </div>
          </div>
          <div className="post_body">
            <div className="cont">안녕하세요~ 오늘도 졸린 하루</div>
            <ul className="keywords">
              <li>#카페맛집</li>
            </ul>
          </div>
        </div>
        <div className="foot_area">
          <div className="add_comment">
            <input type="text" name="" id="" />
            <button className="btn_add_cmt">입력</button>
          </div>
          <div className="added_comments">
            <div className="comment_item">
              <div className="cmt_body">
                <span className="nick_txt">player1</span>
                <span className="cmt_cont">dlfkjfld맛있어 보인다</span>
              </div>
              <time className="comment_date">10분 전</time>
              <button className="btn_reply_on">reply</button>
            </div>
            <button className="btn_more">
              <span className="blind_inline">더보기 버튼</span>
            </button>
          </div>
        </div>
    </>
  );
}

export default Article;
