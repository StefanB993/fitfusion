import supabase, { supabaseStorage } from "./supabase";
const DEFAULT_AVATAR =
  "https://fdrjcrrrxwntvbtcheks.supabase.co/storage/v1/object/public/avatars//user.png";

export async function signUpUser({ email, password, name }) {
  try {
    const imagePath = DEFAULT_AVATAR;

    const {
      data: { user },
      error: errorSignUp,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          image: imagePath,
        },
      },
    });

    if (errorSignUp) {
      throw new Error(errorSignUp.message);
    }

    return { user };
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
}

export async function getUser() {
  try {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) {
      return null;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    return user;
  } catch (error) {
    console.error("Error during getUser:", error);
    throw error;
  }
}

export async function signInUser({ email, password }) {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
}

export async function addUserDetails({ name, id, image }) {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([{ id, name, image }]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error during addUserDetails:", error);
    throw error;
  }
}

async function uploadImage({ imageData, id }) {
  try {
    const imgName = `${id}`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(imgName, imageData, {
        upsert: true,
        cacheControl: "0",
      });

    if (error) {
      throw new Error(error.message);
    }

    return imgName;
  } catch (error) {
    console.error("Error during image upload:", error);
    throw error;
  }
}

async function deleteImage(id) {
  try {
    await supabase.storage.from("avatars").remove([id]);
  } catch (error) {
    console.error("Error during image deletion:", error);
    throw error;
  }
}

export async function recoverPassword({ email }) {
  try {
    let { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        "https://stefanb993.github.io/fitfusion/dashboard/update-user",
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error during password recovery:", error);
    throw error;
  }
}

export async function getUserFromUsers(id) {
  try {
    let { data: users, error } = await supabase
      .from("users")
      .select("id")
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return users[0];
  } catch (error) {
    console.error("Error during getUserFromUsers:", error);
    throw error;
  }
}

export async function userSignOut() {
  try {
    let { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
}

export async function updateUser({ id, username, avatar, previousAvatar }) {
  console.log("updateUser", { id, username, avatar, previousAvatar });
  try {
    let imagePath = previousAvatar.split("/avatars/")[1];
    const isNewAvatar = avatar[0];
    if (isNewAvatar) {
      await deleteImage(imagePath);
      console.log("Deleting image");
      imagePath = await uploadImage({ imageData: avatar[0], id });
    }

    const { data, error } = await supabase.auth.updateUser({
      data: {
        name: username,
        image: `${supabaseStorage}/avatars/${imagePath}?t=${Date.now()}`,
      },
    });

    const { errorUpdate } = await supabase
      .from("users")
      .update({
        name: username,
        image: `${supabaseStorage}/avatars/${imagePath}?t=${Date.now()}`,
      })
      .eq("id", id)
      .select();

    if (error || errorUpdate) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error during user update:", error);
    throw error;
  }
}

export async function resetPassword({ password }) {
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
}
