import { useContext } from "react";
import { CreditContext } from "../Context/CreditContext";

const Credit = () => {
  const { credit } = useContext(CreditContext);

  return (
    <div className="mr-10 rounded-md border border-slate-100 p-2 bg-slate-300 opacity-50">
      <span>Credit : </span>
      <span>{credit}</span>
    </div>
  );
};

export default Credit;
