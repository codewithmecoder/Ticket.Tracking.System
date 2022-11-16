import { ChangeEventHandler, MouseEventHandler, useState } from 'react';

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  errorMessage?: string;
  required?: boolean;
  value?: string;
  readonly?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLTextAreaElement>;
}

const TextAreaForm = ({
  label,
  placeholder,
  name,
  onChange,
  errorMessage,
  required,
  value,
  readonly,
  className,
  onClick,
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
      <textarea
        className={`${className} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-slate-300 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-900 focus:bg-white focus:outline-none`}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        name={name}
        onChange={onChange}
        required={required}
        onBlur={handleFocus}
        focused={focused.toString()}
        readOnly={readonly}
        onClick={onClick}
      />
      <span id="span-error" className="hidden mt-1 text-red-600">
        {errorMessage}
      </span>
    </div>
  );
};

export default TextAreaForm;
