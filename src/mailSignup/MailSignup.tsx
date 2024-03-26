import { getAuth } from "firebase/auth";
import useEmailVerification from "../components/hook/verificationEmail";
import emailImage from "../assets/email.jpg";
import CardWrapper from "../components/CardWrapper/CardWrapper";

const MailSignup = () => {
  const { verificationEmail } = useEmailVerification();

  const auth = getAuth();

  return (
    <CardWrapper>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="max-w-xl mx-auto text-center ">
          <p className="mb-4 leading-8">
            An email has been sent to your email address for confirmation.
            Please check your inbox, including spam or junk folders, and follow
            the instructions to complete the confirmation process. If you
            haven't received the email, please click{" "}
            <button
              className="underline hover:text-blue-500"
              onClick={() => verificationEmail(auth)}
            >
              here
            </button>
            .
          </p>
        </div>
        <img className="max-w-60" alt="email" src={emailImage} />
      </div>
    </CardWrapper>
  );
};

export default MailSignup;
