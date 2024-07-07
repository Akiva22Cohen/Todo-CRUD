import React, { useEffect, useRef, useState } from "react";
import Watch from "./watch";
import WindowDelAll from "./windowPosFix";
import TaskInput from "./TaskInput";
import GlobalContext from "../context/context";
import TaskList from "./taskList";
import Sortly from "./sortly";
import { FcTodoList } from "react-icons/fc";
import SearchInput from "./searchInput";

function AppTodo() {
  const [tasks_ar, setTasksAr] = useState([]);
  const [tasks_arSort, setTasksArSort] = useState([]);
  const [tasks_arSearch, setTasksArSearch] = useState([]);

  const [windo, setWindo] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const response = await FetchData("http://localhost:3000/tasks");
      setTasksAr(response);
    }
    fetchData();
  }, []);

  const removeAllTasks = () => {
    setTasksAr([]);
    localStorage.removeItem("tasks");
    setWindo(!windo);
  };

  const FetchData = async (url, myMethod = "GET", myBody = "") => {
    let myRequest;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    switch (myMethod) {
      case "GET":
        myRequest = new Request(url);
        break;
      case "POST":
      case "PUT":
        myRequest = new Request(url, {
          method: myMethod,
          body: JSON.stringify(myBody),
          headers: myHeaders,
        });
        break;
      case "DELETE":
        myRequest = new Request(url, {
          method: myMethod,
        });
        break;
    }

    const response = await fetch(myRequest);
    const json = await response.json();

    return json;
  };

  return (
    <div style={{ minHeight: "100vh" }} className="container">
      <header className="navbar pb-0 pt-1 py-sm-2">
        <div>
          <h1 className="icon logo mb-0">
            TodoList
            <FcTodoList />
          </h1>
          <a href="https://ac-sites.netlify.app/" target="_blank">
            ACsites
          </a>
        </div>
        <Watch />
      </header>
      <div className="col-lg-6 px-3 py-0 p-sm-3 mx-auto">
        <GlobalContext.Provider value={{ setTasksAr, tasks_ar, FetchData }}>
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-2 mb-sm-0">
            <SearchInput
              tasks_arSort={tasks_arSort}
              setTasksArSearch={setTasksArSearch}
              tasks_arSearch={tasks_arSearch}
            />

            <Sortly
              setTasksAr={setTasksAr}
              tasks_ar={tasks_ar}
              setTasksArSort={setTasksArSort}
            />

            {/* <button
              onClick={() => setWindo(!windo)}
              className="rounded m-1"
              title="Delete all tasks"
              ref={buttonRef}
            >
              Reset tasks
            </button> */}
            {windo && (
              <WindowDelAll
                mainText="Are you sure you want to delete all tasks?"
                buttonText="yes"
                mainAction={removeAllTasks}
                closeWidoFun={setWindo}
                buttonRef={buttonRef}
              />
            )}
          </div>

          <TaskList tasks_ar={tasks_arSearch} />

          {tasks_ar.length > 0 && (
            <div>
              <p className="mb-0">
                Tasks completed:{" "}
                {tasks_ar.filter((item) => item.Completed).length}/
                {tasks_ar.length}
              </p>
              <small>
                Left:{" "}
                {tasks_ar.length -
                  tasks_ar.filter((item) => item.Completed).length}
              </small>
            </div>
          )}

          <div
            style={{ bottom: "40px", zIndex: "1" }}
            className="shadow position-fixed fixed-bottom col-10 col-sm-8 col-md-6 mx-auto"
          >
            <TaskInput />
          </div>
        </GlobalContext.Provider>
      </div>
    </div>
  );
}

export default AppTodo;
