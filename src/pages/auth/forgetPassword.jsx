/* eslint-disable react/prop-types */
import { Form, withFormik, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const MyForm = ({ errors, touched }) => {
  const navigate = useNavigate();
  return (
    <>
      <h4 className="mb-6 mt-1 pb-1 text-xl font-semibold text-center">
        Forget Password
      </h4>
      <Form>
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

        <div className="mb-12 pb-1 pt-1 text-center">
          <button
            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
            type="submit"
            style={{
              background:
                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
            }}
          >
            Recover Password
          </button>
        </div>
      </Form>
      <div className="flex items-center justify-between pb-6">
        <p className="mb-0 mr-2">Remember your password?</p>
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
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgetPassword = withFormik({
  mapPropsToValues: () => ({
    email: "",
  }),

  // Custom sync validation
  validationSchema: SignupSchema,
  handleSubmit: (values) => {
    console.log("test", values);
  },
})(MyForm);

export default ForgetPassword;
