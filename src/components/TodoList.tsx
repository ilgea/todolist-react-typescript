import TodoItems from "./TodoItems";

const TodoList: React.FC<ITodoListProps> = ({ todos,deleteTodo, toggleCheckTodo, updateTodo,selectedFilter }) => {
  return (
    <section className="list_task">
      <ul id="ul">
        {todos.map((todo) => {
          return  <TodoItems key={todo?.id} todo={todo} deleteTodo={deleteTodo} toggleCheckTodo={toggleCheckTodo} updateTodo={updateTodo} selectedFilter={selectedFilter} />;
        })}
      </ul>
    </section>
  );
};

export default TodoList;
