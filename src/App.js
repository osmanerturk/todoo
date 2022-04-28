import "./App.css";
import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <>
      <section className="todoapp">
        <Header />
        <Main />
      </section>
      <Footer />
    </>
  );
}

export default App;
