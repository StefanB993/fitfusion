import styles from "./Workout.module.scss";

import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaChevronRight, FaCirclePlus } from "react-icons/fa6";
import WorkoutExercises from "../../features/workouts/WorkoutExercises/WorkoutExercises";
import Modal from "../../components/Modal/Modal";
import { useModal } from "../../context/ModalProvider";
import BrowseExercise from "../../features/workouts/BrowseExercise/BrowseExercise";
import { useWorkout } from "../../context/WorkoutProvider";
import { useToggleWorkoutStatus } from "../../features/workouts/hooks/useToggleWorkoutStatus";
import { set, useForm } from "react-hook-form";
import useComment from "./hooks/useComment";
import { useAuth } from "../../context/AuthProvider";
import useDeleteComment from "./hooks/useDeleteComment";
import Rating from "../../components/Rating/Rating";
import useRating from "../../features/rating/hooks/useRating";
import { useEffect, useState } from "react";

import BackButton from "../../components/Button/BackButton";

function Workout() {
  const { currentWorkout, exercises, isOwner, rating, comments, replies } =
    useWorkout();
  const { openModalName } = useModal();
  const { rateWorkout, isPending: isRatingPending } = useRating();

  const status = currentWorkout.status.toLowerCase().replace(" ", "-");
  const id = currentWorkout.id;

  return (
    <div className={styles.workout}>
      <header className={styles.workout__header}>
        <h1 className={styles.workout__title}>{currentWorkout.name}</h1>

        <div className={styles.workout__info}>
          {!isOwner && !isRatingPending && (
            <Rating ratingValue={rating} id={id} setRatingValue={rateWorkout} />
          )}
          {isOwner && <ToggleStatus status={status} id={id} />}
        </div>

        <div className={styles.workout__actions}>
          <BackButton to={"/dashboard/home"} />

          {isOwner && (
            <Button
              size={"sm"}
              action={() => openModalName("add-exercise")}
              className={styles.workout__add}
            >
              <FaCirclePlus /> Add Exercise
            </Button>
          )}
        </div>
      </header>

      <WorkoutExercises exercises={exercises} isOwner={isOwner} />

      <Comments comments={comments} replies={replies} />

      {!isOwner && <AddComment id={id} />}

      <Modal modalId="add-exercise">
        <BrowseExercise />
      </Modal>
    </div>
  );
}

export default Workout;

function ToggleStatus({ status, id }) {
  const { toggleStatus, isPending } = useToggleWorkoutStatus();

  return (
    <button
      disabled={isPending}
      className={`${styles.workout__status} ${styles[`${status}`]}`}
      onClick={() => toggleStatus({ id, status })}
    ></button>
  );
}

function AddComment({
  id,
  isReply = false,
  commentId = null,
  display = true,
  setDisplay = null,
}) {
  const { addComment, isAdding } = useComment();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const data = getValues();
      if (data.comment.trim()) {
        addComment({
          workoutId: id,
          comment: data.comment,
          replyTo: isReply ? commentId : null,
          isReply,
        });
        reset();
        setDisplay && setDisplay(false);
      }
    }

    if (event.key === "Escape") {
      reset();
      if (setDisplay) {
        setDisplay(false);
      }
    }
  }

  useEffect(() => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.focus();
    }
  });

  if (!display) {
    return null;
  }

  const onSubmit = (data) => {
    addComment({
      workoutId: id,
      comment: data.comment,
      replyTo: isReply ? commentId : null,
      isReply,
    });
    reset();
  };

  return (
    <form
      onKeyDown={handleKeyDown}
      className={styles[isReply ? "workout__addReply" : "workout__addComment"]}
      onSubmit={handleSubmit(onSubmit)}
    >
      <textarea
        {...register("comment", { required: "Comment is required" })}
        placeholder={isReply ? "Reply..." : "Add a comment..."}
      ></textarea>
      <div>
        <button disabled={errors.comment} type="submit">
          <FaChevronRight />
        </button>
      </div>
    </form>
  );
}

function Comments({ comments, replies }) {
  if (!comments || comments.length === 0) {
    return <p className={styles.workout__noComments}>No comments yet.</p>;
  }

  return (
    <div className={styles.workout__comments}>
      {comments.map((comment) => {
        const replyComments = replies.filter(
          (reply) => reply.reply_to === comment.id
        );

        return (
          <Comment key={comment.id} comment={comment} replies={replyComments} />
        );
      })}
    </div>
  );
}

function Comment({ comment, replies = [] }) {
  const content = comment.comment || "";
  const user = comment.users.name || "Anonymous";
  const avatar = comment.users.image || "";
  const workoutId = comment.workout_id || "";
  const isReply = comment.is_reply || false;

  const { isOwner } = useWorkout();
  const { deleteComment, isDeleting } = useDeleteComment();
  const { user: currentUser } = useAuth();
  const [isReplying, setIsReplying] = useState(false);

  const renderDelete = currentUser?.id === comment.owner || isOwner;

  return (
    <div
      className={`${styles.comment} ${isReply ? styles["comment--reply"] : ""}`}
    >
      <div className={styles.comment__wrapper}>
        <div className={styles.comment__avatar}>
          <img src={avatar} alt={user} />
        </div>
        <div className={styles.comment__content}>
          <div className={styles.comment__text}>
            <strong>{user}</strong>
            <p>{content}</p>
          </div>
          <footer className={styles.comment__footer}>
            <span>{new Date(comment.created_at).toLocaleDateString()}</span>
            {renderDelete && (
              <button
                disabled={isDeleting}
                onClick={() => deleteComment(comment.id)}
                className={styles.comment__delete}
              >
                Delete
              </button>
            )}
            {!isReply && (
              <button
                onClick={() => setIsReplying((prev) => !prev)}
                className={styles.comment__reply}
              >
                Reply
              </button>
            )}
          </footer>
        </div>
      </div>

      <AddComment
        id={workoutId}
        isReply={true}
        commentId={comment.id}
        display={isReplying}
        setDisplay={setIsReplying}
      />
      {replies.length > 0 && (
        <div className={styles.comment__replies}>
          {replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
