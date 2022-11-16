import Link from 'next/link';
import { BsBackspace } from 'react-icons/bs';
interface Props {
  href: string;
  text?: string;
}
const BackButton = ({ href, text = 'Back' }: Props) => {
  return (
    <div className="w-20">
      <Link href={href}>
        <div className="bg-blue-500 py-1 px-2 rounded-md w-20 flex items-center justify-center gap-2">
          <p className="text-white">{text}</p>
          <BsBackspace className="text-white" />
        </div>
      </Link>
    </div>
  );
};

export default BackButton;
