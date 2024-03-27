import { useState } from "react";
import GeneratorPost from "./GeneratorPost";
import PostGenerate from "./PostGenerate";

const SectionGeneratePost = () => {
  const [postGenerated, setPostGenerated] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap flex-row ">
      <GeneratorPost
        postGenerated={postGenerated}
        setPostGenerated={setPostGenerated}
      />
      {postGenerated && <PostGenerate postGenerated={postGenerated} />}
    </div>
  );
};

export default SectionGeneratePost;
