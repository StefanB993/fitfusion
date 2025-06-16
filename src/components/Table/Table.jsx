import { FaEllipsisVertical } from "react-icons/fa6";
import styles from "./Table.module.scss";
import { useState } from "react";

function TableHeader({ header }) {
  return (
    <thead>
      <tr>
        {header.map(({ name, key }) => (
          <th key={key}>{name}</th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
}

function TableCell({ value, className }) {
  return (
    <td className={className}>
      <span>{value}</span>
    </td>
  );
}

function TableActions({ actions, id, rendered }) {
  if (id !== rendered) return null;
  return (
    <div className={styles.table__actions}>
      {actions.map(({ label, onClick, icon: Icon, className }) => (
        <button key={label} onClick={() => onClick(id)} className={className}>
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

function TableRow({
  workout,
  header,
  options: { cellRenderer = {}, actions = [] } = {}, // Default options if none are provided
  rendered,
  setRendered,
}) {
  return (
    <tr>
      {header.map(({ key }) => (
        <TableCell
          key={key}
          value={cellRenderer[key]?.value?.(workout[key]) || workout[key]}
          className={cellRenderer[key]?.className?.(workout[key])}
        />
      ))}
      <td className="actions">
        <button
          className={styles.table__btnToggle}
          onClick={() =>
            rendered === workout.id
              ? setRendered(null)
              : setRendered(workout.id)
          }
        >
          <FaEllipsisVertical className={styles.table__toggleIcon} />
        </button>
        <TableActions id={workout.id} rendered={rendered} actions={actions} />
      </td>
    </tr>
  );
}

function Table({ data, options = {} }) {
  // Default value for options
  const [rendered, setRendered] = useState(null);

  const header = Object.keys(data[0]).map((key) => ({
    name: key,
    key,
  }));

  return (
    <table className={styles.table}>
      <TableHeader header={header} />
      <tbody>
        {data.map((workout) => (
          <TableRow
            key={workout.id}
            workout={workout}
            header={header}
            options={options}
            rendered={rendered}
            setRendered={setRendered}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
