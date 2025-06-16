import { GiWeight } from "react-icons/gi";
import { AuthForm } from "../../../components/Form/AuthForm";
import { MdOutlineNumbers, MdTimer } from "react-icons/md";
import Button from "../../../components/Button/Button";
import { useModal } from "../../../context/ModalProvider";

function AddExerciseSetForm({ exerciseId, setCurrentSets }) {
  const { closeModal } = useModal();

  const inputs = [
    {
      icon: MdOutlineNumbers,
      id: "reps",
      type: "number",
      placeholder: "Number of repetitions",
      options: () => ({
        required: "* Number of repetitions is required.",
      }),
    },
    {
      icon: GiWeight,
      id: "weight",
      type: "number",
      placeholder: "Weight (kg)",
      options: () => ({ required: "* Weight is required." }),
    },
    {
      id: "rest",
      type: "number",
      icon: MdTimer,
      placeholder: "Rest time (seconds)",
      options: () => ({ required: "* Rest time is required." }),
    },
  ];

  function handleSubmit(data) {
    const { reps, weight, rest } = data;
    setCurrentSets((prev) => [
      ...prev,
      {
        workout_exercise_id: exerciseId,
        reps: Number(reps),
        weight: Number(weight),
        rest: Number(rest),
      },
    ]);
    closeModal();
  }

  return (
    <AuthForm
      inputs={inputs}
      modifierClass="form--set"
      submitText="Add"
      extraContent={<Button action={closeModal}>Close</Button>}
      onSubmit={handleSubmit}
    />
  );
}

export default AddExerciseSetForm;
