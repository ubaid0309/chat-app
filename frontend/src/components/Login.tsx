import PeopleChat from "@/assets/images/three_people_chat.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { cloud_name, upload_preset_name } from "../constant/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CLOUDINARY_API_KEY = import.meta.env.CLOUDINARY_API_KEY;

const Login = () => {
  const [activeForm, setActiveForm] = useState("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  //eslint-disable-next-line
  const submitHandler = async function (e: any, formType: string) {
    e.preventDefault();
    if (formType === "sign-in") {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          "https://chat-app-ydlm.onrender.com/api/user/login",
          { email, password },
          config
        );
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        toast.success("Login Successful ");
        navigate("/chats");
        //eslint-disable-next-line
      } catch (error: any) {
        toast.error(error.message);
        throw new Error(error.message);
      }
    } else {
      if (password !== confirmPassword) {
        toast.error("Password does not match", {
          position: "top-left",
        });
        return;
      }

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          "https://chat-app-ydlm.onrender.com/api/user",
          { name, email, password, profilePicture },
          config
        );
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        toast.success("Registration Successfully");
        navigate("/chats");
        //eslint-disable-next-line
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  };

  const changeForm = function (formType: string) {
    setActiveForm(formType);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setProfilePicture("");
  };

  //eslint-disable-next-line
  async function postProfilePicture(picture: any) {
    if (picture === undefined || picture === null) {
      toast.error("Please select a profile picture");
      return;
    }

    if (picture.type === "image/jpeg" || picture.type === "image/png") {
      try {
        const fileData = new FormData();
        fileData.append("file", picture);
        fileData.append("upload_preset", upload_preset_name);
        fileData.append("api_key", `${CLOUDINARY_API_KEY}`);
        fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
          method: "post",
          body: fileData,
        })
          .then((response) => response.json())
          .then((jsonResponse) =>
            setProfilePicture(jsonResponse.url.toString())
          );
      } catch (err) {
        throw new Error("Failed to upload profile picture");
      }
    } else {
      toast.error("Please select .png of .jpg files");
    }
  }
  return (
    <div className="login login-body flex justify-center items-center h-full w-full ">
      <div className="relative login-container flex rounded-xl  bg-[#edf6f9] w-[60%] shadow-md ">
        <div className="left-side w-[50%] max-md:hidden">
          <img
            className="object-contain w-[100%] h-[100%]"
            src={PeopleChat}
            alt="three-people-chat"
          />
        </div>
        <div className="right-side w-full md:w-[50%]">
          {activeForm === "sign-in" ? (
            <form onSubmit={(e) => submitHandler(e, "sign-in")}>
              <Card className="flex flex-col gap-2 ">
                <CardHeader>
                  <CardTitle className="font-poppins text-3xl font-semibold">
                    Sign In
                    <p className="font-normal text-sm mt-2">
                      New to Chat App ?{" "}
                      <button
                        className="text-blue-700 font-medium"
                        onClick={() => {
                          changeForm("sign-up");
                        }}
                      >
                        Create an account
                      </button>
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div>
                    <p className="flex gap-1 text-sm font-medium px-1 mb-1">
                      Email <span className="text-red-500">*</span>
                    </p>
                    <div className="flex items-center border px-2 rounded-md">
                      <Input
                        required
                        type="email"
                        placeholder="Enter your email"
                        className="placeholder:font-poppins"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="flex gap-1 text-sm font-medium px-1 mb-1">
                      Password <span className="text-red-500">*</span>
                    </p>
                    <div className="flex items-center border px-2 rounded-md">
                      <Input
                        required
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="placeholder:font-poppins"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {showPassword ? (
                        <FaRegEye
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        />
                      ) : (
                        <FaRegEyeSlash
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="mt-4">
                  <Button type="submit" className="w-[80%] mx-auto">
                    Sign In
                  </Button>
                </CardFooter>
              </Card>
            </form>
          ) : (
            <form onSubmit={(e) => submitHandler(e, "sign-up")}>
              <Card className="flex flex-col gap-2 ">
                <CardHeader>
                  <CardTitle className="font-poppins text-3xl font-semibold">
                    Sign Up
                    <p className="font-normal text-sm mt-2">
                      Already have an account ?{" "}
                      <button
                        className="text-blue-700 font-medium"
                        onClick={() => setActiveForm("sign-in")}
                      >
                        Sign In
                      </button>
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div>
                    <p className="flex gap-1 text-sm font-medium px-1 mb-1">
                      Name <span className="text-red-500">*</span>
                    </p>
                    <div className="flex items-center border px-2 rounded-md">
                      <Input
                        required
                        type="text"
                        placeholder="Enter your name"
                        className="placeholder:font-poppins"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="flex gap-1 text-sm font-medium px-1 mb-1">
                      Email <span className="text-red-500">*</span>
                    </p>
                    <div className="flex items-center border px-2 rounded-md">
                      <Input
                        required
                        type="email"
                        placeholder="Enter your email"
                        className="placeholder:font-poppins"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="flex gap-1 text-sm font-medium px-1 mb-1">
                      Password <span className="text-red-500">*</span>
                    </p>
                    <div className="flex items-center border px-2 rounded-md">
                      <Input
                        required
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="placeholder:font-poppins"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {showPassword ? (
                        <FaRegEye
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        />
                      ) : (
                        <FaRegEyeSlash
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="flex gap-1 text-sm font-medium px-1 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </p>
                    <div className="flex items-center border px-2 rounded-md">
                      <Input
                        required
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        className="placeholder:font-poppins"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      {showPassword ? (
                        <FaRegEye
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        />
                      ) : (
                        <FaRegEyeSlash
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="flex gap-1 text-sm font-medium px-1 mb-1">
                      Profile picture
                    </p>
                    <div className="flex items-center border px-2 rounded-md">
                      <Input
                        type="file"
                        className="placeholder:font-poppins"
                        //eslint-disable-next-line
                        onChange={(e: any) =>
                          postProfilePicture(e.target.files[0])
                        }
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="mt-4">
                  <Button type="submit" className="w-[80%] mx-auto">
                    {activeForm === "sign-in" ? "Sign In" : "Sign Up"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
