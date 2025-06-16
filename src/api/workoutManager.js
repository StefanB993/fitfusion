import { WORKOUTS_PER_PAGE } from "../config";
import supabase from "./supabase";

export async function getOwnWorkouts(id) {
  console.log(id);
  try {
    const { data, error } = await supabase
      .from("workouts")
      .select("*,workout_exercises(count)")
      .eq("user_id", id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error during get all workouts:", error);
    throw error;
  }
}

export async function getWorkout(id) {
  const { data, error } = await supabase
    .from("workouts")
    .select(
      "*,workout_exercises(id,exercises(*)), comments(*, users(image,name)), ratings(*)"
    )
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  if (data.length === 0) {
    throw new Error("Workout not found");
  }

  return data[0];
}

export async function deleteWorkout(id) {
  try {
    const { error } = await supabase.from("workouts").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error during delete workout:", error);
    throw error;
  }
}

export async function addWorkout(workout) {
  console.log("Adding workout:", workout);
  try {
    const { data, error } = await supabase
      .from("workouts")
      .insert([workout])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error during add workout:", error);
    throw error;
  }
}

export async function deleteWorkoutExercise(id) {
  try {
    const { error } = await supabase
      .from("workout_exercises")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error during delete workout exercise:", error);
    throw error;
  }
}

export async function toggleStatus({ id, status }) {
  console.log("Toggling status for workout ID:", id, "to", status);
  const newStatus = status === "public" ? "private" : "public";
  console.log("New status:", newStatus);
  const { error } = await supabase
    .from("workouts")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getAllWorkouts({ queryKey }) {
  const [_, { sort, page }] = queryKey;

  const querySB = supabase
    .from("workouts")
    .select("*,workout_exercises(count),users(*), comments(*), ratings(*)", {
      count: "exact",
    })
    .eq("status", "public");

  if (sort === "newest") {
    querySB.order("created_at", { ascending: false });
  }
  if (sort === "oldest") {
    querySB.order("created_at", { ascending: true });
  }

  const { data: workouts, error, count } = await querySB;

  let sortedWorkouts = workouts || [];

  if (sort === "most_comments") {
    sortedWorkouts.sort((a, b) => b.comments.length - a.comments.length);
  }

  if (sort === "highest_rating") {
    sortedWorkouts.sort((a, b) => {
      const avgRatingA =
        a.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
        a.ratings.length;
      const avgRatingB =
        b.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
        b.ratings.length;
      return avgRatingB - avgRatingA;
    });
  }

  if (page) {
    sortedWorkouts = sortedWorkouts.slice(
      (page - 1) * WORKOUTS_PER_PAGE,
      page * WORKOUTS_PER_PAGE
    );
  }

  if (error) {
    throw new Error(error.message);
  }

  return { workouts: sortedWorkouts, count };
}

export async function addComment({
  workoutId,
  comment,
  replyTo = null,
  isReply = false,
}) {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          workout_id: workoutId,
          comment,
          reply_to: replyTo,
          is_reply: isReply,
        },
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error during add comment:", error);
    throw error;
  }
}

export async function deleteComment(id) {
  console.log("Deleting comment with ID:", id);
  const { error } = await supabase.from("comments").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function addRating({ workoutId, rating }) {
  try {
    const { data, error } = await supabase
      .from("ratings")
      .upsert([{ workout_id: workoutId, rating }], {
        onConflict: ["workout_id", "user"],
      })
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error during add rating:", error);
    throw error;
  }
}
