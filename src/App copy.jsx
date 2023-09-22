/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage ";
import AdminPage from "./components/AdminPage";
import AuthorPage from "./components/AuthorPage";
import GuestPage from "./components/GuestPage";
import UnauthorizedPage from "./components/UnauthorizedPage";

// Fake user data
const fakeUsers = [
  { username: "admin", password: "admin", role: "admin" },
  { username: "author", password: "author", role: "author" },
  { username: "guest", password: "guest", role: "guest" },
];

// Private route component
const PrivateRoute = ({ path, element: Element, allowedRoles, userRole }) => {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Route path={path} element={<Element />} />;
};

// App component
const App = () => {
  const [userRole, setUserRole] = useState("");

  const handleLogin = (username, password) => {
    const user = fakeUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setUserRole(user.role);
      console.log("you loged in");
      console.log(userRole);
    } else {
      alert("Invalid username or password");
    }
  };
  useEffect(() => {
    console.log(userRole);
  }, [userRole]);

  return (
    <>
      <h1>Role-based Access Control</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/author">Author</Link>
          </li>
          <li>
            <Link to="/guest">Guest</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage handleLogin={handleLogin} />}
        />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute
              element={AdminPage}
              allowedRoles={["admin"]}
              userRole={userRole}
              path="/admin/*"
            />
          }
        />
        <Route
          path="/author/*"
          element={
            <PrivateRoute
              element={AuthorPage}
              allowedRoles={["admin", "author"]}
              userRole={userRole}
              path="/author/*"
            />
          }
        />
        <Route
          path="/guest/*"
          element={
            <PrivateRoute
              element={GuestPage}
              allowedRoles={["admin", "author", "guest"]}
              userRole={userRole}
            />
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
