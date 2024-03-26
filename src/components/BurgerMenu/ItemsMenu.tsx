import React, { Dispatch, SetStateAction } from "react";

type ItemsMenuProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

// Définir une interface pour les éléments de menu
interface MenuItem {
  text: string;
  href: string;
}

// Définir un type pour le tableau d'objets d'éléments de menu
type MenuItemsArray = MenuItem[];

// Données des éléments de menu
const menuItemsData: MenuItemsArray = [
  { text: "Generator", href: "#generate-image" },
  { text: "Settings", href: "#settings" },
];

const ItemsMenu: React.FC<ItemsMenuProps> = ({ setIsOpen }) => {
  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
      {menuItemsData.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          onClick={handleItemClick}
        >
          {item.text}
        </a>
      ))}
    </div>
  );
};

export default ItemsMenu;
