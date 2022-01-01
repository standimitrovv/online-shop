import React, { useRef, useState } from 'react';
import Image from 'next/image';

//MUI Components
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

//Icons
import {
  PhoneIcon,
  LocationMarkerIcon,
  ChatAlt2Icon,
} from '@heroicons/react/outline';

//Image
import boutique from '../../public/images/contact/boutique.jpg';

const Contact: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null)!;
  const nameInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const [formIsValid, setFormIsValid] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function submitFormHandler(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const enteredEmail = emailInputRef.current!.value;
    const enteredName = nameInputRef.current!.value;
    const enteredMessage = messageInputRef.current!.value;

    if (
      !enteredEmail ||
      !enteredEmail.includes('@') ||
      !enteredMessage ||
      enteredMessage.trim().length === 0 ||
      !enteredName ||
      enteredName.trim().length === 0
    ) {
      setFormIsValid(false);
      return;
    }
    setFormIsValid(true);

    emailInputRef.current!.value = '';
    nameInputRef.current!.value = '';
    messageInputRef.current!.value = '';
  }

  return (
    <div className='bg-bgPrimary grid grid-cols-1 lg:grid-cols-2 justify-center lg:gap-x-0 xl:gap-x-12 2xl:gap-x-32 gap-y-20 '>
      <div className='px-16 md:px-32 lg:px-16 2xl:pl-36  w-full h-full'>
        <h1 className='text-center text-2xl font-medium py-12'>
          Get In Touch With Us
        </h1>
        <form className='flex flex-col' onSubmit={submitFormHandler}>
          <div className='flex flex-col mb-8 '>
            <label htmlFor='name' className='mb-2'>
              Name
            </label>
            <input
              id='name'
              className='py-2 px-4 rounded-sm'
              required
              ref={nameInputRef}
            />
          </div>
          <div className='flex flex-col mb-8 '>
            <label htmlFor='email' className='mb-2'>
              Email
            </label>
            <input
              id='email'
              className='py-2 px-4 rounded-sm'
              required
              ref={emailInputRef}
            />
          </div>
          <div className='flex flex-col mb-8'>
            <label htmlFor='message' className='mb-2'>
              Message
            </label>
            <textarea
              id='message'
              className='px-4 py-2 h-36 rounded-sm'
              required
              ref={messageInputRef}
            />
          </div>
          <div>
            <button
              className='bg-blue-700 py-2 px-8 mb-4 text-white hover:bg-black rounded-sm'
              onClick={() => setOpen(true)}
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <div className='flex justify-center md:justify-end items-start h-full w-full relative'>
        <div className='h-largest '>
          <Image src={boutique} alt='Picture of our boutique' layout='fill' />
        </div>

        <div className='h-lg w-96 px-8 py-6 md:h-96 md:w-80 bg-white z-20 absolute md:mr-12 mt-12 md:px-6 md:py-4'>
          <div className='flex space-x-3 '>
            <div>
              <PhoneIcon className='icon-12' />
            </div>
            <div className='mb-2 md:mb-0'>
              <h1 className='font-bold text-xl mb-3 border-b md:mb-2 border-black'>
                Stanley Phones
              </h1>
              <h2 className='text-sm font-semibold font-fb'>
                PRIVATE TAILOR SERVICE
              </h2>
              <span>+359 xxx xxx xxx</span>
              <h2 className='text-sm font-semibold font-fb mt-3'>BOUTIQUE</h2>
              <span>+359 xxx xxx xxx</span>
            </div>
          </div>
          <div className='flex mt-4 space-x-3'>
            <div>
              <LocationMarkerIcon className='icon-12' />
            </div>
            <div className='mb-2 md:mb-0'>
              <h1 className='font-bold text-lg mb-2  md:mb-1 border-b border-black'>
                BOUTIQUE
              </h1>
              <p>
                <span className='font-medium'>Sofia - </span>
                <span>Jeko Georgiev, n. 3</span>
              </p>
            </div>
          </div>
          <div className='flex mt-4 space-x-3'>
            <div>
              <ChatAlt2Icon className='icon-12' />
            </div>
            <div>
              <h1 className='font-bold text-xl  border-b border-black mb-3 md:mb-2'>
                Emails
              </h1>

              <h2 className='text-sm font-semibold font-fb'>INFO</h2>
              <span>info@stanley.com</span>

              <h2 className='text-sm font-semibold font-fb mt-3 md:mt-0'>
                APPOINTMENTS
              </h2>
              <span>appointments@stanley.com</span>
            </div>
          </div>
        </div>
      </div>
      {formIsValid && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          sx={{
            width: { sm: 500, lg: '20%' },
            ml: { sm: 0, lg: '7rem' },
          }}
        >
          <Alert
            onClose={handleClose}
            severity='success'
            variant='filled'
            sx={{
              textAlign: 'center',
            }}
          >
            Thank you for contacting us! <br />
            One of our colleagues will get back in touch with you soon!
          </Alert>
        </Snackbar>
      )}
      {!formIsValid && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          sx={{
            width: { sm: 550, lg: '20%' },
            ml: { sm: 0, lg: '7rem' },
          }}
        >
          <Alert
            onClose={handleClose}
            severity='error'
            variant='filled'
            sx={{
              textAlign: 'center',
            }}
          >
            Invalid input, please check your credentials and try again!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Contact;
