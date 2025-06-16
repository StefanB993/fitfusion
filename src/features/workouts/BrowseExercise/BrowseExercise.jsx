import Select from "../../../components/Select/Select";
import styles from "./BrowseExercise.module.scss";
import {
  EQUIPMENT_OPTIONS,
  BODY_PART_OPTIONS,
  EXERCISES_PER_PAGE,
} from "../../../config";
import { useExercises } from "../../exercises/hooks/useExercises";
import Exercise from "../../exercises/Exercise/Exercise";
import Search from "../../../components/Search/Search";
import FullPageLoad from "../../../components/FullPageLoad/FullPageLoad";
import Pagination from "../../../components/Pagination/Pagination";
import Error from "../../../components/Error/Error";
import Button from "../../../components/Button/Button";
import { FaXmark } from "react-icons/fa6";

import { useModal } from "../../../context/ModalProvider";

function BrowseExercise() {
  const { exercises, error, isPending, count } = useExercises();
  const { closeModal } = useModal();

  return (
    <div className={styles.browse}>
      <BrowseControler count={count} />
      <BrowsePagination count={count} />
      <BrowseGallery
        exercises={exercises}
        isPending={isPending}
        error={error}
      />
      <BrowseFooter count={count} />
      <Button action={closeModal} size="round">
        <FaXmark />
      </Button>
    </div>
  );
}

export default BrowseExercise;

function BrowseControler({ count }) {
  return (
    <div className={styles.browse__controler}>
      <Select label="Equipment" options={EQUIPMENT_OPTIONS} />
      <Select label="Muscle" options={BODY_PART_OPTIONS} />
      <Search label="Query" count={count} itemsPerPage={EXERCISES_PER_PAGE} />
    </div>
  );
}

function BrowseGallery({ exercises, isPending, error }) {
  if (isPending) {
    return <FullPageLoad />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <div className={styles.browse__gallery}>
      {exercises.map((exercise) => (
        <Exercise key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}

function BrowseFooter({ count }) {
  return (
    <footer className={styles.browse__footer}>
      <p>
        Results:<span>{count}</span>
      </p>
    </footer>
  );
}

function BrowsePagination({ count }) {
  return (
    <div className={styles.browse__pagination}>
      <Pagination count={count} />
    </div>
  );
}
