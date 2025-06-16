import { FaEnvelope } from "react-icons/fa";
import { AuthForm } from "../../components/Form/AuthForm";
import { useRecoverPassword } from "../../context/hooks/useRecoverPassword";

function PasswordRecoveryForm() {
  const { recoverPass, isRecovering } = useRecoverPassword();

  const inputs = [
    {
      id: "email",
      type: "email",
      icon: FaEnvelope,
      placeholder: "Enter your email",
      options: () => ({
        required: "* This field is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "* Invalid email address",
        },
      }),
    },
  ];
  return (
    <AuthForm
      inputs={inputs}
      onSubmit={recoverPass}
      isLoading={isRecovering}
      submitText="Reset Password"
    />
  );
}

export default PasswordRecoveryForm;
