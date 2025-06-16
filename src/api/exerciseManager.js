import { EXERCISES_PER_PAGE } from "../config";
import supabase from "./supabase";

export async function getExercises({ queryKey }) {
  const [, { equipment, muscle, query, page }] = queryKey;

  const querySB = supabase.from("exercises").select("*", { count: "exact" });

  if (equipment !== "any") {
    querySB.eq("equipment", equipment);
  }

  if (muscle !== "any") {
    querySB.eq("bodyPart", muscle);
  }

  if (query) {
    querySB.textSearch("name", query);
  }

  if (page) {
    querySB.range(
      (page - 1) * EXERCISES_PER_PAGE,
      page * EXERCISES_PER_PAGE - 1
    );
  }

  const { data: exercises, error, count } = await querySB;

  if (error) {
    throw new Error(error.message);
  }

  if (exercises.length === 0) {
    throw new Error("No exercises found");
  }

  return { exercises, count };
}

export async function getExercise(id) {
  const { data, error } = await supabase
    .from("workout_exercises")
    .select(
      "id, exercises(name,instructions), workout_sets(id,reps,weight,rest)"
    )
    .eq("id", id)
    .order("id", { referencedTable: "workout_sets", ascending: true })
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function addExercise(exercise) {
  const { data, error } = await supabase
    .from("workout_exercises")
    .insert([exercise])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function addExerciseSets(exerciseSets) {
  const { error } = await supabase
    .from("workout_sets")
    .insert(exerciseSets)
    .select();

  if (error) {
    throw new Error(error.message);
  }
}

async function deleteExerciseSets(exerciseSets) {
  const ids = exerciseSets.map((set) => set.id);
  const { error } = await supabase
    .from("workout_sets")
    .delete()
    .in("id", ids)
    .select();

  if (error) {
    throw new Error(error.message);
  }
}

async function updateSets(exerciseSets) {
  const promises = exerciseSets.map((set) => {
    const { id, ...data } = set;
    return supabase.from("workout_sets").update(data).eq("id", id).select();
  });

  await Promise.all(promises);
}

export async function updateExerciseSet({ toAdd, toDelete, toUpdate }) {
  const promises = [];

  if (toUpdate.length > 0) {
    promises.push(updateSets(toUpdate));
  }
  if (toDelete.length > 0) {
    promises.push(deleteExerciseSets(toDelete));
  }
  if (toAdd.length > 0) {
    promises.push(addExerciseSets(toAdd));
  }

  await Promise.all(promises);
}
