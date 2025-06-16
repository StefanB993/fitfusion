import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addWorkout as addWorkoutApi } from "../../../api/workoutManager";
import toast from "react-hot-toast";
import { useModal } from "../../../context/ModalProvider";
import { useNavigate } from "react-router-dom";

export function useAddWorkout() {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: addWorkout, isLoading: isAdding } = useMutation({
    mutationFn: addWorkoutApi,
    onSuccess: (data) => {
      toast.success("Workout added successfully");
      closeModal();
      queryClient.invalidateQueries("workouts");
      queryClient.setQueryData(["currentWorkout"], data[0]);
      navigate(`/dashboard/workouts/${data[0].id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addWorkout, isAdding };
}
