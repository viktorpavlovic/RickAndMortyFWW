import React, { useState } from "react";
import Search from "antd/es/input/Search";
import "./search-input.scss";
interface SearchInputProps {
  placeholder: string;
  onSearch: (name: string) => void;
}
const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div className="div-search-input">
      <Search
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        onPressEnter={handleSearch}
      />
    </div>
  );
};

export default SearchInput;
