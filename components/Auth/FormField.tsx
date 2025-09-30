import React from 'react';

type FormFieldProps = {
  name: string,
  type: 'email' | 'password',
  value: string,
  onChangeValue: (value: string) => void,
  placeholder?: string
};

const FormField:React.FC<FormFieldProps> = ({ name, type, value, onChangeValue, placeholder }) => {
  return (
    <>
      <label htmlFor={name} className="sr-only">Email address</label>
      <input value={value} onChange={(e) => onChangeValue(e.target.value)} 
        name={name} type={type} autoComplete={type} required
        className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 
        outline-none placeholder:text-gray-400 
        text-md font-medium text-black
        hover:ring-0 hover:ring-gray-500 hover:ring-offset-1"
        placeholder={placeholder} />
    </>
  )
}
export default FormField;