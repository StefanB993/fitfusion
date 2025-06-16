import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Icon from "../../../components/Icon/Icon";
import { useCurrentWorkout } from "../../workouts/hooks/useCurrentWorkout";
import { useAddExercise } from "../hooks/useAddExercise";
import styles from "./Exercise.module.scss";

function Exercise({ exercise }) {
  const { currentWorkout } = useCurrentWorkout();
  const { add, error, isAdding } = useAddExercise();
  const navigate = useNavigate();
  const { id, name, bodyPart, equipment } = exercise;

  async function handleAdd() {
    add({
      workout_plan_id: currentWorkout.id,
      exercise_id: id,
      status: currentWorkout.status,
    });
  }

  return (
    <article className={styles.exercise}>
      <header className={styles.exercise__header}>
        <Icon name={bodyPart} size={60} />
        <span className={styles.exercise__equipment}>{equipment}</span>
      </header>

      <div className={styles.exercise__body}>
        <h3 className={styles.exercise__name}>
          {name.replace(name[0], name[0].toUpperCase())}
        </h3>

        <div className={styles.exercise__controls}>
          <Button action={handleAdd} role="add" size="sm">
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}

export default Exercise;
