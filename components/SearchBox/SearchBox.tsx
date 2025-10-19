import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (query: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className={css.input}
      value={value}
      onChange={handleChange}
      type="text"
      placeholder="Search notes"
    />
  );
}
