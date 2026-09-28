export default function TaskFilter({ filter, setFilter }) {

  const filters = [
    {
      label: "All",
      value: "ALL",
    },
    {
      label: "To Do",
      value: "TODO",
    },
    {
      label: "In Progress",
      value: "IN PROGRESS",
    },
    {
      label: "Completed",
      value: "COMPLETED",
    },
    {
      label: "Blocked",
      value: "BLOCKED",
    },
  ];

  return (
    <div className="task-filters">

      {filters.map((item) => (

        <button
          key={item.value}
          className={`task-filter ${
            filter === item.value ? "active" : ""
          }`}
          onClick={() => setFilter(item.value)}
        >
          {item.label}
        </button>

      ))}

    </div>
  );
}