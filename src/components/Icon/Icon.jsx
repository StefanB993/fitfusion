import { IMG_URL } from "../../config";

function Icon({ name, size }) {
  return (
    <img src={`${IMG_URL}${name}.svg`} alt={name} width={size} height={size} />
  );
}

export default Icon;
