// children kullanılmadığından React.FC kullanmadık. Direk fonksiyon tipi tanımlaması yaptık

import {
  faCheck,
  faCircleCheck,
  faPencil,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { StyledWrapper } from "./style/ItemList.styled";

interface ITodoItemListProps {
  todo: TodoType;
  deleteTodo: DeleteTodoFunction;
  toggleCheckTodo: ToggleCheckTodoFunction;
  updateTodo: UpdateTodoFunction;
  selectedFilter: string;
}

const TodoItems = ({
  todo,
  deleteTodo,
  toggleCheckTodo,
  updateTodo,
  selectedFilter,
}: ITodoItemListProps) => {
  const [todoTextId, setTodoTextId] = useState<string | number | null>("");
  const [todoText, setTodoText] = useState<string>("");

  const [showTodo, setShowTodo] = useState<string | boolean>(true); // kod fazlalığını önlemek için select tipini bir state ile kontrol ettik

  const inputRef = useRef<HTMLInputElement>(null);
  // Bu satır şöyle düşünülebilir: "input elementine ulaşmak için bir anahtar oluştur"

  const handleDeleteTodo = () => {
    deleteTodo(todo?.id);
  };

  const handleToggleTodo = () => {
    toggleCheckTodo(todo?.id);
  };

  const handleTodoEdit = (task: string) => {
    setTodoTextId(todo?.id);
    setTodoText(todo?.task);
  };

  const handleUpdateTodo = () => {
    updateTodo(todo, todoText);
    setTodoTextId(null);
    setTodoText("");
  };

  useEffect(() => {
    if (selectedFilter === "all") setShowTodo(true);
    if (selectedFilter === "done") setShowTodo(todo?.isDone);
    if (selectedFilter === "todo") setShowTodo(!todo?.isDone);
  }, [selectedFilter, todo?.isDone]);

  useEffect(() => {
    // editTodoId değiştiğinde ve null değilse input'a focus ol
    if (todoTextId !== null) {
      inputRef.current?.focus();
    }
  }, [todoTextId]);
  // Bu kod şöyle okunabilir: "editTodoId değiştiğinde, elimizdeki anahtarı kullanarak input'u bul ve focus ol"

  return (
    <>
      {showTodo && (
        <li className={todo?.isDone ? "checked" : ""}>
          {/* <i onClick={handleToggleTodo}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </i> */}
          <StyledWrapper onClick={handleToggleTodo}>
            <label className="containerCheck">
              <input type="checkbox" checked={todo?.isDone} />
              <div className="checkmark" />
            </label>
          </StyledWrapper>
          {todoTextId === todo?.id ? (
            <input
              ref={inputRef} // ref eklendi
              className="edit-input"
              type="text"
              value={todoText}
              maxLength={140}
              onChange={(e) => setTodoText(e.target.value)}
              onKeyDown={(e) => {if (e.key === "Enter") handleUpdateTodo()}}
            />
          ) : (
            <p>{todo?.task}</p>
          )}
          <i
            className="fa-edit fa-pencil-edit"
            onClick={() =>
              todoTextId === todo?.id
                ? handleUpdateTodo()
                : handleTodoEdit(todoText)
            }
          >
            {todoTextId === todo?.id ? (
              <FontAwesomeIcon className="faCheckIcon" icon={faCheck} />
            ) : (
              <FontAwesomeIcon icon={faPencil} />
            )}
          </i>

          <i className="fa-square-minus" onClick={handleDeleteTodo}>
            <FontAwesomeIcon icon={faSquareMinus} />
          </i>
        </li>
      )}
    </>
  );
};

export default TodoItems;
