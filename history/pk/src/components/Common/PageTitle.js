import React from 'react';

const PageTitle = (props) => {
    return (
        <div>
            <h2 className="page_title">{props.h2title}</h2>
        </div>
    );
};

export default PageTitle;