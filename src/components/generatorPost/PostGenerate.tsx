import React, { useState } from "react";
import CardWrapper from "../CardWrapper/CardWrapper";

type PropsPostGenerate = {
  postGenerated: string | null;
};

const PostGenerate: React.FC<PropsPostGenerate> = ({ postGenerated }) => {
  const [editedText, setEditedText] = useState(postGenerated || "");

  const handleTextChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    const newText = event.target.textContent || "";
    setEditedText(newText);
  };
  return (
    <CardWrapper>
      <div>
        <div
          contentEditable
          onInput={handleTextChange}
          dangerouslySetInnerHTML={{ __html: editedText }}
        ></div>
      </div>
    </CardWrapper>
  );
};

export default PostGenerate;
