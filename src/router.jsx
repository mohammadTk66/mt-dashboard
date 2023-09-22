import {
  Navigate,
  Outlet,
  createBrowserRouter,
  // redirect,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
// import Store from "./pages/Store";
// import About from "./pages/About";
// import Team from "./pages/Team";
// import TeamMember from "./pages/TeamMember";
// import NewTeamMember from "./pages/NewTeamMember";
// import TeamNav from "./TeamNav";
import Navbar from "./Navbar";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ForgetPassword from "./pages/auth/forgetPassword";
import AuthLayout from "./layouts/authLayout";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "*", element: <Navigate to="/login" /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forget-password", element: <ForgetPassword /> },
      // {
      //   path: "/team",
      //   element: <TeamNavLayout />,
      //   loader: async ({ request: { signal } }) => {
      //     return await fetch("https://jsonplaceholder.typicode.com/users", {
      //       signal,
      //     });
      //   },
      //   children: [
      //     { index: true, element: <Team /> },
      //     {
      //       path: ":memeberId",
      //       loader: async ({ request: { signal }, params }) => {
      //         return await fetch(
      //           `https://jsonplaceholder.typicode.com/users/${params.memeberId}`,
      //           {
      //             signal,
      //           }
      //         ).then((res) => {
      //           if (res.status === 200) return res.json();

      //           throw redirect("/team");
      //         });
      //       },
      //       element: <TeamMember />,
      //     },
      //     { path: "new", element: <NewTeamMember /> },
      //   ],
      // },
    ],
  },
  {
    element: <NavLayout />,
    children: [
      { path: "*", element: <Navigate to="/login" /> },
      { path: "/", element: <Home /> },
    ],
  },
  // {
  //   element: <NavLayout />,
  //   children: [
  //     { path: "*", element: <Navigate to="/" /> },
  //     <PrivateRoute key={1} path="/" element={<Home />} />,
  //     <PrivateRoute key={2} path="/login" element={<Login />} />,
  //     <PrivateRoute key={3} path="/register" element={<Register />} />,
  //   ],
  // },
]);

function NavLayout() {
  const { state } = useNavigate();
  return (
    <>
      <Navbar />
      {state === "loading" ? <h1>Loading...</h1> : <Outlet />}
    </>
  );
}

// function TeamNavLayout() {
//   return (
//     <>
//       <TeamNav />
//       <Outlet context={"hi from teamnav"} />
//     </>
//   );
// }
