import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Button from "../Button/Button";
import GoogleIcon from "../../assets/Google__G__logo.svg";

const LoginGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const signinSingupGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;

        // console.log(token);
        // // The signed-in user info.
        // const user = result.user;
        // console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("registrer");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        // const email = error.customData.email;
        // console.log(email);
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // console.log(credential);
        // ...
      });
  };

  return (
    <>
      <Button
        color="white"
        width="full"
        onCustomClick={() => signinSingupGoogle()}
        addClass="hover:bg-gray-100"
      >
        <div className="flex items-center justify-center">
          <img src={GoogleIcon} alt="Google Icon" className="w-4 h-4 mr-2" />
          <span>Login with Google</span>
        </div>
      </Button>
    </>
  );
};

export default LoginGoogle;
