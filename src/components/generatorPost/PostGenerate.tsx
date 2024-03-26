import React from "react";
import CardWrapper from "../CardWrapper/CardWrapper";

type PropsPostGenerate = {
  postGenerated: string | null;
};

const PostGenerate: React.FC<PropsPostGenerate> = ({ postGenerated }) => {
  return (
    <CardWrapper>
      <div>
        <span>{postGenerated}</span>
      </div>
    </CardWrapper>
  );
};

export default PostGenerate;
