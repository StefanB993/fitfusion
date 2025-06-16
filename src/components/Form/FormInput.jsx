import styles from "./Form.module.scss";

export function FormInput({
  id,
  type,
  placeholder,
  icon: Icon,
  register,
  options,
  error,
  label,
}) {
  return (
    <div className={styles.form__group}>
      <div className={styles.form__inputwrap}>
        {label && <label htmlFor={id}>{label}</label>}
        {Icon && <Icon className={styles.form__icon} />}
        {type === "textarea" ? (
          <textarea
            id={id}
            placeholder={placeholder || ""}
            className={styles.form__input}
            {...register(id, options)}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder || ""}
            className={styles.form__input}
            {...register(id, options)}
          />
        )}
      </div>
      {error && <span className={styles.form__error}>{error.message}</span>}
    </div>
  );
}
