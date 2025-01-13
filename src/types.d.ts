// .d.ts dosyaları sadece type tanımlamaları yapılır. Kod çalıştırılmaz.
// bu şekilde tanımladığımızda bu tipleri typescript global olarak tanıyor.
// export-import ile uğraşmıyoruz.

interface TodoType {
  task: string;
  id: string | number; // | -> union type
  isDone: boolean;
}

type AddTodoFunction = (text: string) => void;
type DeleteTodoFunction = (id: string | number) => void;
type ToggleCheckTodoFunction = (id: string | number) => void;
type UpdateTodoFunction = (todo: TodoType, task: string) => void;
type GetSelectedFilterFunction = (filter: string) => void;

// Form olayları için e parametresinin türü React.FormEvent<HTMLFormElement> olmalıdır.
type FormSubmitEvent = React.FormEvent<HTMLFormElement>;

// ITodoListProps interface'ini kullanarak TodoList componentinin tip tanımlaması yapıyoruz.
interface ITodoListProps {
  todos: TodoType[];
  deleteTodo: DeleteTodoFunction;
  toggleCheckTodo: ToggleCheckTodoFunction;
  updateTodo: UpdateTodoFunction;
  selectedFilter: string;
}

// interface ProcessEnv {
//   REACT_APP_API_URL: string;
// }
