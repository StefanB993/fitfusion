import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import styles from "./Test.module.scss";

function Test({ ratingValue, setRatingValue }) {
  const maxRating = 5;
  const [hoveredRating, setHoveredRating] = useState(0);
  const ratingArray = Array.from(
    { length: maxRating },
    (_, index) => index + 1
  );

  return (
    <div className={styles.testContainer}>
      {ratingArray.map((value) => {
        const isFilled = value <= (hoveredRating || ratingValue);
        return (
          <span
            key={value}
            className={styles.star}
            onMouseEnter={() => setHoveredRating(value)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRatingValue(value)}
          >
            {isFilled ? <FaStar size={24} /> : <FaRegStar size={24} />}
          </span>
        );
      })}
    </div>
  );
}

export default Test;
