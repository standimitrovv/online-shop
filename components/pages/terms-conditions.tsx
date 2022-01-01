import React, { useState } from 'react';

//MUI Component
import Dialog from '@mui/material/Dialog';

//Icon
import { XIcon } from '@heroicons/react/outline';

interface Props {
  bold: boolean;
}
const TermsAndConditions: React.FC<Props> = ({ bold }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setDialogIsOpen(true)}
        className={`${bold ? 'text-gray-600 font-bold' : 'py-2'} `}
      >
        Terms & Conditions
      </button>
      <Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
        <div className='py-4 my-4 mx-8'>
          <div>
            <div className='flex mb-3'>
              <h1 className='text-xl font-playfair font-bold'>
                Online Store Conditions
              </h1>
              <XIcon
                className='icon-6 ml-auto'
                onClick={() => setDialogIsOpen(false)}
              />
            </div>
            <p className='font-mont'>
              By agreeing to these Terms of Service, you represent that you are
              at least the age of majority in your state or province of
              residence, or that you are the age of majority in your state or
              province of residence and you have given us your consent to allow
              any of your minor dependents to use this site. You may not use our
              products for any illegal or unauthorized purpose nor may you, in
              the use of the Service, violate any laws in your jurisdiction
              (including but not limited to copyright laws). You must not
              transmit any worms or viruses or any code of a destructive nature.
              A breach or violation of any of the Terms will result in an
              immediate termination of your Services
            </p>
          </div>
          <div>
            <h1 className='text-xl font-playfair font-bold my-3'>
              General Conditions
            </h1>
            <p className='font-mont'>
              We reserve the right to refuse service to anyone for any reason at
              any time. You understand that your content (not including credit
              card information), may be transferred unencrypted and involve (a)
              transmissions over various networks; and (b) changes to conform
              and adapt to technical requirements of connecting networks or
              devices. Credit card information is always encrypted during
              transfer over networks. You agree not to reproduce, duplicate,
              copy, sell, resell or exploit any portion of the Service, use of
              the Service, or access to the Service or any contact on the
              website through which the service is provided, without express
              written permission by us. The headings used in this agreement are
              included for convenience only and will not limit or otherwise
              affect these Terms
            </p>
          </div>
          <div>
            <h1 className='text-xl font-playfair font-bold my-3'>
              Products or Services
            </h1>
            <p className='font-mont'>
              Certain products or services may be available exclusively online
              through the website. These products or services may have limited
              quantities and are subject to return or exchange only according to
              our Return Policy. We have made every effort to display as
              accurately as possible the colors and images of our products that
              appear at the store. We cannot guarantee that your computer
              monitor&apos;s display of any color will be accurate. We reserve
              the right, but are not obligated, to limit the sales of our
              products or Services to any person, geographic region or
              jurisdiction. We may exercise this right on a case-by-case basis.
              We reserve the right to limit the quantities of any products or
              services that we offer. All descriptions of products or product
              pricing are subject to change at anytime without notice, at the
              sole discretion of us. We reserve the right to discontinue any
              product at any time. Any offer for any product or service made on
              this site is void where prohibited. We do not warrant that the
              quality of any products, services, information, or other material
              purchased or obtained by you will meet your expectations, or that
              any errors in the Service will be corrected.
            </p>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default TermsAndConditions;
