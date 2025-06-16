import { useFieldArray } from "react-hook-form";
import { FormInput } from "./FormInput";
import styles from "./Form.module.scss";
import { MdDelete } from "react-icons/md";
import Button from "../Button/Button";

function FormField({ input, register, error, control }) {
  const { fields: fieldInputs, name } = input;
  const { fields, remove } = useFieldArray({
    control,
    name,
    keyName: "fieldKey",
  });

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.fieldKey} className={styles.form__field}>
          {fieldInputs.map((fieldInput) => {
            const fieldName = `${name}.${index}.${fieldInput.id}`;
            return (
              <FormInput
                {...fieldInput}
                key={fieldName}
                id={fieldName}
                register={register}
                options={fieldInput?.options() || null}
                error={error?.[index]?.[fieldInput.id]}
              />
            );
          })}
          <Button action={() => remove(index)} size="round">
            <MdDelete />
          </Button>
        </div>
      ))}
    </>
  );
}

export default FormField;
