import { useState } from "react";
import ResetIcon from "../assets/icons8-rotate-left-24.png";

function ResetButton({ handleReset }: { handleReset: () => void }) {
  const [isHovering, setIsHovering] = useState(false);

  const cleanLocalStorage = () => {
    localStorage.setItem("score", "0");
    localStorage.setItem("errors", "0");
    // localStorage.setItem("level", "1");
    handleReset();
  };

  return (
    <button
      className="flex items-center bg-transparent cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onDoubleClick={() => cleanLocalStorage()}
    >
      <img src={ResetIcon} alt="Ícone de reset" />
      {isHovering && <span className="ml-2">Resetar pontos.</span>}
    </button>
  );
}

export default ResetButton;
