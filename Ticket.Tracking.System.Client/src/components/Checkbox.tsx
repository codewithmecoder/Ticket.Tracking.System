import { ChangeEventHandler } from 'react';

interface Props {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name: string;
  label: string;
  checked?: boolean;
}
const Checkbox = ({ label, onChange, name, checked = false }: Props) => {
  return (
    <div className="flex items-center">
      <input
        id="checked-checkbox"
        type="checkbox"
        className="w-4 h-4 text-white bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={onChange}
        name={name}
        checked={checked}
      />
      <label
        htmlFor="checked-checkbox"
        className="ml-2 text-sm font-medium text-white dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
