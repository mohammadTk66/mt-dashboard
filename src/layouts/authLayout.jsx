import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import loginImg from "../assets/images/loginImg.svg";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";

const AuthLayout = () => {
  const { state } = useNavigate();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    console.log("auth status", auth);
  }, [auth]);
  if (state === "loading") return <h1>Loading...</h1>;

  return (
    <section className="gradient-form  bg-neutral-200 dark:bg-neutral-700 h-screen">
      <div className="container h-full p-10 m-auto">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <div className="object-cover w-28 m-auto mb-3 p-5  bg-slate-300 rounded-full">
                        <img src={Logo} alt="Logo" className=" w-full " />
                      </div>

                      <h6 className="mb-6 mt-1 pb-1 text-sm font-semibold">
                        We Are The{" "}
                        <span className=" text-cyan-200">MTWEBDEV</span> Team
                      </h6>
                    </div>
                    <Outlet />
                  </div>
                </div>
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <img
                    src={loginImg}
                    alt="Login Form Image"
                    className="w-full "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
