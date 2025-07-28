import styles from "./Form.module.scss";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { AuthForm } from "./AuthForm";

export function SignUpForm() {
  const { register: signup, isRegistering } = useAuth();

  const inputs = [
    {
      id: "name",
      type: "text",
      placeholder: "Name",
      icon: FaUser,
      options: () => ({ required: "* Name is required." }),
    },
    {
      id: "email",
      type: "email",
      placeholder: "Email",
      icon: FaEnvelope,
      options: () => ({ required: "* Email is required." }),
    },
    {
      id: "password",
      type: "password",
      placeholder: "Password",
      icon: FaLock,
      options: () => ({
        required: "* Password is required.",
        minLength: {
          value: 6,
          message: "* Password must be at least 6 characters long.",
        },
      }),
    },
    {
      id: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      icon: FaLock,
      options: (getValues) => ({
        validate: (value) =>
          value === getValues("password") || "* The passwords do not match.",
      }),
    },
  ];

  return (
    <AuthForm
      onSubmit={signup}
      inputs={inputs}
      submitText="Register"
      isLoading={isRegistering}
    />
  );
}

export function LoginForm() {
  const { signIn, isSigningIn } = useAuth();

  const inputs = [
    {
      id: "email",
      type: "email",
      placeholder: "Email",
      icon: FaEnvelope,
      options: () => ({ required: "* Email is required." }),
    },
    {
      id: "password",
      type: "password",
      placeholder: "Password",
      icon: FaLock,
      options: () => ({ required: "* Password is required." }),
    },
  ];

  return (
    <AuthForm
      defaultValues={{ email: "pomlumekko@gufum.com", password: "123456" }}
      onSubmit={signIn}
      inputs={inputs}
      submitText="Sign in"
      isLoading={isSigningIn}
      extraContent={
        <div className={styles.form__group}>
          <Link to="/welcome/forgot-password" className={styles.form__link}>
            Forgot password?
          </Link>
        </div>
      }
    />
  );
}

export function PasswordResetForm() {
  const { reset, isResetting } = useAuth();
  const inputs = [
    {
      label: "Password",
      id: "password",
      type: "password",
      options: () => ({ required: "* Password is required." }),
    },
    {
      label: "Confirm Password",
      id: "confirmPassword",
      type: "password",
      options: (getValues) => ({
        required: "* Confirm Password is required.",
        validate: (value) =>
          value === getValues("password") || "Passwords do not match.",
      }),
    },
  ];

  return (
    <AuthForm
      inputs={inputs}
      submitText="Reset Password"
      modifierClass="form--update"
      onSubmit={reset}
      isLoading={isResetting}
    />
  );
}
