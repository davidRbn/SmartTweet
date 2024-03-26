import { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import React from "react";
import LoginGoogle from "./LoginGoogle";

type ToggleSigninSignup = "SIGNIN" | "SIGNUP" | "LOGIN";

type LoginSectionProps = {
  toggleSigninSignup: string;
  setToggleSigninSignup: React.Dispatch<
    React.SetStateAction<ToggleSigninSignup>
  >;
};

const LoginSection = ({
  toggleSigninSignup,
  setToggleSigninSignup,
}: LoginSectionProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loaderLogin, setLoaderLogin] = useState<boolean>(false);

  const TagSigninSignup =
    toggleSigninSignup === "SIGNIN" || toggleSigninSignup === "LOGIN"
      ? Signin
      : Signup;

  const valueInputValidationForm = (toggle: string, loader: boolean) => {
    if ((toggle === "SIGNIN" && !loader) || (toggle === "LOGIN" && !loader)) {
      return "Signin";
    } else if (toggle === "SIGNUP" && !loader) {
      return "Signup";
    } else {
      return "Loading...";
    }
  };
  console.log("object");

  return (
    <>
      <div className="w-full max-w-xs m-auto flex flex-col items-center justify-center mt-10">
        <TagSigninSignup
          setToggleSigninSignup={setToggleSigninSignup}
          setError={setError}
          setLoaderLogin={setLoaderLogin}
        >
          <div className="mb-4 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              id="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p className="text-red-500 text-xs italic">
              {error ? error : null}
            </p>

            {/* <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p> */}
          </div>
          <div className="flex items-center justify-between">
            <input
              className=" w-full cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value={valueInputValidationForm(toggleSigninSignup, loaderLogin)}
              disabled={loaderLogin}
            />
          </div>
          <div className="text-center mt-5 mb-5">
            <span>or</span>
          </div>
          <LoginGoogle />
        </TagSigninSignup>
      </div>
    </>
  );
};

export default LoginSection;
