import Image from 'next/image';
const Welcome = () => {
  return (
    <>
      <Image
        src="/assets/images/welcome.webp"
        alt="Picture of the author"
        width={400}
        height={200}
        priority
        style={{ width: 'auto', height: 'auto' }}
      />
      <div className="flex w-full items-center justify-center h-20">
        <p className="font-bold text-2xl text-slate-50">To Happy Quizy</p>
      </div>
    </>
  );
};

export default Welcome;
