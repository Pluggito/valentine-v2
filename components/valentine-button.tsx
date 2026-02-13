import { Heart } from "lucide-react";
import { useEffect } from "react";

interface ValentineButtonProps {
  text: string;
  setIsClicked: (value: boolean) => void;
  isClicked: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const ValentineMenuButton = ({
  text,
  setIsClicked,
  onClick,
  isClicked,
  disabled = false,
}: ValentineButtonProps) => {
  const handleClick = () => {
    if (disabled) return;

    setIsClicked(true);
    setTimeout(() => {
      onClick();
      // Reset the button state after navigation
      setTimeout(() => {
        setIsClicked(false);
      }, 100);
    }, 500); // Delay the onClick callback to allow the animation to complete
  };

  // Reset isClicked when disabled state changes
  useEffect(() => {
    if (disabled) {
      setIsClicked(false);
    }
  }, [disabled, setIsClicked]);

  return (
    <button
      className={`relative bg-pink-500 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 overflow-hidden ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${isClicked ? "w-12 h-12" : "w-full sm:w-1/3 h-[50px]"}`}
      onClick={handleClick}
      disabled={isClicked || disabled}
    >
      <div
        className={`flex items-center justify-center transition-all duration-300 ease-in-out ${
          isClicked ? "scale-0" : "scale-100"
        }`}
      >
        <Heart
          className={`w-7 h-7 ${isClicked ? "animate-none" : "animate-heartbeat"}`}
        />
        <span
          className={`transition-opacity duration-300 ease-in-out font-medium ml-2 ${isClicked ? "opacity-0" : "opacity-100"}`}
        >
          {text}
        </span>
      </div>
      {isClicked && (
        <Heart
          className="w-7 h-7 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          fill="white"
        />
      )}
    </button>
  );
};

export default ValentineMenuButton;
