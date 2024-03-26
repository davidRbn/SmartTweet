import React, { ReactNode } from "react";

type VariantColor = "blue" | "white" | "link";

type VariantWidth = "full" | "auto";

interface ButtonProps {
  children: ReactNode;
  onCustomClick?: (event: any) => void;
  buttonLoader?: boolean;
  width?: VariantWidth;
  addClass?: string;
  color?: VariantColor;
  // Vous pouvez ajouter d'autres props ici
}

const Button: React.FC<ButtonProps> = ({
  children,
  onCustomClick,
  buttonLoader = false,
  width = "full",
  addClass = "",
  color = "blue",
}) => {
  const colorVariants = {
    blue: "bg-blue-500 text-white hover:bg-blue-700",
    white: "bg-white text-black",
    link: "",
  };

  const widthVariant = {
    full: "w-full",
    auto: "w-auto",
  };

  return (
    <>
      <button
        className={`${colorVariants[color]} ${
          widthVariant[width]
        } font-bold py-2 px-4 rounded ${addClass} ${
          buttonLoader && "animate-spin"
        } `}
        onClick={onCustomClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
