import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { updateUser, setSelectedUser, clearError } from '../store/userSlice';
import { UpdateUser, NewUser } from '../types/user.types';
import UserForm from '../components/users/UserForm';
import Loader from '../components/ui/Loader';
import Alert from '../components/ui/Alert';

const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || '0', 10);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { users, selectedUser, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (userId && users.length > 0) {
      dispatch(setSelectedUser(userId));
    }
    
    // clear selected user when component unmounts
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch, userId, users]);

  const handleSubmit = async (userData: NewUser | UpdateUser) => {
  try {
    if ("id" in userData) {
      await dispatch(updateUser(userData as UpdateUser)).unwrap();
    } else {
      console.error("Invalid user data for update.");
    }
    navigate('/users');
  } catch (err) {
    console.error("Error updating user:", err);
  }
};

  if (loading && !selectedUser) return <Loader />;
  
  if (!selectedUser) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">User not found</p>
        <button
          onClick={() => navigate('/users')}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit User</h1>
      </div>

      {error && (
        <Alert 
          type="error" 
          message={error} 
          onClose={() => dispatch(clearError())} 
        />
      )}

      <UserForm 
        initialData={selectedUser}
        onSubmit={handleSubmit} 
        isLoading={loading}
      />
    </div>
  );
};

export default EditUserPage;

