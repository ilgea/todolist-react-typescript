import axios from "axios";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useEffect, useState } from "react";

// TypeScript, .env kullanıldığında url gibi değerleri varsayılan olarak "string | undefined" türünde kabul eder.
// Fonksyon içerisine yazdığımız url değerinde ise kesin olarak string bekler.
// Bunun çözümü için URL'nin varlığını kontrol eden bir tip koruması (type guard) ekliyoruz.
// Typescript'in type inference (tip çıkarımı) ile aşağıdaki url'nin tipi string | undefined olarak çıkarımlanır. Yani değer ya string olacak yada undefined olacak.

// checkURL fonksiyonunda yaptığımız if (!url) kontrolü bir "type narrowing" (tip daraltma)'dır.
// TypeScript buna "control flow based type analysis" (kontrol akışına dayalı tip analizi) der. 
// Yani kodun akışını takip ederek, belirli bir noktada bir değişkenin hangi tipte olabileceğini anlar.
// TypeScript burada return edilen değerin kesinlikle string olduğunu anlayabildiği için, fonksiyonun dönüş tipini otomatik olarak `string` olarak belirler.

const url = process.env.REACT_APP_API_URL;

const checkURL = () => {
  if (!url) {
    // Bu blokta TypeScript url'in undefined olduğunu bilir
    throw new Error("API URL is not defined in environment variables");
  }
  // Bu noktada TypeScript url'in kesinlikle string olduğunu anlar
  return url; // Artık url'in tipi sadece string'dir
};

const Home = () => {
  const [todos, setTodos] = useState<TodoType[]>([]); // şeklinde güncelliyoruz.
  // Yani yukarıdaki TodoType tipinde objeler alan bir array'dir diyoruz.

  const [todoCount, setTodoCount] = useState<number>(0);
  const [doneTodoCount, setDoneTodoCount] = useState<number>(0);

  const [selectedFilter, setSelectedFilter] = useState("todo");


  // todo'ları çekmek için bir fonksiyon tanımladık.
  const getTodos = async () => {
    try {
      const apiURL = checkURL();
      const { data } = await axios.get<TodoType[]>(apiURL);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // todo eklemek için bir fonksiyon tanımladık.
  const addTodo: AddTodoFunction = async (text) => {
    const newTodo = {
      task: text,
      isDone: false,
    };
    try {
      const apiURL = checkURL();
      await axios.post(apiURL, newTodo); // post metodu ile yeni todo'yu ekliyoruz. içerisine parametre olarak url ve yeni todo'yu alıyor.
      // setDoneTodoCount(doneTodoCount + 1);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDoneTodoCount(todos.filter((todo) => todo.isDone === true).length);
  }, [todos]);

  useEffect(() => {
    setTodoCount(todos.filter((todo) => todo.isDone === false).length);
  }, [todos]);


  // console.log("doneTodoCount", doneTodoCount);
  // console.log("todoCount", todoCount);

  const deleteTodo: DeleteTodoFunction = async (id) => {
    try {
      const apiURL = checkURL();
      await axios.delete(`${apiURL}/${id}`);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // todo'yu check etmek için fonksiyon
  const toggleCheckTodo: ToggleCheckTodoFunction = async (id) => {
    try {
      const checkedTodo = todos.find((todo) => todo.id === id);
      const apiURL = checkURL();
      await axios.put(`${apiURL}/${id}`, {
        ...checkedTodo,
        isDone: !checkedTodo?.isDone,
      });
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo: UpdateTodoFunction = async (todo, newTask) => {
    try {
      const apiURL = checkURL();
      await axios.put(`${apiURL}/${todo?.id}`, { ...todo, task: newTask });
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <header>My ToDo List</header>
      <AddTodo
        addTodo={addTodo}
        todoCount={todoCount}
        doneTodoCount={doneTodoCount}
        setSelectedFilter={setSelectedFilter}
      />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleCheckTodo={toggleCheckTodo}
        updateTodo={updateTodo}
        selectedFilter={selectedFilter}
      />
    </>
  );
};

export default Home;
