import React from "react";
import MainFooter from "./MainFooter";
import TodoList from "./TodoList";

function Main() {

  
  return (
  <>
    <section className="main">
      <input className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <TodoList />
    </section>
    <MainFooter/>
    </>
  );
}

export default Main;
