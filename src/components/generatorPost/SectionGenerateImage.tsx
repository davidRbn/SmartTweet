import { useState } from "react";
import GeneratorPost from "./GeneratorPost";
import PostGenerate from "./PostGenerate";

const SectionGenerateImage = () => {
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

export default SectionGenerateImage;
