import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Route, Routes } from "react-router-dom";
import TodoList from "./Pages/TodoList.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/TodoList" element={<TodoList />} />
      </Routes>
    </>
  );
}

export default App;
