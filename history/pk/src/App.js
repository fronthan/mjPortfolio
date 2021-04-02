import React from "react";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";

import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import Keyword from "./routes/Keyword";

function App() {
  const pk = { background: "#f8f8f8" };

  return (
    <div style={pk}>
      <h1 className="blind_block">리액트 연습-플콕</h1>
      <HashRouter>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={Keyword} />
      </HashRouter>
      <Footer />
    </div>
  );
}

export default App;