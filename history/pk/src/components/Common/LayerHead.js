import React from "react";

function LayerHead(props) {
  const title = props.title;
  return (
    <div className="pop_head">
        <div className="pop_title">
        {title === '키워드 검색' &&
            <div className="box_inp">
              <input type="text" value="" placeholder="키워드를 입력하세요" class="inp_keyword" id="keyword" name="keyword"/>
            </div>
        }  
        {title !== '키워드 검색' &&
          <div className="title_txt">{title}</div>
        }
        </div>
        <button className="btn_close">X</button>
    </div>
  );
}

export default LayerHead;