import { useMutation } from "@tanstack/react-query";
import { addExercise } from "../../../api/exerciseManager";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/ModalProvider";

export function useAddExercise() {
  const navigate = useNavigate();
  const { openModalName } = useModal();
  const {
    mutate: add,
    error,
    isPending: isAdding,
  } = useMutation({
    mutationFn: addExercise,
    onError: (error) => {
      toast.error("Failed to add exercise");
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Exercise added");
      navigate(`${data.id}`);
      openModalName("exerciseDetails");
    },
  });

  return { add, error, isAdding };
}
