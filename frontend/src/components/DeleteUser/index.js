import * as React from 'react';
import Button from '../Button';
import DeleteIcon from '../../icons/DeleteIcon';
import Section from '../Section';
import axios from 'axios';
import Cookies from 'js-cookie';

const DeleteUser = ({ users }) => {
  // console.log('users', users);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDeleteUser = () => {
    if (users.length === 0) {
      console.log('No users selected');
      return;
    }
    setIsOpen(true);
    console.log('user', users);
  };

  const handleYes = () => {
    axios
      .post(`http://localhost:5010/checkEmail`, {email: Cookies.get("email")})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    users.map(id => {
      axios
        .delete(`http://localhost:5010/user/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem(localStorage.key(1))).id_token}`,
          },
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  return (
    <div>
      <Button color="red" extraStyling="py-3 px-4 mb-1" onClick={handleDeleteUser}>
        <DeleteIcon />
      </Button>
      {isOpen && (
        <Section extraStyling="z-10 absolute">
          <div>
            <p className="text-lg font-semibold text-gray-700 mb-4">Are you sure you want to delete all selected users?</p>
            <Button color="red" extraStyling="py-2 px-4 mb-1 mr-2 bg-red-500 text-white rounded hover:bg-red-700" onClick={() => setIsOpen(false)}>
              No
            </Button>
            <Button color="green" extraStyling="py-2 px-4 mb-1 bg-green-500 text-white rounded hover:bg-green-700" onClick={() => handleYes()}>
              Yes
            </Button>
          </div>
        </Section>
      )}
    </div>
  );
};

export default DeleteUser;
