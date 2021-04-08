import React from 'react';

const bg_add_post = {backgroundImage:"URL('btn_plus.svg')", backgroundPosition:'center', backgroundRepeat: 'no-repeat'}

function Post(props) {
    
    const data = props.data;
    const src = props.src;

    return (
        <>
            {data === "add_post" &&
                <div className="add_post" style={bg_add_post}><span className="blind_inline">게시물 올리기</span></div> 
            }
            {data !== "add_post" &&
                <div className="post">
                    {data === "mysns" &&                        
                        <span className="box_btn">
                            <button className="btn_more"><span className="blind_inline">더보기</span></button>
                        </span>                       
                    }
                    <span className="img_area">
                        <img src={src} alt=""/>
                    </span>
                </div>
            }
        </>
    );
}

export default Post;