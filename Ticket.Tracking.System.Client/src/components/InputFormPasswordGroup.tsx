import { ChangeEventHandler, Dispatch, SetStateAction, useState } from 'react';

interface Props {
  name: string;
  hideBtn?: boolean;
  label: string;
  showHidePassword: boolean;
  setShowHidePassword: Dispatch<SetStateAction<boolean>>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  errorMessage?: string;
  pattern?: string;
  required?: boolean;
}

const InputFormPasswordGroup = ({
  name,
  setShowHidePassword,
  showHidePassword,
  onChange,
  label,
  placeholder,
  hideBtn = true,
  errorMessage,
  pattern,
  required,
}: Props) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <div className="w-full">
      <label htmlFor="" className="form-label inline-block mb-2 text-white">
        {label} <span className="text-red-600">{required ? '*' : ''}</span>
      </label>
      <div className="flex">
        <input
          className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-slate-300 bg-clip-padding border border-solid border-gray-300 ${
            hideBtn ? 'rounded-md' : 'rounded-l-md'
          } m-0 focus:text-gray-900 focus:bg-white focus:outline-none`}
          placeholder={placeholder}
          type={showHidePassword ? 'password' : 'text'}
          autoComplete="off"
          name={name}
          onChange={onChange}
          pattern={pattern}
          required={required}
          onBlur={handleFocus}
          onFocus={() => name === 'confirmPassword' && setFocused(true)}
          focused={focused.toString()}
        />
        {hideBtn ? (
          <></>
        ) : (
          <p
            className="form-control block px-3 py-1.5 text-base font-normal text-gray-900 bg-slate-300 bg-clip-padding rounded-r-md hover:cursor-pointer"
            onClick={() => setShowHidePassword((preval) => !preval)}
          >
            {showHidePassword ? 'show' : 'hide'}
          </p>
        )}
      </div>
      <span id="span-error" className="text-red-600 hidden">
        {errorMessage}
      </span>
    </div>
  );
};

export default InputFormPasswordGroup;
