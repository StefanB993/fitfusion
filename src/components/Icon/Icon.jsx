function Icon({ name, size }) {
  return <img src={`/svg/${name}.svg`} alt={name} width={size} height={size} />;
}

export default Icon;
