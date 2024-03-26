import Signout from "./Signout";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Settings = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1 className="text-3xl mt-4 text-center">Settings</h1>
      <div className="text-center mt-10">
        <span>
          You are currently logged in with the email address:{" "}
          <span className="font-bold">{user?.email}.</span>
        </span>
      </div>
      <Signout />
    </>
  );
};

export default Settings;
