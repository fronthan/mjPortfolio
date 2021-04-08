import React, { useState } from "react";
import { Link } from "react-router-dom";

function LayerHead(props) {
  const imageX = {
    backgroundImage:"url('btn_close.svg')",
    backgroundSize:'cover'
  }

  const [keyword, setKeyword] = useState("");

  const title = props.title;
  const user_nick = props.user;

  const onChangeHandler = (e) => setKeyword(e.target.value);



  return (
    <div className="pop_head">
      <div className="inner">
        <div className="pop_title">
          {title === "키워드 검색" && (
            <div className="box_inp">
              <input
                type="text"
                value={keyword}
                onChange={onChangeHandler}
                placeholder="키워드를 입력하세요"
                className="inp_keyword"
                id="inp_keyword"
                name="inp_keyword"
              />
            </div>
          )}
          {title !== "키워드 검색" && <div className="title_txt">{user_nick}님의 게시물</div>}
        </div>
        <Link to="/" className="btn_close" style={imageX}></Link>
      </div>
    </div>
  );
}

export default LayerHead;
