import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addUser, clearError } from '../store/userSlice';
import { NewUser } from '../types/user.types';
import UserForm from '../components/users/UserForm';
import Alert from '../components/ui/Alert';

const AddUserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.users);

  const handleSubmit = async (userData: NewUser) => {
    try {
      await dispatch(addUser(userData)).unwrap();
      navigate('/users');
    } catch (err) {
      // error is handled by the redux slice
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New User</h1>
      </div>

      {error && (
        <Alert 
          type="error" 
          message={error} 
          onClose={() => dispatch(clearError())} 
        />
      )}

      <UserForm 
        onSubmit={handleSubmit} 
        isLoading={loading}
      />
    </div>
  );
};

export default AddUserPage;

