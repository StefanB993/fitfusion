import { useSearchParams } from "react-router-dom";
import styles from "./Select.module.scss";

function Select({ options, label }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(label) || "any";

  function handleSelectChange(e) {
    searchParams.set(label, e.target.value);
    searchParams.set("Page", 1); // Reset to page 1 when changing filters
    setSearchParams(searchParams);
  }

  return (
    <div className={styles.select}>
      <p>{label}</p>
      <select onChange={handleSelectChange} value={value}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
