import Heading from "../../ui/Heading/Heading";
import styles from "./About.module.scss";
function About() {
  return (
    <div className={styles.about}>
      <Heading>About FitFusion</Heading>
      <div className={styles.about__content}>
        <p>
          FitFusion is your all-in-one space to create, share, and discover
          workout plans that fit your lifestyle. With a library of over 1,300
          exercises, you can build routines that match your goals — whether
          you're training at home, in the gym, or on the go.
        </p>
        <p>
          Looking for fresh ideas or a little motivation? Check out plans from
          other users, rate your favorites, and join the conversation by leaving
          comments.
        </p>
        <p>
          FitFusion is all about community, inspiration, and making fitness feel
          more personal and fun. Built with React and powered by Supabase,
          FitFusion is fast, easy to use, and ready to help you move — your way.
        </p>
      </div>
    </div>
  );
}

export default About;
