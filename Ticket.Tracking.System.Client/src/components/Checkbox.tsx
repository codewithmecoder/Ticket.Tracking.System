import { ChangeEventHandler } from 'react';

interface Props {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name: string;
  label: string;
  checked?: boolean;
  id?: string;
  disabled?: boolean;
  labelColor?: string;
}
const Checkbox = ({
  label,
  onChange,
  name,
  id,
  disabled,
  checked = false,
  labelColor,
}: Props) => {
  return (
    <div className="flex items-center">
      <input
        id={`${id ?? 'checked-checkbox'}`}
        type="checkbox"
        className="text-white w-4 h-4 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={onChange}
        name={name}
        checked={checked}
        disabled={disabled}
      />
      <label
        htmlFor={`${id ?? 'checked-checkbox'}`}
        className={`${
          labelColor ?? 'text-wite dark:text-gray-300'
        } ml-2 text-sm font-medium`}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
