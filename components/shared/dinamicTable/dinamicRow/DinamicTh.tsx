export function DinamicTh({ column }: { column: string }) {
  return (
    <th
      className={`font-medium py-4 text-left text-green-950 ${
        column === ""
          ? "px-0 bg-neutral-100 lg:sticky lg:right-0 whitespace-nowrap"
          : "px-3 text-nowrap"
      }`}
    >
      {column}
    </th>
  );
}
