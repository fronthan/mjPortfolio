import React from 'react';
import Post from "../components/Post";

function Home() {
    return (
        <main className="pk_main" role="main">
            <div className="hello_message">
                player1님 Have Fun!
            </div>
            <div className="post_wrap">
                <Post src="./sns001.jpg" />
                <Post src="./sns001.jpg" />
                <Post src="./sns001.jpg" />     
                <Post src="./sns001.jpg" />
                <Post src="./sns001.jpg" />
                <Post src="./sns001.jpg" />     
                <Post src="./sns001.jpg" />
                <Post src="./sns002.jpg" />
            </div>
        </main>
    );
}

export default Home;