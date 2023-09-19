interface Props {
  onChange: (value: string) => void;
  value: string;
}

const SearchBox = ({ onChange, value }: Props) => {
  return (
    <input
      type="text"
      name="query"
      value={value}
      className="form-control my-3"
      placeholder="Search..."
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
};

export default SearchBox;
