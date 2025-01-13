import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCircleCheck,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

// Aşağıdaki gibi tanımlamaya gerek yok. Başlangıç değerinden kendisi anlıyor.
// type Task = string;
// const [task, setTask] = useState<Task>("");

interface IAddTodoComponent {
  addTodo: AddTodoFunction;
  todoCount: number;
  doneTodoCount: number;
  setSelectedFilter: GetSelectedFilterFunction;
}

const AddTodo: React.FC<IAddTodoComponent> = ({
  addTodo,
  todoCount,
  doneTodoCount,
  setSelectedFilter,
}) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e: FormSubmitEvent) => {
    e.preventDefault();
    if (!task || task.trim() == "") {
      setTask("");
      return;
    }
    addTodo(task);
    setTask("");
  };

  return (
    <section className="add_task">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="add_input"
          placeholder="Please enter a todo"
          autoFocus
          maxLength={140}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          type="submit"
          id="add_button"
          // disabled={!task || task.trim() == ""}
        >
          Add
        </button>
      </form>
      <div className="counter">
        <div>
          <span className="totalToDo">ToDo:</span>
          {/* <i className="fa-regular fa-circle-check none"> :</i> */}
          {/* <FontAwesomeIcon icon={faCircleCheck} /> */}
          <span className="count_ToDo">{todoCount}</span>
        </div>
        <div>
          <span className="complatedToDo">Done:</span>
          {/* <i className="fa-solid fa-check-double none"> :</i> */}
          {/* <FontAwesomeIcon icon="fa-solid fa-check-double" /> */}
          {/* <FontAwesomeIcon icon={faCheckDouble}/> */}
          <span className="count_Comp">{doneTodoCount}</span>
        </div>
        <div className="option-todos-div">
          <select className="select-el" defaultValue={"todo"} onChange={(e) => setSelectedFilter(e.target.value)}>
            <option className="option-el" value="all">
              All
            </option>
            <option  className="option-el" value="todo">
              ToDo
            </option>
            <option className="option-el" value="done">
              Done
            </option>
          </select>
        </div>
        {/* <div className="div_reset">
          <span className="reset">Reset: </span>
          <button
            className="power-off"
            data-title="Listeyi tamamladığınızda Done kısmını sıfırlar"
          >
            <FontAwesomeIcon icon={faPowerOff} />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default AddTodo;
