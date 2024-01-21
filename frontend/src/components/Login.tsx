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

const Login = () => {
  const [activeForm, setActiveForm] = useState("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function submitHandler(e: any) {
    e.preventDefault();
    console.log(email, password);
  }
  return (
    <div className="flex justify-center items-center h-full w-full ">
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
            <form>
              <Card className="flex flex-col gap-2 ">
                <CardHeader>
                  <CardTitle className="font-poppins text-3xl font-semibold">
                    Sign In
                    <p className="font-normal text-sm mt-2">
                      New to Chat App ?{" "}
                      <button
                        className="text-blue-700 font-medium"
                        onClick={() => setActiveForm("sign-up")}
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
                  <Button
                    type="submit"
                    className="w-[80%] mx-auto"
                    onClick={submitHandler}
                  >
                    Sign In
                  </Button>
                </CardFooter>
              </Card>
            </form>
          ) : (
            <form>
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
                      <Input type="file" className="placeholder:font-poppins" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="mt-4">
                  <Button
                    type="submit"
                    className="w-[80%] mx-auto"
                    onClick={submitHandler}
                  >
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
