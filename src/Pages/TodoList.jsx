import { useState, useEffect } from "react";

const TodoList = () => {
  const [formSubject, setFormSubject] = useState("");
  const [formText, setFormText] = useState("");
  const [todolist, setTodoList] = useState([]);
  const [todoEdit, setTodoEdit] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editText, setEditText] = useState("");
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

  const handleSaveEdit = (e, todo) => {
    e.preventDefault();
    const updatedTodoList = todolist.filter((item) => {
      if (todo.id === item.id) {
        item.subject = editSubject;
        item.text = editText;
        return true; // Επιστρέφει true για να διατηρηθεί το στοιχείο
      }
      return true; // Επιστρέφει true για τα υπόλοιπα στοιχεία
    });
    setTodoList(updatedTodoList);
    localStorage.setItem("ListToDo", JSON.stringify(updatedTodoList));
    setTodoEdit("");
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
          {todolist.map((todo, index) => (
            <div key={todo.id}>
              {todoEdit === todo.id ? (
                <div className="edit-form">
                  <form onSubmit={(e) => handleSaveEdit(e, todo)}>
                    <label htmlFor="edit-title">Title</label>
                    <input
                      type="text"
                      value={editSubject}
                      onChange={(e) => {
                        setEditSubject(e.target.value);
                      }}
                    />
                    <label htmlFor="edit-text">Text</label>
                    <textarea
                      type="text"
                      value={editText}
                      onChange={(e) => {
                        setEditText(e.target.value);
                      }}
                    />
                    <button type="submit">Save</button>
                    <button
                      onClick={() => {
                        setTodoEdit("");
                      }}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <p>
                    {index + 1} title: {todo.subject}
                  </p>
                  <p>text: {todo.text}</p>
                  <button onClick={() => handleDelete(todo)}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <button
                    onClick={() => {
                      setEditSubject(todo.subject);
                      setEditText(todo.text);
                      setTodoEdit(todo.id);
                    }}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
