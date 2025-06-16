import { TbBarbell } from "react-icons/tb";
import { useModal } from "../../context/ModalProvider";
import { useAddWorkout } from "../../features/workouts/hooks/useAddWorkout";
import { AuthForm } from "../../components/Form/AuthForm";
import Button from "../../components/Button/Button";

function AddWorkoutForm() {
  const { closeModal } = useModal();
  const { addWorkout, isAdding } = useAddWorkout();
  const inputs = [
    {
      id: "workoutName",
      type: "text",
      icon: TbBarbell,
      placeholder: "Workout name",
      options: () => ({ required: "* Workout Name is required." }),
    },
    // {
    //   id: "workoutDescription",
    //   type: "textarea",
    //   icon: GiGymBag,
    //   placeholder: "Say something about this workout...",
    //   validation: () => ({
    //     required: "* Workout Description is required.",
    //   }),
    // },
    {
      id: "status",
      label: "Should this workout be visible to others?",
      type: "checkbox",
      options: () => ({}),
    },
  ];

  function onSubmit(data) {
    const workout = {
      name: data.workoutName,
      status: data.status ? "public" : "private",
    };

    addWorkout(workout);
  }
  return (
    <AuthForm
      isLoading={isAdding}
      onSubmit={onSubmit}
      inputs={inputs}
      submitText="Add Workout"
      modifierClass="form--workout"
      extraContent={
        <Button disabled={isAdding} action={closeModal} type="sm">
          Cancel
        </Button>
      }
    />
  );
}

export default AddWorkoutForm;
