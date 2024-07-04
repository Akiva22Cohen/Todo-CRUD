import React, { useContext, useState } from "react";
import GlobalContext from "../context/context";
import TaskInput from "./TaskInput";
import { BsCircle, BsCheck2Circle } from "react-icons/bs";
import { BiTaskX } from "react-icons/bi";
import { LuClipboardEdit } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";

function TaskItem(props) {
  const [ovjEdit, setOvjEdit] = useState();
  const { id, name, time, created, edit, Completed } = props.children;
  const { tasks_ar, setTasksAr, FetchData } = useContext(GlobalContext);

  const removeSingleTask = async () => {
    // const temp_ar = tasks_ar.filter((item) => item.id !== id);
    // setTasksAr(temp_ar);

    const res = await FetchData(`http://localhost:3000/tasks/${id}`, "DELETE");
    setTasksAr(res);
  };

  const editSingleTask = () => {
    setOvjEdit(props.children);
  };

  const CompletedTask = async () => {
    const temp_Ovj = tasks_ar.find((item) => item.id === id);
    temp_Ovj.Completed = !temp_Ovj.Completed;

    // const temp_arr = tasks_ar.filter((item) => item.id !== id);

    // const ar_completed = temp_arr.filter((item) => item.Completed);
    // const ar_notComplete = temp_arr.filter((item) => !item.Completed);

    // if (temp_Ovj.Completed) ar_completed.unshift(temp_Ovj);
    // else ar_notComplete.unshift(temp_Ovj);

    // setTasksAr([...ar_notComplete, ...ar_completed]);

    const res = await FetchData(
      `http://localhost:3000/tasks/${props.children.id}`,
      "PUT",
      temp_Ovj
    );

    setTasksAr(res);
  };

  return (
    <div className="accordion-item m-1 shadow fontNum">
      <h2 className="accordion-header d-flex align-items-center justify-content-center">
        <button
          className="accordion-button collapsed pe-2 taskItem flex-column align-items-start p-2 pb-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#panelsStayOpen-collapse${id}`}
          aria-expanded="false"
          aria-controls={`panelsStayOpen-collapse${id}`}
        >
          {Completed ? (
            <s
              style={{ minHeight: "20px" }}
              className="overflow-auto text-center small"
            >
              <p className="mb-0 text-break">{name}</p>
            </s>
          ) : (
            <div
              style={{ minHeight: "20px" }}
              className="overflow-auto text-center text-break"
            >
              <h6 className="mb-0">{name}</h6>
            </div>
          )}
          {time && (
            <div>
              <small className="d-flex align-items-center">
                <p className="p-0 m-0 me-1 fs-6">
                  <MdOutlineDateRange />
                </p>
                <p className="p-0 m-0 mt-1">{time}</p>
              </small>
            </div>
          )}
        </button>
        <div>
          <button
            onClick={CompletedTask}
            className="btn fs-5 ps-0 pe-1 px-sm-3"
          >
            {Completed ? <BsCheck2Circle /> : <BsCircle />}
          </button>
        </div>
      </h2>
      <div
        id={`panelsStayOpen-collapse${id}`}
        className="accordion-collapse collapse bg-light"
      >
        {ovjEdit && !Completed ? (
          <div className="">
            <TaskInput setOvjEdit={setOvjEdit}>{ovjEdit}</TaskInput>
          </div>
        ) : (
          <div className="accordion-body p-2">
            <header className="">
              <nav className="navbar p-0">
                <div className="">
                  {edit && (
                    <div className="d-sm-flex small">
                      <p className="p-0 m-0 me-1">edit:</p>
                      <p className="p-0 m-0">{edit}</p>
                    </div>
                  )}
                  <div className="d-sm-flex">
                    <p className="p-0 m-0 me-1">created:</p>
                    <p className="p-0 m-0">{created}</p>
                  </div>
                </div>
                <div className="btn-group btn-group-sm">
                  <button
                    onClick={removeSingleTask}
                    className="btn btn-danger fs-5"
                    title="Delete a task"
                  >
                    <BiTaskX />
                  </button>
                  {!Completed && (
                    <button
                      onClick={editSingleTask}
                      className="btn btn-warning fs-5"
                      title="Edit a task"
                    >
                      <LuClipboardEdit />
                    </button>
                  )}
                </div>
              </nav>
            </header>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
