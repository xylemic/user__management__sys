import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setSelectedUser, deleteUser } from '../store/userSlice';
import Loader from '../components/ui/Loader';

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || '0', 10);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { users, selectedUser, loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (userId && users.length > 0) {
      dispatch(setSelectedUser(userId));
    }
    
    // clear selected user when component unmounts
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch, userId, users]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
      navigate('/users');
    }
  };

  if (loading) return <Loader />;
  
  if (!selectedUser) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">User not found</p>
        <Link 
          to="/users"
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/edit-user/${selectedUser.id}`)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Basic Information</h2>
          <div className="space-y-3">
            <p className="flex items-center">
              <span className="font-medium w-24">Username:</span>
              <span>@{selectedUser.username}</span>
            </p>
            <p className="flex items-center">
              <span className="font-medium w-24">Email:</span>
              <span>{selectedUser.email}</span>
            </p>
            <p className="flex items-center">
              <span className="font-medium w-24">Phone:</span>
              <span>{selectedUser.phone || 'Not provided'}</span>
            </p>
            <p className="flex items-center">
              <span className="font-medium w-24">Website:</span>
              <span>{selectedUser.website || 'Not provided'}</span>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Address</h2>
          <div className="space-y-3">
            <p className="flex items-center">
              <span className="font-medium w-24">Street:</span>
              <span>{selectedUser.address.street}</span>
            </p>
            <p className="flex items-center">
              <span className="font-medium w-24">Suite:</span>
              <span>{selectedUser.address.suite}</span>
            </p>
            <p className="flex items-center">
              <span className="font-medium w-24">City:</span>
              <span>{selectedUser.address.city}</span>
            </p>
            <p className="flex items-center">
              <span className="font-medium w-24">Zipcode:</span>
              <span>{selectedUser.address.zipcode}</span>
            </p>
          </div>
        </div>

        {selectedUser.company && (
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Company</h2>
            <div className="space-y-3">
              <p className="flex items-center">
                <span className="font-medium w-24">Name:</span>
                <span>{selectedUser.company.name}</span>
              </p>
              {selectedUser.company.catchPhrase && (
                <p className="flex items-center">
                  <span className="font-medium w-24">Catchphrase:</span>
                  <span>{selectedUser.company.catchPhrase}</span>
                </p>
              )}
              {selectedUser.company.bs && (
                <p className="flex items-center">
                  <span className="font-medium w-24">BS:</span>
                  <span>{selectedUser.company.bs}</span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 pt-4 border-t">
        <Link 
          to="/users"
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back to Users
        </Link>
      </div>
    </div>
  );
};

export default UserDetailPage;

