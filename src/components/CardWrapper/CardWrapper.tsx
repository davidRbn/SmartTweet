import { ReactNode } from "react";
interface CardWrapperProps {
  children: ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
  return (
    <>
      <div className="my-8 max-w-96 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        {children}
      </div>
    </>
  );
};

export default CardWrapper;
