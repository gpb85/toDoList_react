import { useState, useEffect } from "react";

const TodoList = () => {
  const [formSubject, setFormSubject] = useState("");
  const [formText, setFormText] = useState("");
  const [todolist, setTodoList] = useState([]);

  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem("ListToDo"));

    if (storedTodo) {
      setTodoList(storedTodo);
    }

    console.log("Todos from local storage==>", storedTodo);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const toDo = {
      id: Math.floor(Math.random() * 90000) + 10000,
      subject: formSubject,
      text: formText,
    };

    setTodoList([...todolist, toDo]);

    localStorage.setItem("ListToDo", JSON.stringify([...todolist, toDo]));
    setFormSubject("");
    setFormText("");
  };

  const handleDelete = (todo) => {
    const updatedTodoList = todolist.filter((item) => item.id !== todo.id);
    setTodoList(updatedTodoList);
    console.log("updated to Do", updatedTodoList);
    localStorage.setItem("ListToDo", JSON.stringify(updatedTodoList));
  };

  const deleteInputs = () => {
    setFormSubject("");
    setFormText("");
  };

  return (
    <div className="container">
      <div className="todolist-header">
        <h2>To Do List</h2>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="form-subject">Subject</label>
          <input
            onChange={(e) => {
              setFormSubject(e.target.value);
            }}
            type="text"
            id="form-subject"
            placeholder="Subject"
            value={formSubject}
            required
          />
          <label htmlFor="form-input">Textarea</label>
          <textarea
            onChange={(e) => {
              setFormText(e.target.value);
            }}
            placeholder="Write here.."
            id="form-input"
            value={formText}
            cols="30"
            rows="10"
            required
          ></textarea>
          <button type="submit">Submit</button>
          <button
            onClick={() => {
              deleteInputs();
            }}
          >
            Delete All
          </button>
        </form>
      </div>
      <div>
        <h1>my list</h1>
        <div>
          {todolist.map((todo) => (
            <div key={todo.id}>
              <p>title:{todo.subject}</p>
              <p>text:{todo.text}</p>
              <button
                onClick={() => {
                  handleDelete(todo);
                }}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
