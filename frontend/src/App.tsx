import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="font-roboto">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chats" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
