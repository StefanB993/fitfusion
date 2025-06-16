import { FaPen } from "react-icons/fa6";
import Table from "../../../components/Table/Table";
import styles from "./WorkoutExercises.module.scss";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { useDeleteWorkoutExercise } from "../hooks/useDeleteWorkoutExercise";
import { useNavigate } from "react-router-dom";

function WorkoutExercises({ exercises, isOwner }) {
  const { deleteWorkoutExercise, isDeleting } = useDeleteWorkoutExercise();
  const navigate = useNavigate();
  const options = {
    cellRenderer: {
      bodyPart: {
        value: (bodyPart) => (
          <img
            src={`/svg/${bodyPart}.svg`}
            alt={bodyPart}
            style={{ width: "3rem" }}
          ></img>
        ),
      },
    },
    actions: isOwner
      ? [
          {
            label: "Edit",
            onClick: (row) => navigate(`${row}`),
            icon: FaPen,
            className: "edit-btn",
          },
          {
            label: "Delete",
            onClick: (row) => deleteWorkoutExercise(row),
            icon: FaTrashAlt,
            className: "delete-btn",
          },
        ]
      : [
          {
            label: "See",
            onClick: (row) => navigate(`${row}`),
            icon: FaEye,
            className: "edit-btn",
          },
        ],
  };

  return (
    <div className={styles.workoutExercises}>
      {exercises.length === 0 ? (
        <Empty />
      ) : (
        <Table data={exercises} options={options} />
      )}
    </div>
  );
}

export default WorkoutExercises;

function Empty() {
  return (
    <div className={styles.workoutExercises__empty}>
      <p>This workout has no exercises.</p>
    </div>
  );
}
