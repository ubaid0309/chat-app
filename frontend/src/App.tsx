import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/slice/userSlice";

interface UserInfoType {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  token: string;
}
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userInfo: UserInfoType = useSelector(
    (state: any) => state.user.userInfo
  );
  useEffect(() => {
    dispatch(setUserData(userInfo));
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, location, navigate, dispatch]);

  return (
    <div className="font-prompt h-screen w-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chats" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
