import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillClipboard2PlusFill } from "react-icons/bs";
import { TbPencilX, TbPencilCheck } from "react-icons/tb";
import { MdDateRange } from "react-icons/md";
import GlobalContext from "../context/context";

function TaskInput(props) {
  const { tasks_ar, setTasksAr, FetchData } = useContext(GlobalContext);
  const [d, setD] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  useEffect(() => {
    if (!watch("name")) setD(false);
  }, [watch("name")]);

  useEffect(() => {
    if (props.children) {
      setValue("name", props.children.name);
      setValue(
        "time",
        props.children.time && props.children.time.replace(" ", "T")
      );
    }
  }, [props.children]);

  const onSubForm = async (_) => {
    if (props.children) {
      if (props.children.name !== _.name || props.children.time !== _.time) {
        const ovj = {
          ...props.children,
          ..._,
          time: _.time && _.time.replace("T", " "),
          edit: new Date().toLocaleString(),
        };
        const res = await FetchData(
          `http://localhost:3000/tasks/${props.children.id}`,
          "PUT",
          ovj
        );

        setTasksAr(res);
      }
      props.setOvjEdit();
    } else {
      const ovj = {
        id: Date.now(),
        ..._,
        time: _.time ? _.time.replace("T", " ") : "",
        created: new Date().toLocaleString(),
        Completed: false,
        edit: "",
      };

      const res = await FetchData(`http://localhost:3000/tasks`, "POST", ovj);
      setTasksAr(res);
    }
    reset();
  };

  return (
    <form
      className={
        props.children
          ? "shadow rounded-bottom bg-dark bg-gradient"
          : "shadow rounded bg-dark bg-gradient"
      }
      onSubmit={handleSubmit(onSubForm)}
      id="id_form"
    >
      {d && !props.children && (
        <div className="">
          <input
            {...register("time")}
            className="form-control border-0 bg-transparent text-white"
            type="datetime-local"
          />
        </div>
      )}
      <div className="d-flex">
        {props.setOvjEdit && (
          <button
            type="button"
            title="cancel edit"
            onClick={() => props.setOvjEdit()}
            className="btn text-white px-1"
          >
            <TbPencilX />
          </button>
        )}
        <input
          {...register("name", { required: true })}
          className="form-control border-0 bg-transparent text-white px-1"
          type=""
          placeholder="Enter a task"
        />
        {(watch("name") || props.children) && (
          <button
            type="button"
            className="btn text-white px-1"
            onClick={() => setD(!d)}
          >
            <MdDateRange />
          </button>
        )}
        <button
          type="submit"
          className="btn text-white px-1"
          title="Add a task"
        >
          {props.children ? <TbPencilCheck /> : <BsFillClipboard2PlusFill />}
        </button>
      </div>
      {d && props.children && (
        <div className="">
          <input
            {...register("time")}
            className="form-control border-0 bg-transparent text-white"
            type="datetime-local"
          />
        </div>
      )}
    </form>
  );
}

export default TaskInput;
