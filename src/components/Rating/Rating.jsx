import { FaRegStar, FaStar } from "react-icons/fa6";
import styles from "./Rating.module.scss";
import { useState } from "react";

function Rating({ ratingValue = 0, setRatingValue, id }) {
  const maxRating = 5;
  const [hoveredRating, setHoveredRating] = useState(0);
  const ratingArray = Array.from(
    { length: maxRating },
    (_, index) => index + 1
  );

  return (
    <div className={styles.rating}>
      {ratingArray.map((value) => {
        const isFilled = value <= (hoveredRating || ratingValue);
        return (
          <span
            key={value}
            className={styles.star}
            onMouseEnter={() => setHoveredRating(value)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRatingValue({ workoutId: id, rating: value })}
          >
            {isFilled ? <FaStar size={20} /> : <FaRegStar size={20} />}
          </span>
        );
      })}
    </div>
  );
}

export default Rating;
