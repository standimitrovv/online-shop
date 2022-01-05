import React, { useState, useRef, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import PaypalButton from '../ui/paypal-btn';
import CountryDropDown from '../ui/countryDropDown';
import { Input } from '../ui/input';
import ItemCheckout from '../ui/item/item-checkout';
import EmptyCart from './empty-cart';
import Button from '../ui/button';
import TermsAndConditions from './terms-conditions';
import RefundPolicy from './refund-policy';
import PrivacyPolicy from './privacy-policy';

//Redux
import type { RootState } from '../../store/store';

//MUI Component
import Divider from '@mui/material/Divider';

//Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

interface DataTypes {
  contact: string;
  country: string;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  apartment?: string;
  postalCode: number;
  city: string;
  phone: number;
}

const Checkouts = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const [orderProgress, setOrderProgress] = useState({
    information: true,
    shipping: false,
    payment: false,
  });

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const [userData, setUserData] = useState<DataTypes>({
    contact: '',
    country: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    apartment: '',
    postalCode: 0,
    city: '',
    phone: 0,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const apartmentRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const subTotal = items
    .map((item) => [item.price, item.quantity])
    .reduce((a, e) => a + e.reduce((a, e) => a * e, 1), 0);
  const total = subTotal < 200 ? subTotal + 12 : subTotal;
  const deliveryFee = subTotal < 200 ? '12€' : 'Free';

  const submitFormHandler = (e: React.ChangeEvent | React.FormEvent) => {
    e.preventDefault();
    const enteredEmail = emailRef!.current!.value;
    const enteredCountry = countryRef!.current!.value;
    const enteredFirstName = firstNameRef!.current!.value;
    const enteredLastName = lastNameRef!.current!.value;
    const enteredCompany = companyRef!.current!.value;
    const enteredAddress = addressRef!.current!.value;
    const enteredApartment = apartmentRef!.current!.value;
    const enteredPostalCode = postalCodeRef!.current!.value;
    const enteredCity = cityRef!.current!.value;
    const enteredPhone = phoneRef!.current!.value;

    setUserData((prevState) => ({
      ...prevState,
      contact: enteredEmail,
      country: enteredCountry,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      company: enteredCompany,
      address: enteredAddress,
      apartment: enteredApartment,
      postalCode: +enteredPostalCode,
      city: enteredCity,
      phone: +enteredPhone,
    }));

    if (
      enteredEmail &&
      enteredEmail.includes('@') &&
      enteredCountry &&
      enteredFirstName &&
      enteredFirstName.length > 2 &&
      enteredLastName &&
      enteredLastName.length > 2 &&
      enteredAddress &&
      enteredAddress.length > 5 &&
      enteredPostalCode &&
      enteredPostalCode.length > 3 &&
      enteredCity &&
      enteredCity.length > 2 &&
      enteredPhone &&
      enteredPhone.length > 6
    ) {
      setUserData((prevState) => ({
        ...prevState,
        contact: enteredEmail,
        country: enteredCountry,
        firstName: enteredFirstName,
        lastName: enteredLastName,
        company: enteredCompany,
        address: enteredAddress,
        apartment: enteredApartment,
        postalCode: +enteredPostalCode,
        city: enteredCity,
        phone: +enteredPhone,
      }));

      goToShippingMethod();
      setFormIsValid(true);
    }
  };

  const goToInformation = () => {
    setOrderProgress((prevState) => ({
      ...prevState,
      information: true,
      shipping: false,
    }));
    setFormIsValid(false);
  };

  const goToShippingMethod = () => {
    setOrderProgress({
      payment: false,
      information: false,
      shipping: true,
    });
  };

  const goToPayment = () => {
    setOrderProgress({ information: false, shipping: false, payment: true });
  };
  const navigateAway = () => {
    router.replace('/');
  };

  return (
    <Fragment>
      {items.length === 0 && <EmptyCart identifier='cart' />}
      {items.length >= 1 && (
        <div className='font-mont font-bold grid grid-cols-1 lg:grid-cols-5 '>
          {/*Left side */}

          <div
            className={`bg-gray-50 px-12 lg:px-16 2xl:pl-44 2xl:pr-24 py-20 lg:col-span-3 ${
              orderProgress.payment && 'lg:col-span-5 h-screen'
            } `}
          >
            <div className='flex items-center justify-center md:justify-start text-xs'>
              <p
                className={`mr-2 md:mr-6 ${
                  !orderProgress.information
                    ? 'text-gray-400 cursor-text'
                    : 'cursor-pointer'
                }  font-bold`}
              >
                INFORMATION
              </p>
              <ChevronRightIcon className='w-3 h-3 text-gray-400' />
              <p
                className={`mr-2 ml-2 md:mr-6 md:ml-6 ${
                  !orderProgress.shipping
                    ? 'text-gray-400 cursor-text'
                    : 'cursor-pointer'
                } font-bold`}
              >
                SHIPPING
              </p>
              <ChevronRightIcon className='w-3 h-3 text-gray-400 ' />
              <p
                className={`ml-2 md:ml-6 ${
                  !orderProgress.payment
                    ? 'text-gray-400 cursor-text'
                    : 'cursor-pointer'
                } font-bold`}
              >
                PAYMENT
              </p>
            </div>
            {orderProgress.information && (
              <div>
                <div className='mt-12 text-lg'>
                  <Divider>Express checkout</Divider>
                  <div className='flex justify-center md:border-l md:border-r border-b pt-2 pb-4 mb-10'>
                    <PaypalButton />
                    <button className='flex items-center bg-black text-white py-2 px-6 md:px-16 rounded-md'>
                      <p>Google</p>
                      <p>Pay</p>
                    </button>
                  </div>
                </div>
                <div className='flex flex-col text-xs lg:text-lg'>
                  <Divider>Or continue below to pay with a credit card</Divider>
                </div>
                <div className='mt-12'>
                  <form onSubmit={submitFormHandler}>
                    <div className='mb-12'>
                      <p className='mb-4'>Contact Information</p>
                      <Input
                        type='email'
                        placeholder='Email'
                        value={userData.contact || ''}
                        ref={emailRef}
                        refValue={userData.contact}
                        refLength={2}
                      />
                    </div>

                    <p>Shipping address</p>
                    <CountryDropDown ref={countryRef} />
                    <div className='flex space-x-4 mt-4'>
                      <Input
                        type='text'
                        placeholder='First name'
                        value={userData.firstName || ''}
                        ref={firstNameRef}
                        refValue={userData.firstName}
                        refLength={2}
                      />
                      <Input
                        type='text'
                        placeholder='Last name'
                        value={userData.lastName || ''}
                        ref={lastNameRef}
                        refValue={userData.lastName}
                        refLength={2}
                      />
                    </div>
                    <Input
                      type='text'
                      placeholder='Company (optional)'
                      req={false}
                      value={userData.company || ''}
                      ref={companyRef}
                      refValue={userData.company}
                      refLength={5}
                    />
                    <Input
                      type='text'
                      placeholder='Address'
                      ref={addressRef}
                      value={userData.address || ''}
                      refValue={userData.address}
                      refLength={5}
                    />
                    <Input
                      type='text'
                      placeholder='Apartment,suite,etc (optional)'
                      req={false}
                      ref={apartmentRef}
                      value={userData.apartment || ''}
                      refValue={userData.apartment}
                      refLength={3}
                    />
                    <div className='flex space-x-4'>
                      <Input
                        type='number'
                        placeholder='Postal code'
                        ref={postalCodeRef}
                        value={userData.postalCode || ''}
                        refValue={userData.postalCode}
                        refLength={3}
                      />
                      <Input
                        type='text'
                        placeholder='City'
                        ref={cityRef}
                        value={userData.city || ''}
                        refValue={userData.city}
                        refLength={2}
                      />
                    </div>
                    <Input
                      type='number'
                      placeholder='Phone'
                      ref={phoneRef}
                      value={userData.phone || ''}
                      refValue={userData.phone}
                      refLength={6}
                    />
                    <button
                      className='bg-black text-white py-4 px-6 mt-6'
                      type='submit'
                    >
                      Continue to shipping
                    </button>
                  </form>
                </div>
              </div>
            )}
            {orderProgress.shipping && formIsValid && (
              <div className='h-[630px]'>
                <div className='mt-12 font-normal border'>
                  <div className='border-b grid grid-cols-5 py-3 px-4'>
                    <p className='text-gray-400 col-span-1'>Contact</p>
                    <p className='ml-2 md:ml-0 col-span-3'>
                      {userData.contact}
                    </p>
                    <button
                      className='text-xs ml-auto font-bold col-span-1'
                      onClick={goToInformation}
                    >
                      CHANGE
                    </button>
                  </div>
                  <div className='grid grid-cols-5 py-3 px-4'>
                    <p className='text-gray-400 col-span-1'>Ship to</p>
                    <p className='ml-2 md:ml-0 col-span-3 break-all'>
                      {userData.company && userData.company + ','}
                      {userData.address},
                      {userData.apartment && userData.apartment + ','}
                      {userData.postalCode},{userData.city},{userData.country}
                    </p>
                    <button
                      className='text-xs ml-auto font-bold col-span-1'
                      onClick={goToInformation}
                    >
                      CHANGE
                    </button>
                  </div>
                </div>
                <div className='mt-12'>
                  <h1 className='text-lg mb-6'>Shipping method</h1>
                  <div className='border flex py-3 px-4 items-center'>
                    <input type='radio' defaultChecked className='mr-3' />
                    <p>Tracked Delivery with DHL</p>
                    <p className='ml-auto'>{deliveryFee}</p>
                  </div>
                </div>
                <div className='flex mt-12 justify-between'>
                  <div className='flex items-center md:space-x-2 text-gray-400'>
                    <ChevronLeftIcon className='w-4 h-4' />
                    <button onClick={goToInformation}>
                      Return to information
                    </button>
                  </div>
                  <button
                    className='bg-black text-white py-5 px-4 md:px-8 text-sm font-bold'
                    onClick={goToPayment}
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </div>
              </div>
            )}
            {orderProgress.payment && (
              <div className='h-[630px] mt-20 font-medium'>
                <h1 className='text-3xl mb-8 font-bold'>Thank you!</h1>
                <p className='mb-2'>
                  Thank you for making it this far into the application, I
                  appreciate that.
                </p>
                <p>
                  You can contact me in social media and give me your opinion
                  about it.
                </p>
                <div className='space-x-4 mt-1'>
                  <a
                    href='https://www.facebook.com/stanimir.dimitrov.5494/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <FacebookIcon fontSize='large' />
                  </a>
                  <a
                    href='https://www.instagram.com/st.dimitrovv/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <InstagramIcon fontSize='large' />
                  </a>
                  <a
                    href='https://github.com/standimitrovv'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <GitHubIcon fontSize='large' />
                  </a>
                </div>
                <div className='mt-6'>
                  <p>Or you can continue to play around with it.</p>

                  <Button bg='black' ari={false} onNavigateAway={navigateAway}>
                    Return to the home page
                  </Button>
                </div>
              </div>
            )}

            {!orderProgress.payment && (
              <div className='flex space-x-6 mt-20'>
                <RefundPolicy />
                <PrivacyPolicy bold={true} />
                <TermsAndConditions bold={true} />
              </div>
            )}
          </div>
          {!orderProgress.payment && (
            <div className='px-12 lg:px-16 2xl:pl-44 2xl:pr-32 py-20 col-span-2'>
              <h1 className='font-logo text-5xl text-center mb-6'>Stanley</h1>
              <ul className='w-full'>
                {items.map((item) => (
                  <ItemCheckout
                    key={item.id}
                    img={item.src[0]}
                    description={item.description}
                    name={item.name}
                    size={item.size}
                    price={item.price}
                    quantity={item.quantity}
                  />
                ))}
              </ul>
              <div className='mt-8 border-t border-b py-8 text-sm '>
                <div className='mb-6 flex justify-between'>
                  <p>Subtotal</p>
                  <p>{subTotal}€</p>
                </div>
                <div className='flex justify-between'>
                  <p>Shipping</p>
                  <p className='font-light'>{deliveryFee}</p>
                </div>
              </div>
              <div className='py-8 text-xl border-b flex justify-between'>
                <p>TOTAL</p>
                <p>{total}€</p>
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Checkouts;
