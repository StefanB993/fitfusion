function Logo({ size = 10 }) {
  const style = {
    width: `${size}rem`,
  };
  return (
    <img
      style={style}
      src="https://fdrjcrrrxwntvbtcheks.supabase.co/storage/v1/object/sign/logo/logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YjA5NzczNi1mYmUyLTQ3MDctYWJiMS1hZTFlNWM4ZmNhODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvL2xvZ28ucG5nIiwiaWF0IjoxNzUwMDcwNzQyLCJleHAiOjE5MDc3NTA3NDJ9.V2uF0onAqpcqdXz-Taexfos573mSqDHhZMLexW_jm1s"
      alt=""
    />
  );
}

export default Logo;
