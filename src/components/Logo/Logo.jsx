function Logo({ size = 10 }) {
  const style = {
    width: `${size}rem`,
  };
  return <img style={style} src="/logo.png" alt="" />;
}

export default Logo;
