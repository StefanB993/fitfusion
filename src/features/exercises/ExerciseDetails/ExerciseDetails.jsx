import Button from "../../../components/Button/Button";

import Modal from "../../../components/Modal/Modal";
import { useModal } from "../../../context/ModalProvider";
import { useWorkout } from "../../../context/WorkoutProvider";
import AddExerciseSetForm from "../AddExerciseSetForm/AddExerciseSetForm";

import styles from "./ExerciseDetails.module.scss";

import { AuthForm } from "../../../components/Form/AuthForm";
import useUpdateExerciseSets from "../hooks/useUpdateExerciseSets";
import { useEffect, useState } from "react";
import BackButton from "../../../components/Button/BackButton";

function ExerciseDetails() {
  const { exercise, isOwner } = useWorkout();
  const { openModalName } = useModal();

  const name = exercise?.exercises?.name;
  const instructions = JSON.parse(exercise?.exercises?.instructions);

  const sets = exercise?.workout_sets;
  const [currentSets, setCurrentSets] = useState([]);

  const { id } = exercise;

  useEffect(() => {
    if (sets.length === 0) return;
    setCurrentSets(sets);
  }, [sets]);

  return (
    <>
      <div className={styles.exerciseDetails}>
        <div className={styles.exerciseDetails__actions}>
          <BackButton />
        </div>
        <h2 className={styles.exerciseDetails__heading}>{name}</h2>
        <ol>
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>

        {isOwner ? (
          currentSets.length === 0 ? (
            <Button action={() => openModalName("exerciseDetails")}>
              Add set
            </Button>
          ) : (
            <SetForm sets={currentSets} />
          )
        ) : (
          <Sets sets={sets} />
        )}
      </div>

      <Modal modalId="exerciseDetails">
        <AddExerciseSetForm exerciseId={id} setCurrentSets={setCurrentSets} />
      </Modal>
    </>
  );
}

export default ExerciseDetails;

function SetForm({ sets }) {
  const { openModalName } = useModal();
  const { update, isPending } = useUpdateExerciseSets();
  const defaultValues = {
    sets,
  };

  const inputs = [
    {
      isFieldArray: true,
      name: "sets",
      fields: [
        {
          label: "Reps",
          id: "reps",
          type: "number",
          options: () => ({
            required: "* Reps is required.",
            valueAsNumber: true,
            min: 1,
          }),
        },
        {
          label: "Weight",
          id: "weight",
          type: "number",
          options: () => ({
            required: "* Weight is required.",
            valueAsNumber: true,
            min: 0,
          }),
        },
        {
          label: "Rest",
          id: "rest",
          type: "number",
          options: () => ({
            required: "* Rest is required.",
            valueAsNumber: true,
            min: 1,
          }),
        },
      ],
    },
  ];

  function differentiateSets(sets, newSets) {
    function isEqual(set1, set2) {
      return JSON.stringify(set1) === JSON.stringify(set2);
    }
    const newSetMap = new Map(newSets.map((set) => [set.id, set]));
    const originalSetMap = new Map(sets.map((set) => [set.id, set]));

    const toDelete = sets.filter((set) => !newSetMap.has(set.id));
    const toAdd = newSets.filter((set) => set.id === undefined);
    const toUpdate = newSets.filter((set) => {
      const originalSet = originalSetMap.get(set.id);

      return originalSet && !isEqual(originalSet, set);
    });

    return { toDelete, toAdd, toUpdate };
  }

  function handleSubmit({ sets: newSets }) {
    const { toDelete, toAdd, toUpdate } = differentiateSets(sets, newSets);
    update({
      toDelete,
      toAdd,
      toUpdate,
    });
  }

  return (
    <AuthForm
      inputs={inputs}
      submitText="Save"
      isLoading={false}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      modifierClass="form--sets"
      useContext={true}
      extraContent={
        <Button action={() => openModalName("exerciseDetails")}>Add set</Button>
      }
    />
  );
}

function Sets({ sets }) {
  return (
    <div className={styles.sets}>
      {sets.map((set, index) => (
        <div key={index} className={styles.sets__set}>
          <p>
            Reps: <span>{set.reps}</span>
          </p>
          <p>
            Weight: <span>{set.weight} kg</span>
          </p>
          <p>
            Rest: <span>{set.rest} s</span>
          </p>
        </div>
      ))}
    </div>
  );
}
