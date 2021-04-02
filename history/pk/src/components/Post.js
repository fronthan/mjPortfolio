import React from 'react';

function Post({src}) {
    return (
        <div className="post">
            <span className="img_area">
                <img src={src} alt=""/>
            </span>
        </div>
    );
}

export default Post;