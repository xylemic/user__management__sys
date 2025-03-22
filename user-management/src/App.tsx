import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Layout from './components/layout/Layout';
import UserListPage from './pages/UserListPage';
import UserDetailPage from './pages/UserDetailPage';
import AddUserPage from './pages/AddUserPage';
import EditUserPage from './pages/EditUserPage';

const App : React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* redirect from root to users list */}
            <Route index element={<Navigate to="/users" replace />} />

            {/* users routes */}
            <Route path="users">
              <Route index element={<UserListPage />} />
              <Route path=":id" element={<UserDetailPage />} />
            </Route>

            {/* add and edit user routes */}
            <Route path="add-user" element={<AddUserPage />} />
            <Route path="edit-user/:id" element={<EditUserPage />} />

            {/* catch all - redirect to users list */}
            <Route path="*" element={<Navigate to="/users" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

