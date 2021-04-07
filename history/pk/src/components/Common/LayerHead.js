import React, { useState } from "react";
import { Link } from "react-router-dom";

function LayerHead(props) {
  const [keyword, setKeyword ] = useState('');

  const title = props.title;
  const imageX = {
      backgroundImage:"url('btn_close.svg')",
      backgroundSize:'cover'
  }

  const onChangeHandler = e => setKeyword(e.target.value);

  return (
    <div className="pop_head">
        <div className="pop_title">
        {title === '키워드 검색' &&
            <div className="box_inp">
              <input type="text" value={keyword} onChange={onChangeHandler} placeholder="키워드를 입력하세요" className="inp_keyword" id="inp_keyword" name="inp_keyword"/>
            </div>
        }  
        {title !== '키워드 검색' &&
          <div className="title_txt">{title}</div>
        }
        </div>
        <Link to="/" className="btn_close" style={imageX} />
    </div>
  );
}

export default LayerHead;