import { PasswordResetForm } from "../../components/Form/Form";
import UpdateUserForm from "../../features/user/UpdateUserForm";
import styles from "./UpdateUser.module.scss";
function UpdateUser() {
  return (
    <div className={styles.updateUser}>
      <h1>Update your profile</h1>
      <UpdateUserForm />
      <PasswordResetForm />
    </div>
  );
}

export default UpdateUser;
