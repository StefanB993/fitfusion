import { AuthForm } from "../../components/Form/AuthForm";
import { useAuth } from "../../context/AuthProvider";

function UpdateUserForm() {
  const {
    update,
    isUpdating,
    user: {
      id,
      email,
      user_metadata: { name, image },
    },
  } = useAuth();

  function onSubmit(data) {
    update({
      ...data,
      previousAvatar: image,
      id,
    });
  }

  const inputs = [
    {
      label: "Username",
      id: "username",
      type: "text",
      options: () => ({ required: "* Username is required." }),
    },

    {
      label: "Avatar",
      id: "avatar",
      type: "file",
      options: () => ({}),
    },
  ];
  return (
    <AuthForm
      inputs={inputs}
      submitText="Update"
      modifierClass="form--update"
      onSubmit={onSubmit}
      isLoading={isUpdating}
      defaultValues={{ id, email, username: name, previousAvatar: image }}
    />
  );
}

export default UpdateUserForm;
