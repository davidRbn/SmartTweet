import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import CardWrapper from "../CardWrapper/CardWrapper";
import { CreditContext } from "../Context/CreditContext";
import Modal from "../Modal/Modal";
import SectionTypePost from "./TypePost/SectionTypePost";

type PropsGeneratorPost = {
  postGenerated: string | null;
  setPostGenerated: Dispatch<SetStateAction<string | null>>;
};

const GeneratorPost: FC<PropsGeneratorPost> = ({
  postGenerated,
  setPostGenerated,
}) => {
  const [loadingPost, setLoadingPost] = useState<boolean>(false);
  const [creditLimit, setCreditlimit] = useState<boolean>(false);
  const { removeCredit, credit } = useContext(CreditContext);

  // "Je recherche un tweet optimisé pour captiver mon public et susciter leur engagement, tout en respectant les normes de Twitter en termes de longueur.Tu utiliseras un ton ${type} Mon objectif est d'inclure un maximum de détails pour attirer efficacement l'attention de mon audience.Personnalisez les tweets en fonction des informations fournies par les utilisateurs",
  const fetchTwitterPost = async (post: string, type: string) => {
    setLoadingPost(true);
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN_GPT}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `I'm looking for a tweet optimized to captivate my audience and elicit their engagement, while adhering to Twitter's length standards. You will use a ${type} tone. My goal is to include maximum details to effectively grab my audience's attention. Customize the tweets based on the information provided by users.I'll detect the language of your next request and respond in the same language`,
          },
          {
            role: "user",
            content: post,
          },
        ],
        model: "gpt-3.5-turbo",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // Handle the JSON data here
        removeCredit();
        setPostGenerated(data.choices[0].message.content);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoadingPost(false));
  };

  const LimitPostCredit = () => {
    if (credit === 0) {
      setCreditlimit(true);
    }
    return null;
  };

  const generatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (LimitPostCredit() !== null) {
      return; // Quitter la fonction si la limite est atteinte
    }
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const type = formData.get("tweetType")?.toString() || "";
    const post = formData.get("generator")?.toString() || "";

    post !== "" && fetchTwitterPost(post, type);
    return;
  };

  return (
    <>
      <CardWrapper>
        <div className="m-auto flex flex-col justify-center">
          <span className="mb-2">Transform your text into a post</span>
          <form onSubmit={generatePost}>
            <SectionTypePost />
            <textarea
              className="border min-h-80 w-full "
              name="generator"
              id="generator"
              placeholder="insert your text here"
            />
            <input
              className=" w-full cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loadingPost}
              value={loadingPost ? "Loading..." : "Generate post"}
            />
          </form>
        </div>
      </CardWrapper>
      <Modal isOpen={creditLimit} onClose={() => setCreditlimit(false)} />
    </>
  );
};

export default GeneratorPost;
