import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useEffect } from 'react';
import ProfileIcon from '../../icons/ProfileIcon';
import { useAuth0 } from '@auth0/auth0-react';
import Cookies from 'js-cookie';
import CrossIcon from '../../icons/CrossIcon';
import axios from 'axios';

const ProfileModal = ({ isExpanded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const { user, logout } = useAuth0();

  useEffect(() => {
    axios
      .post(`http://localhost:5010/checkEmail/`, { email: user.email })
      .then(res => {
        setName(res.data.name);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {isExpanded ? (
        <div
          className={`flex items-center px-1 ${
            isExpanded
              ? 'button w-25 h-8 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400'
              : 'hidden'
          }`}
          onClick={() => {
            console.log('Button clicked');
            setIsOpen(true);
          }}
        >
          <ProfileIcon className="h-6 w-6" />
          <span className="ml-3 inline-block whitespace-nowrap">Profile</span>
        </div>
      ) : (
        <div
          className={`flex items-center px-1 ${
            isExpanded
              ? 'hidden'
              : 'button w-8 h-8 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400'
          }`}
          onClick={() => {
            console.log('Button clicked');
            setIsOpen(true);
          }}
        >
          <ProfileIcon className="h-6 w-6" />
        </div>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" open={isOpen} onClose={setIsOpen}>
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl profile-gradient-background">
                <button type="button" className="absolute top-3 right-3 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => setIsOpen(false)}>
                  <CrossIcon className="h-6 w-6" />
                </button>
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 text-center">
                  Profile
                </Dialog.Title>

                <div className="mt-4 flex justify-center">{user && <img className="h-20 w-20 rounded-full" src={user.picture} alt={name} />}</div>

                <div className="mt-4 ml-20">
                  <div className="">
                    <span className="font-bold">Name</span>
                    <span className="ml-1 font-bold">-</span>
                    <span className="ml-2">{name}</span>
                  </div>
                  <div className="">
                    <span className="font-bold">Email</span>
                    <span className="ml-2 font-bold">-</span>
                    <span className="ml-2">{user.email}</span>
                  </div>
                  <div className="">
                    <span className="font-bold">Role</span>
                    <span className="ml-4 font-bold">-</span>
                    <span className="ml-2">{Cookies.get('role')}</span>
                  </div>
                </div>

                <div className="flex flex-row mt-4">
                  <button
                    type="button"
                    className="flex button my-10 text-white justify-center items-center w-20 h-10 bg-red-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#b91c1c,0_0px_0_0_#b91c1c41] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#b91c1c,0_15px_0_0_#b91c1c41] border-b-[1px] border-red-400 mx-auto"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileModal;
