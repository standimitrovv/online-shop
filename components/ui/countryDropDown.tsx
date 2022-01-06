import React from 'react';

// eslint-disable-next-line react/display-name
const CountryDropDown = React.forwardRef<HTMLSelectElement>((props, ref) => {
  return (
    <select
      id='country'
      name='country'
      className='px-4 py-4 rounded-sm w-full mt-4'
      ref={ref}
    >
      <option value='United Kingdom'>United Kingdom</option>
      <option value='Albania'>Albania</option>
      <option value='Andorra'>Andorra</option>
      <option value='Austria'>Austria</option>
      <option value='Belarus'>Belarus</option>
      <option value='Belgium'>Belgium</option>
      <option value='Bosnia and Herzegovina'>Bosnia and Herzegovina</option>
      <option value='Bulgaria'>Bulgaria</option>
      <option value='Croatia'>Croatia (Hrvatska)</option>
      <option value='Cyprus'>Cyprus</option>
      <option value='Czech Republic'>Czech Republic</option>
      <option value='France'>France</option>
      <option value='Gibraltar'>Gibraltar</option>
      <option value='Germany'>Germany</option>
      <option value='Greece'>Greece</option>
      <option value='Hungary'>Hungary</option>
      <option value='Italy'>Italy</option>
      <option value='Luxembourg'>Luxembourg</option>
      <option value='Macedonia'>Macedonia</option>
      <option value='Malta'>Malta</option>
      <option value='Moldova'>Moldova</option>
      <option value='Monaco'>Monaco</option>
      <option value='Montenegro'>Montenegro</option>
      <option value='Netherlands'>Netherlands</option>
      <option value='Poland'>Poland</option>
      <option value='Portugal'>Portugal</option>
      <option value='Romania'>Romania</option>
      <option value='Serbia'>Serbia</option>
      <option value='Slovakia'>Slovakia</option>
      <option value='Slovenia'>Slovenia</option>
      <option value='Spain'>Spain</option>
      <option value='Ukraine'>Ukraine</option>
      <option value='Denmark'>Denmark</option>
      <option value='Estonia'>Estonia</option>
      <option value='Finland'>Finland</option>
      <option value='Greenland'>Greenland</option>
      <option value='Iceland'>Iceland</option>
      <option value='Ireland'>Ireland</option>
      <option value='Latvia'>Latvia</option>
      <option value='Lithuania'>Lithuania</option>
      <option value='Norway'>Norway</option>
      <option value='Sweden'>Sweden</option>
      <option value='Switzerland'>Switzerland</option>
      <option value='Turkey'>Turkey</option>
    </select>
  );
});

export default CountryDropDown;
