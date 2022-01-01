import React, { useState } from 'react';

//MUI Component
import Dialog from '@mui/material/Dialog';

//Icon
import { XIcon } from '@heroicons/react/outline';

interface Props {
  bold: boolean;
}

const PrivacyPolicy: React.FC<Props> = ({ bold }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setDialogIsOpen(true)}
        className={`${bold ? 'text-gray-600 font-bold' : 'py-2'}`}
      >
        Privacy Policy
      </button>
      <Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
        <div className='py-4 my-4 mx-8'>
          <div>
            <div className='flex mb-3'>
              <h1 className='text-xl font-playfair font-bold'>
                Data Ownership
              </h1>
              <XIcon
                className='icon-6 ml-auto'
                onClick={() => setDialogIsOpen(false)}
              />
            </div>
            <p className='font-mont'>
              Stanley OOD - with registered office in Jeko Georgiev, n. 3,
              Sofia, Bulgaria - is the Data Controller for the personal data
              collected on its site. The Data Processor for Stanley is the
              current Marketing Manager. Personal data of customers outside
              Europe is treated according to the General Data Protection
              Regulation in force in the EU.
            </p>
          </div>
          <div>
            <h1 className='text-xl font-playfair font-bold my-3 '>
              Data we Collect
            </h1>
            <p className='font-mont border-b w-60'>
              We collect the following data:
            </p>
            <ul className='list-disc ml-8 mt-2'>
              <li className='mb-2'>
                Personal Data collected directly from customers through the
                purchase process: name, phone number, postal address, email
                address. Our legal basis for the collection and processing of
                this data is the accurate and safe delivery of the products
                purchased by the customer.
              </li>
              <li className='mb-2'>
                Personal Data collected automatically from the use of our
                website. The data transmitted from the viewer&apos;s browser
                includes IP address, the date and time of the visit, the pages
                accessed, the access status/HTTP status code, browser type,
                operating system used and interface, as well as the language and
                version of the browser software. The legal basis for collecting
                and processing this personal data is to be able to provide the
                viewers with a better user experience and more personalised and
                relevant content.
              </li>
            </ul>
          </div>
          <div>
            <h1 className='text-xl font-playfair font-bold my-3 '>
              How we use your data
            </h1>
            <p className='font-mont border-b w-56'>
              We use your Personal Data:
            </p>
            <ul className='list-disc ml-8 mt-2'>
              <li className='mb-2'>
                For the administration of your purchases, fraud checks, and to
                contact you about your order (for example with details on your
                order and returns).
              </li>
              <li className='mb-2'>
                To contact you with marketing messages which you have requested
                or agreed to receive from us (for example via our branded
                newsletter).
              </li>
              <li className='mb-2'>
                To contact you with surveys and feedback requests (for example
                relating to a product you purchased).
              </li>
              <li className='mb-2'>
                To show you more relevant and personalised content and
                advertising.
              </li>
              <li className='mb-2'>
                To analyse your purchase history and the way you use the site to
                improve our products and the user experience on our website.
              </li>
            </ul>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PrivacyPolicy;
