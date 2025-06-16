import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addExerciseSet } from "../../../api/exerciseManager";
import { useModal } from "../../../context/ModalProvider";

export function useExerciseSet() {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const {
    mutate: addSet,
    isPending: isAddingSet,
    error,
  } = useMutation({
    mutationFn: addExerciseSet,
    onSuccess: () => {
      toast.success("Set added successfully!");
      queryClient.invalidateQueries(["exercise"]);

      closeModal("exerciseDetails");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to add set.");
    },
  });

  return {
    addSet,
    isAddingSet,
    error,
  };
}
