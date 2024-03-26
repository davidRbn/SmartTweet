import React from "react";
type ToggleSigninSignup = "SIGNIN" | "SIGNUP" | "LOGIN";
interface AuthPromptProps {
  message: string;
  buttonText: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setToggleSigninSignup: React.Dispatch<
    React.SetStateAction<ToggleSigninSignup>
  >;
  signinOrSignup: ToggleSigninSignup;
}

const AuthPrompt: React.FC<AuthPromptProps> = ({
  message,
  buttonText,
  setError,
  setToggleSigninSignup,
  signinOrSignup,
}) => {
  const gotoSignupOrSigninSection = (e: React.MouseEvent) => {
    e.preventDefault();
    setError(null);
    setToggleSigninSignup(signinOrSignup);
  };
  return (
    <div className="text-center">
      {message}{" "}
      <button
        className="underline hover:text-blue-500 "
        onClick={(e) => gotoSignupOrSigninSection(e)}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default AuthPrompt;
