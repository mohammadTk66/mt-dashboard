import { useForm } from "react-hook-form";

const SimpleForm = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      age: 0,
    },
    mode: "onBlur",
  });
  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="gap-2 flex flex-col p-5 "
    >
      <div>
        <input {...register("firstName")} />
      </div>
      <div>
        <input {...register("lastName", { required: true })} />
        {errors.lastName && <p>Last name is required.</p>}
      </div>
      <div>
        <input {...register("age", { pattern: /\d+/ })} />
        {errors.age && <p>Please enter number for age.</p>}
      </div>
      <div className="flex gap-5">
        <button
          disabled={!isDirty || !isValid}
          className="bg-slate-300"
          type="submit"
        >
          Submit
        </button>
        <button type="button" onClick={() => resetField()}>
          reset
        </button>
      </div>
    </form>
  );
};

export default SimpleForm;
