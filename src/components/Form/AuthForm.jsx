import { useForm, useFormContext } from "react-hook-form";
import styles from "./Form.module.scss";
import { FormInput } from "./FormInput";
import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import FormField from "./FormField";
import { useEffect, useRef } from "react";

export function AuthForm({
  onSubmit,
  inputs,
  submitText,
  isLoading,
  extraContent,
  modifierClass = "",
  defaultValues = {},
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
  } = useForm({
    defaultValues,
  });

  const prevDefaultValues = useRef(defaultValues);

  useEffect(() => {
    if (
      JSON.stringify(prevDefaultValues.current) !==
      JSON.stringify(defaultValues)
    ) {
      reset(defaultValues);
      prevDefaultValues.current = defaultValues;
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`${styles.form} ${styles[modifierClass]}`}
    >
      {inputs.map((input) => {
        if (input.isFieldArray)
          return (
            <FormField
              key={input.name}
              register={register}
              error={errors[input.name]}
              control={control}
              input={input}
            />
          );
        else {
          return (
            <FormInput
              key={input.id}
              {...input}
              register={register}
              options={input?.options(getValues) || null}
              error={errors[input.id]}
            />
          );
        }
      })}

      <div className={styles.form__group}>
        {extraContent}
        <Button type="submit">
          {isLoading ? <Spinner size="small" /> : submitText}
        </Button>
      </div>
    </form>
  );
}
