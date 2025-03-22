import { Link } from "react-router-dom";
import { User } from "../../types/user.types";


interface UserCardProps {
  user : User;
  onEdit : (id : number) => void;
  onDelete : (id : number) => void;
}

const UserCard : React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
          <p className="text-gray-600">@{user.username}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(user.id)}
            className="text-indigo-600 hover:text-indigo-800 p-1"
            aria-label="Edit user"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 flex items-center">
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {user.email}
        </p>
        <p className="text-gray-700 flex items-center mt-1">
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {user.phone || 'Not provided'}
        </p>
      </div>
      <div className="border-t pt-4">
        <p className="text-gray-700 flex items-start">
          <svg className="h-4 w-4 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>
            {user.address.street}, {user.address.suite},
            <br />
            {user.address.city}, {user.address.zipcode}
          </span>
        </p>
      </div>
      <div className="mt-4">
        <Link
          to={`/users/${user.id}`}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View Details
          </Link>
      </div>
    </div>
  );
};

export default UserCard;
