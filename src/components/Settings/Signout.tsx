import Button from "../Button/Button";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const auth = getAuth();
  const naviguate = useNavigate();

  const disconnectUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        naviguate("/login");
      })
      .catch((error: Error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <div className="text-center">
      <Button
        color="white"
        width="auto"
        addClass="hover:text-red-500"
        onCustomClick={disconnectUser}
      >
        Sign out
      </Button>
    </div>
  );
};

export default Signout;
