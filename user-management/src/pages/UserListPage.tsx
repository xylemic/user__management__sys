import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchUsers, deleteUser, clearError } from "../store/userSlice";
import UserList from "../components/users/UserList";
import Loader from "../components/ui/Loader";
import Alert from "../components/ui/Alert";

const UserListPage : React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state : RootState) => state.users);

  useEffect(() => {
    // fetch users when component mounts
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (id : number) => {
    navigate(`/edit-user/${id}`);
  };
  
  const handleDelete = (id : number) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => dispatch(clearError())}
        />
      )}

      {loading? (
        <Loader />
      ) : (
        <UserList
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UserListPage;

