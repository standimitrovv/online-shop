import React, { useRef, useState } from 'react';
import Image from 'next/image';
import imgSrc from '../../public/images/appointment/privtailor.jpg';

//MUI Components
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Appointment: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const placeInputRef = useRef<HTMLSelectElement>(null);

  const [formIsValid, setFormIsValid] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function submitFormHandler(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const enteredEmail = emailInputRef.current!.value;
    const enteredName = nameInputRef.current!.value;
    const enteredPhone = phoneInputRef.current!.value;
    const enteredMessage = messageInputRef.current!.value;
    const enteredPlace = placeInputRef.current!.value;

    if (
      !enteredEmail ||
      !enteredEmail.includes('@') ||
      !enteredMessage ||
      enteredMessage.trim().length === 0 ||
      !enteredName ||
      enteredName.trim().length === 0 ||
      !enteredPhone ||
      enteredPhone.length < 10 ||
      !enteredPlace
    ) {
      setFormIsValid(false);
      return;
    }
    setFormIsValid(true);

    emailInputRef.current!.value = '';
    nameInputRef.current!.value = '';
    phoneInputRef.current!.value = '';
    messageInputRef.current!.value = '';
    placeInputRef.current!.value = '';
  }
  return (
    <div className='bg-bgPrimary grid grid-cols-1 lg:grid-cols-2 justify-center lg:gap-x-0 xl:gap-x-12 2xl:gap-x-32 gap-y-20 '>
      <div className='px-16 md:px-32 lg:px-16 2xl:pl-36  w-full h-full'>
        <h1 className='text-center text-2xl font-medium py-12'>
          Book Your Appointment
        </h1>
        <form className='flex flex-col' onSubmit={submitFormHandler}>
          <div className='flex flex-col mb-8 '>
            <label htmlFor='name' className='mb-2'>
              Name*
            </label>
            <input
              id='name'
              className='py-2 px-4 rounded-sm'
              required
              ref={nameInputRef}
            />
          </div>
          <div className='flex flex-col mb-8 '>
            <label htmlFor='phone-number' className='mb-2'>
              Phone Number*
            </label>
            <input
              id='phone-number'
              className='py-2 px-4 rounded-sm'
              required
              type='number'
              ref={phoneInputRef}
            />
          </div>
          <div className='flex flex-col mb-8 '>
            <label htmlFor='email' className='mb-2'>
              Email*
            </label>
            <input
              id='email'
              className='py-2 px-4 rounded-sm'
              required
              ref={emailInputRef}
            />
          </div>
          <div className='flex flex-col mb-8 '>
            <label htmlFor='select' className='mb-2'>
              Pick a Place*
            </label>
            <select
              name='places'
              id='select'
              className='py-2 px-4 rounded-sm'
              required
              ref={placeInputRef}
            >
              <option>Please Select</option>
              <option>Sofia - Bulgaria</option>
            </select>
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
          <Image
            src={imgSrc}
            alt='Picture of our private tailor lounge'
            layout='fill'
          />
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

export default Appointment;
