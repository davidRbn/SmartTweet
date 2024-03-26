import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useEmailVerification = () => {
  const naviguate = useNavigate();

  const verificationEmail = (user: any) => {
    if (user) {
      sendEmailVerification(user)
        .then((res) => {
          // Verification email sent.
          naviguate("/login/email-signup");
        })
        .catch((error) => {
          // Error occurred. Inspect error.code.
          console.log(error);
        });
    }
  };

  return { verificationEmail };
};

export default useEmailVerification;
