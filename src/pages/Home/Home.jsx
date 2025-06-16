import { Link } from "react-router-dom";
import Error from "../../components/Error/Error";
import FullPageLoad from "../../components/FullPageLoad/FullPageLoad";

import { useAllWorkouts } from "../../features/workouts/hooks/useAllWorkouts";
import styles from "./Home.module.scss";
import { FaComment, FaStar } from "react-icons/fa6";
import Select from "../../components/Select/Select";
import Pagination from "../../components/Pagination/Pagination";
import { WORKOUTS_PER_PAGE } from "../../config";
import Heading from "../../ui/Heading/Heading";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "most_comments", label: "Most Comments" },
  { value: "highest_rating", label: "Highest Rating" },
];

function Home() {
  const { workouts, isPending, isError, count } = useAllWorkouts();

  if (isPending) return <FullPageLoad />;

  if (isError) return <Error message={"Error loading workouts"} />;

  return (
    <div className={styles.home}>
      <Heading type="h1">Browse Workouts</Heading>
      <div className={styles.home__actions}>
        <Select
          className={styles.home__select}
          label="Sort"
          options={SORT_OPTIONS}
        />
        <Pagination
          count={count}
          itemsPerPage={WORKOUTS_PER_PAGE}
          small={true}
        />
      </div>

      {renderPosts(workouts)}
    </div>
  );
}

export default Home;

function Post({ workout }) {
  const { name, image } = workout.users;
  const { name: workoutName } = workout;
  const comments = workout.comments.length || 0;
  const rating =
    workout.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
      workout.ratings.length || 0;
  const ratingNumber = workout.ratings.length;

  return (
    <div className={styles.post}>
      <header className={styles.post__header}>
        <img src={image} alt="Workout" />
        <div>
          <h3 className={styles.post__author}>{workoutName}</h3>
          <p className={styles.post__date}>
            {new Date(workout.created_at).toLocaleDateString()}
          </p>
        </div>
        <div>
          <div>
            <p>
              <span>{rating.toFixed(1)}</span> <span>({ratingNumber})</span>
            </p>
            <FaStar />
          </div>
          <div>
            <span>{comments}</span>
            <FaComment />
          </div>
        </div>
      </header>

      <div className={styles.post__content}>
        <p className={styles.post__description}>
          {name} has shared a new workout!
        </p>

        <Link
          className={styles.post__button}
          to={`/dashboard/workouts/${workout.id}`}
        >
          View Workout
        </Link>
      </div>
    </div>
  );
}

function renderPosts(workouts) {
  return workouts.map((workout) => {
    return <Post key={workout.id} workout={workout} />;
  });
}
