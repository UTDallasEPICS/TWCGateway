import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";

async function validateEmail(email) {
  try {
    const res = await axios.get(`http://localhost:5010/checkEmail/${email}`);
    console.log(res.data);

    return res.data !== null;
  } catch (error) {
    console.log("error in verifying email", error);
    return false;
  }
}

function InputModal({roles, departments}) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const initialFormData = {
    name: "",
    email: "",
    departmentName: [],
    roleName: "",
  };

  const [formData, setFormData] = React.useState(initialFormData);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailExists, setEmailExists] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (emailExists || !isEmailValid) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [emailExists, isEmailValid]);

  const handleEmailBlur = async (e) => {
    const email = e.target.value;
    const isValid = email.includes("@");
    setIsEmailValid(isValid);

    if (isValid) {
      const exists = await validateEmail(email);
      setEmailExists(exists);
    }

    if (emailExists || !isEmailValid) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  } 

  return (
    <>

      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        variant="solid"
        onClick={onOpen}
      >
        Add User
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        onTransitionEnd={() => {
          setFormData(initialFormData);
          setIsEmailValid(true);
          setEmailExists(false);
        }}
      >

        <ModalOverlay />

        <ModalContent>

          <ModalHeader>
            Add User
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody pb={6}>

            {/* Name Field */}
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name:e.target.value })
                }
              />
            </FormControl>

            {/* Email Field */}
            <FormControl mt={4} isRequired isInvalid={!isEmailValid}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
                onBlur={handleEmailBlur}
              />
              {showError && (
                <FormErrorMessage>Email already exists or is invalid</FormErrorMessage>
              )}
            </FormControl>

            {/* Department Field */}
            <FormControl mt={4} isRequired>
              <FormLabel>Department</FormLabel>
              {departments.length > 0 && (
                <ReactSelect 
                  isMulti
                  value={formData.departmentName?.map(name => ({ label: name, value: name })) || []}
                  options={departments.map(department => ({ label: department.name, value: department.name }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(selectedOptions) => {
                      const selectedDepartments = selectedOptions.map(option => option.value);
                      setFormData({...formData, departmentName:selectedDepartments});
                  }}
                />
              )}
            </FormControl>

            {/* Role Field */}
            <FormControl mt={4} isRequired>
              <FormLabel>Role</FormLabel>
              {roles.length > 0 && (
                <Select 
                  value={formData.roleName} 
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setFormData({ ...formData, roleName:e.target.value })} 
                >
                  {roles.map((role) => (
                    <option 
                      key={role.id} 
                      value={role.roleName}
                    >

                      {role.roleName}

                    </option>
                  ))}
                </Select>
              )}
            </FormControl>
          </ModalBody>

          {/* Save Button */}
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={async () => {
                try {
                  const res = await axios.post("http://localhost:5010/user", formData);
                } catch (err) {
                  console.log("Error in InputModal Post", err);
                }
                onClose();
              }}
            >
              Save
            </Button>

            {/* Cancel Button */}
            <Button onClick={() => {
              setFormData(initialFormData); 
              onClose();
            }}
            >
              Cancel
            </Button>

          </ModalFooter>

        </ModalContent>

      </Modal>

    </>
  );
}

export default InputModal;