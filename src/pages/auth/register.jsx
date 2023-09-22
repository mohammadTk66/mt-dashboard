/* eslint-disable react/prop-types */
import { Form, withFormik, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const MyForm = ({ errors, touched }) => {
  const navigate = useNavigate();

  return (
    <>
      <h4 className="mb-6 mt-1 pb-1 text-xl font-semibold text-center">
        Register
      </h4>
      <Form>
        <div className="relative mb-2" data-te-input-wrapper-init="">
          {" "}
          <label
            htmlFor="username"
            className="pointer-events-none text-neutral-500 dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Username
          </label>
          <Field
            name="username"
            className={`min-h-[auto] w-full focus:border-slate-500 rounded outline-none border-slate-600 border-2  bg-transparent px-3 py-[0.40rem] dark:placeholder:text-neutral-200 ${
              touched.username && errors.username ? "border-red-500" : ""
            }`}
          />
          <ErrorMessage
            name="username"
            component="div"
            className="text-red-500"
          />
        </div>
        <div className="relative mb-2" data-te-input-wrapper-init="">
          {" "}
          <label
            htmlFor="email"
            className="pointer-events-none text-neutral-500 dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Email
          </label>
          <Field
            name="email"
            className={`min-h-[auto] w-full focus:border-slate-500 rounded outline-none border-slate-600 border-2  bg-transparent px-3 py-[0.40rem] dark:placeholder:text-neutral-200 ${
              touched.email && errors.email ? "border-red-500" : ""
            }`}
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
        </div>

        <div className="relative mb-4" data-te-input-wrapper-init="">
          {" "}
          <label
            htmlFor="password"
            className="pointer-events-none text-neutral-500 dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Password
          </label>
          <Field
            name="password"
            className={`min-h-[auto] w-full rounded outline-none border-slate-600 focus:border-slate-500 border-2  bg-transparent px-3 py-[0.40rem] dark:placeholder:text-neutral-200 ${
              touched.password && errors.password ? "border-red-500" : ""
            }`}
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />
        </div>
        <div className="relative mb-4" data-te-input-wrapper-init="">
          {" "}
          <label
            htmlFor="password_confirmation"
            className="pointer-events-none text-neutral-500 dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Repeat Password
          </label>
          <Field
            name="password_confirmation"
            className={`min-h-[auto] w-full focus:border-slate-500 rounded outline-none border-slate-600 border-2 bg-transparent px-3 py-[0.40rem] dark:placeholder:text-neutral-200 ${
              errors.username && touched.username ? "border-red-500" : ""
            }`}
          />
          <ErrorMessage
            name="password_confirmation"
            component="div"
            className="text-red-500"
          />
        </div>

        <div className="mb-12 pb-1 pt-1 text-center">
          <button
            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
            type="submit"
            style={{
              background:
                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
            }}
          >
            Signup
          </button>
        </div>
      </Form>
      <div className="flex items-center justify-between pb-6">
        <p className="mb-0 mr-2">Do you have account?</p>
        <button
          type="button"
          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </>
  );
};

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must be match")
    .required("Required"),
});

const Register = withFormik({
  mapPropsToValues: () => ({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  }),

  // Custom sync validation
  validationSchema: SignupSchema,
  handleSubmit: (values, { resetForm }) => {
    console.log("test", values);
    localStorage.setItem("userData", JSON.stringify(values));
    // resetForm();
    // props.navigate("/login");
    window.location.href = "/login";
  },
})(MyForm);

export default Register;
