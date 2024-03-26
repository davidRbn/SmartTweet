import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import AuthPrompt from "./AuthPrompt";

// type SignInResponse = true | { error: any };
type ToggleSigninSignup = "SIGNIN" | "SIGNUP" | "LOGIN";
type SigninProps = {
  children: ReactNode;
  setToggleSigninSignup: React.Dispatch<
    React.SetStateAction<ToggleSigninSignup>
  >;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoaderLogin: Dispatch<SetStateAction<boolean>>;
};

const Signin = ({
  children,
  setToggleSigninSignup,
  setError,
  setLoaderLogin,
}: SigninProps) => {
  const auth = getAuth();
  const naviguate = useNavigate();

  const emailIsVerified = (emailVerified: Boolean) => {
    if (!emailVerified) {
      setToggleSigninSignup("LOGIN");
      naviguate("/login/email-signup");
    } else {
      naviguate("/generate-image");
    }
    return;
  };

  const signInUser = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const emailVerified: Boolean = userCredential.user.emailVerified;
        emailIsVerified(emailVerified);
      })
      .catch((error: Error) => {
        if (error) {
          if (error.message.includes("auth/invalid-credential")) {
            setError("Invalid email or password.");
          } else {
            setError("An error occurred.");
          }
        }
      })
      .finally(() => setLoaderLogin(false));
  };

  //Onclick pour la connexion
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    if (email !== "" && password !== "") {
      setLoaderLogin(true);
      signInUser(email, password);
    }
  };

  //Direction vers la vers le composant Signup

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="text-center mb-5 mt-2">
          <h2>Signin</h2>
        </div>
        {children}
      </form>
      <AuthPrompt
        message="Already have an account ?"
        buttonText="Signup"
        signinOrSignup="SIGNUP"
        setError={setError}
        setToggleSigninSignup={setToggleSigninSignup}
      />
    </div>
  );
};

export default Signin;
