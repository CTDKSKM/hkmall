import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const SearchBox = (props: Props) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleSearchButton = () => {
    const paramsString = `q=${searchValue}`;
    const searchParams = new URLSearchParams(paramsString);

    navigate(`/search?${searchParams}`);
  };

  return (
    <form
      action="submit"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="productInputContainer text-black bg-white flex"
    >
      <label htmlFor="search"></label>
      <input type="text" name="search" className="productInput" value={searchValue} onChange={handleSearchInput} />
      <button onClick={handleSearchButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
          <circle cx="14.6663" cy="14.6668" r="9.33333" stroke="#4F4F4F" strokeWidth="2" />
          <path d="M26.667 26.6665L22.667 22.6665" stroke="#4F4F4F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBox;
