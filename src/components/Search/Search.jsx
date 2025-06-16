import { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import { useSearchParams } from "react-router-dom";

function Search({ label }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams((prev) => {
        prev.set(label, searchTerm);
        if (!prev.get("Page")) {
          prev.set("Page", 1);
        }
        return prev;
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm, label, searchParams, setSearchParams]);

  return (
    <input
      className={styles.search}
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    ></input>
  );
}

export default Search;
