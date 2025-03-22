import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="hidden md:block md:w-48">
      <div className="bg-white rounded-lg shadow-md p-4">
        <ul>
          <li className="mb-2">
            <NavLink 
              to="/users" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'hover:bg-gray-100'}`
              }
            >
              Users List
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/add-user" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'hover:bg-gray-100'}`
              }
            >
              Add New User
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
