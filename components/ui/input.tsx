import React from 'react';

interface Props {
  type: string;
  placeholder: string;
  req?: boolean;
  value?: string | number;
  refValue?: string | number;
  refLength?: number;
}

//eslint-disable-next-line react/display-name
export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ type, placeholder, req = true, value, refValue, refLength }, ref) => {
    const formattedRefValue =
      typeof refValue === 'number'
        ? refValue.toString().replace('0', '')
        : refValue;
    return (
      <div className='flex flex-col w-full mb-5 lg:mb-3'>
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          className='px-4 py-3 rounded-sm w-full'
          required={req}
          ref={ref}
        />
        {refLength &&
          formattedRefValue &&
          formattedRefValue.length >= 1 &&
          formattedRefValue.length <= refLength && (
            <p className='text-sm text-red-500 mb-2 mt-1'>
              This field should be more than {refLength} characters long
            </p>
          )}
      </div>
    );
  }
);
