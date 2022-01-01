import React, { useState } from 'react';

//MUI Component
import Dialog from '@mui/material/Dialog';

//Icon
import { XIcon } from '@heroicons/react/outline';

const RefundPolicy: React.FC = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setDialogIsOpen(true)}
        className='text-gray-600 font-bold'
      >
        Refund Policy
      </button>
      <Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
        <div className='py-4 my-4 mx-8'>
          <div>
            <div className='flex mb-3'>
              <h1 className='text-xl font-playfair font-bold'>RETURNS</h1>
              <XIcon
                className='icon-6 ml-auto'
                onClick={() => setDialogIsOpen(false)}
              />
            </div>
            <p className='font-mont'>
              To return or exchange your product you should email
              care@stanley.com so we can organise a pick up at your address. We
              cover shipping costs for all clients if you opt for this option.
              If you prefer to use other shipping methods you will be
              responsible for paying for your own shipping costs for returning
              the item. You should consider using a trackable shipping service
              or purchasing shipping insurance. Our policy lasts 60 days. If we
              do not receive your item we will not process the refund. Depending
              on where you live, the time it may take for your exchanged product
              to reach you, may vary. If 60 days have gone by since your
              purchase, unfortunately we can’t offer you a refund or exchange.
              To be eligible for a return, your item must be unused and in the
              same condition that you received it. It must also be in the
              original packaging.
            </p>
          </div>
          <div>
            <h1 className='text-xl font-playfair font-bold my-3'>REFUNDS</h1>
            <p className='font-mont'>
              Once your return is received and inspected, we will send you an
              email to notify you that we have received your returned item. We
              will also notify you of the approval or rejection of your refund.
              If you are approved, then your refund will be processed, and a
              credit will automatically be applied to your credit card or
              original method of payment, within 5 working days.
            </p>
          </div>
          <div>
            <h1 className='text-xl font-playfair font-bold my-3'>
              LATE OR MISSING REFUNDS
            </h1>
            <p className='font-mont'>
              If you were due a refund and you haven’t received the money yet,
              first check your bank account again. Then contact your credit card
              company, it may take some time before your refund is officially
              posted. Next contact your bank. There is often some processing
              time before a refund is posted. If you’ve done all of this and you
              still have not received your refund yet, please contact us at
              care@stanley.com.
            </p>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default RefundPolicy;
