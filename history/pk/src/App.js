import React from "react";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./routes/Home";
import Keyword from "./routes/Keyword";
import Mypage from "./routes/Mypage";

function App() {
  const pk = { background: "#f8f8f8" };

  return (
    <div style={pk}>
      <h1 className="blind_block">리액트 연습-플콕</h1>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" component={Keyword} />
          <Route Path="/mysns" component={Mypage} />
          {/* <Route path="/login" component={Login} />
          <Route path="/register" component={Register} /> */}
          <Route render={({location}) => {
            <div>
              <h2>이 페이지는 존재하지 않습니다.</h2>
              <p>{location.pathname}</p>
            </div>
          }}/>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
