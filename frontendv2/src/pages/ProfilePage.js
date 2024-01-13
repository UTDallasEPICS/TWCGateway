import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function ProfileModal() {
  const { user } = useAuth0()
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <>
      <button onClick={openModal}>Open Profile</button>

      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Dialog.Title
              as="h3"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              {user.name}'s Profile
            </Dialog.Title>

            <div className="mt-2">
              <p className="text-sm text-gray-500">Email: {user.email}</p>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="text-blue-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ProfileModal
