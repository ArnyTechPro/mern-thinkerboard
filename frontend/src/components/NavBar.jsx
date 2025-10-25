import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const NavBar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
            <Link to="/" className="text-3xl font-bold text-primary font-mono tracking-tight">ThinkerBoard</Link>
            <Link to="/create" className="flex items-center gap-4 btn btn-primary">
                <PlusIcon className="size-5" />    
                Create Note
            </Link>
        </div>
      </div>
    </header>
  );
}

export default NavBar;