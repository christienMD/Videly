import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const SearchBox = ({ onChange, value }: Props) => {
  return (
    <InputGroup>
      <InputLeftElement children={<BsSearch />} />
      <Input
        onChange={(event) => onChange(event.currentTarget.value)}
        borderRadius={20}
        placeholder="Search ..."
        variant="filled"
        name="query"
        value={value}
        marginBottom={3}
      />
    </InputGroup>
  );
};

export default SearchBox;
