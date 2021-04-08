import React from 'react';
import LayerHead from "../components/Common/LayerHead";

const keywords = ["커피", "카페", "가산동", "웹개발", "웹디자인", "에버랜드리조트", "티익스프레스", "방탈출", "빈브라더스", "가좌동"];

function ListItem(props) {
    return <li className="keyword_item">{props.itemword}</li>
}
function Keyword() {
    const keyword_list = keywords.map((word, index) => 
        <ListItem itemword={word} key={index}/>
    );
    return (
        <div className="pop_area" aria-modal="true">
            <LayerHead title="키워드 검색" />
            <ul className="result_list">
                {keyword_list}
            </ul>
        </div>
    )
}

export default Keyword;