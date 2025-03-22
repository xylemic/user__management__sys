import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react"; 

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-indigo-600 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          User Management System
        </Link>

        {/* mobile menu button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={28} />
        </button>

        {/* desktop add user button */}
        <Link
          to="/add-user"
          className="hidden md:block bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
        >
          Add New User
        </Link>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white text-indigo-600 px-4 py-2">
          <Link 
            to="/add-user" 
            className="block py-2 hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Add New User
          </Link>
          <Link 
            to="/users" 
            className="block py-2 hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Users List
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
