import PropTypes from 'prop-types';
import { TextInput } from '@mantine/core';

SearchBar.propTypes = {
  setSearchTerm: PropTypes.func,
  leftComp1: PropTypes.node,
  leftComp2: PropTypes.node,
  rigthComp1: PropTypes.node,
  rightComp2: PropTypes.node,
};

export default function SearchBar({
  setSearchTerm,
  leftComp1 = null,
  leftComp2 = null,
  rigthComp1 = null,
  rightComp2 = null,
}) {
  return (
    <div className="flex bg-white bg-opacity-50 border-white border-2 rounded-lg m-5 p-2">
      <div className="mr-10">{leftComp1}</div>
      <div className="mr-10">{leftComp2}</div>
      <div className="w-full">
        <TextInput
          placeholder="Search"
          size="md"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="ml-10">{rigthComp1}</div>
      <div className="ml-10">{rightComp2}</div>
    </div>
  );
}
