import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useCurrentWorkout } from "../features/workouts/hooks/useCurrentWorkout";
import FullPageLoad from "../components/FullPageLoad/FullPageLoad";
import Error from "../components/Error/Error";
import { useAuth } from "./AuthProvider";
import { useExercise } from "../features/exercises/hooks/useExercise";

const WorkoutContext = React.createContext();

export default function WorkoutProvider() {
  const { currentWorkout, exercises, isPending, error } = useCurrentWorkout();
  const {
    exercise,
    isPending: isPendingExercise,
    errorExercise,
  } = useExercise();
  const { user } = useAuth();

  const { rating = 0 } =
    currentWorkout?.ratings.find((r) => r.user === user.id) || {};

  const { replies, comments } = currentWorkout?.comments.reduce(
    (acc, comment) => {
      if (comment.is_reply) {
        acc.replies.push(comment);
      } else {
        acc.comments.push(comment);
      }
      return acc;
    },
    { replies: [], comments: [] }
  ) || { replies: [], comments: [] };

  if (isPending || isPendingExercise) {
    return <FullPageLoad />;
  }

  if (error || errorExercise) {
    return <Error message={error.message} />;
  }

  const isOwner = currentWorkout.user_id === user.id;

  return (
    <WorkoutContext.Provider
      value={{
        currentWorkout,
        exercises,
        exercise,
        isOwner,
        rating,
        comments,
        replies,
      }}
    >
      <Outlet />
    </WorkoutContext.Provider>
  );
}

export const useWorkout = () => useContext(WorkoutContext);
