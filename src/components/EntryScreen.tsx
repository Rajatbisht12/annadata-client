import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const EntryScreen = () => {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center p-2 gap-20">
      <img src="/entryImage.jpg" alt="" className="w-96" />

      <Link to="/login">
        <Button className="rounded-full bg-transparent py-6 px-10 border-2 border-primary text-accent font-normal text-xl hover:bg-primary hover:text-white">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default EntryScreen;
