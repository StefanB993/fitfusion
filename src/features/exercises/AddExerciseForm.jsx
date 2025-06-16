import { AuthForm } from "../../components/Form/AuthForm";

function AddExerciseForm() {
  const inputs = [
    {
      id: "sets",
      label: "Number of sets",
      type: "number",
    },
    {
      id: "reps",
      label: "Number of reps",
      type: "number",
    },
    {},
  ];
  return <AuthForm />;
}

export default AddExerciseForm;
