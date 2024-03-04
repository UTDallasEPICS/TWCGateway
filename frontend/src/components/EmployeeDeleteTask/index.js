import * as React from 'react';
import Button from '../Button';
import DeleteIcon from '../../icons/DeleteIcon';

const EmployeeDeleteTask = (taskIds) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Button color="red" extraStyling="py-3 px-4 mb-1">
      <DeleteIcon />
    </Button>
  );
}

export default EmployeeDeleteTask;