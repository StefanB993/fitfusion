import FullPageLoad from "../../components/FullPageLoad/FullPageLoad";
import Table from "../../components/Table/Table";

import { useWorkouts } from "../../features/workouts/hooks/useWorkouts";
import styles from "./Workouts.module.scss";
import { FaAngleLeft, FaTrashAlt } from "react-icons/fa";
import { FaCirclePlus, FaPen } from "react-icons/fa6";
import { useDeleteWorkout } from "../../features/workouts/hooks/useDeleteWorkout";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import ModalProvider, { useModal } from "../../context/ModalProvider";
import { useNavigate } from "react-router-dom";
import AddWorkoutForm from "../../features/workouts/AddWorkoutForm";

function Workouts() {
  const { workouts, isPending } = useWorkouts();
  const { deleteWorkout, isDeleting } = useDeleteWorkout();
  const navigate = useNavigate();

  function handleEdit(id) {
    navigate(`${id}`);
  }

  const options = {
    cellRenderer: {
      status: {
        className: (status) => (status === "private" ? "private" : "public"),
      },
      id: {
        className: () => "id",
      },
    },
    actions: [
      {
        label: "Edit",
        onClick: (row) => handleEdit(row),
        icon: FaPen,
        className: "edit-btn",
      },
      {
        label: "Delete",
        onClick: (row) => deleteWorkout(row),
        icon: FaTrashAlt,
        className: "delete-btn",
      },
    ],
  };

  if (isPending) {
    return <FullPageLoad />;
  }

  return (
    <ModalProvider>
      <div className={styles.workouts}>
        <Header workouts={workouts} />
        {workouts.length === 0 ? (
          <NoWorkouts />
        ) : (
          <Table data={workouts} options={options} />
        )}
      </div>

      <Modal modalId="addWorkout">
        <AddWorkoutForm />
      </Modal>
    </ModalProvider>
  );
}

export default Workouts;

function NoWorkouts() {
  const { openModalName } = useModal();
  return (
    <div className={styles.noWorkouts}>
      <p>You currently have no workouts.</p>
      <Button
        action={() => openModalName("addWorkout")}
        type="sm"
        to="/workouts/new"
      >
        Create a workout
      </Button>
    </div>
  );
}

function Header({ workouts }) {
  const { openModalName } = useModal();
  return (
    <header className={styles.workouts__header}>
      <h1>My Workouts</h1>
      {workouts.length > 0 && (
        <Button role="add" action={() => openModalName("addWorkout")}>
          <FaCirclePlus size={20} />
          Add
        </Button>
      )}
    </header>
  );
}
