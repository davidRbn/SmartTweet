import { User, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Dispatch, ReactNode, SetStateAction } from "react";
import useEmailVerification from "../hook/verificationEmail";
import AuthPrompt from "./AuthPrompt";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
type ToggleSigninSignup = "SIGNIN" | "SIGNUP" | "LOGIN";
type SigninProps = {
  children: ReactNode;
  setToggleSigninSignup: React.Dispatch<
    React.SetStateAction<ToggleSigninSignup>
  >;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoaderLogin: Dispatch<SetStateAction<boolean>>;
};

const Signup = ({
  children,
  setToggleSigninSignup,
  setError,
  setLoaderLogin,
}: SigninProps) => {
  const auth = getAuth();
  const db = getFirestore();
  const { verificationEmail } = useEmailVerification();

  const deleteUser = (user: User) => {
    if (user) {
      user
        .delete()
        .then(() => {
          console.log("Successfully deleted user");
        })
        .catch((error) => {
          console.log("Error deleting user:", error);
        });
    } else {
      console.log("No user is currently signed in.");
    }
  };

  const createDocumentUserWithCredit = (
    uid: string,
    email: string | null,
    user: User
  ) => {
    const usersCollectionRef = collection(db, "usersCollection");
    const userDocRef = doc(usersCollectionRef, uid);
    const data = {
      email: email,
      credit: 5,
    };

    setDoc(userDocRef, data)
      .then(() => {
        verificationEmail(user);
      })
      .catch(() => {
        setError("An error has occurred");
        deleteUser(user);
      });
  };

  const signUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        createDocumentUserWithCredit(user.uid, user.email, user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => setLoaderLogin(false));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form as HTMLFormElement);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    if (email !== "" && password !== "") {
      setLoaderLogin(true);
      signUp(email, password);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="text-center mb-5 mt-2">
          <h2>Signup</h2>
        </div>
        {children}
      </form>

      <AuthPrompt
        message="Already have an account ?"
        buttonText="Signin"
        signinOrSignup="SIGNIN"
        setError={setError}
        setToggleSigninSignup={setToggleSigninSignup}
      />
    </>
  );
};

export default Signup;
