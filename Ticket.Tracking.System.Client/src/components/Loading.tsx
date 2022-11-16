interface Props {
  size: 'small' | 'medium' | 'large';
}

const Loading = ({ size }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div className="grid gap-2">
        {size === 'small' && (
          <div className="flex items-center justify-center ">
            <div className="w-16 h-16 border-b-2 border-white rounded-full animate-spin"></div>
          </div>
        )}
        {size === 'medium' && (
          <div className="flex items-center justify-center ">
            <div className="w-24 h-24 border-l-2 border-white rounded-full animate-spin"></div>
          </div>
        )}
        {size === 'large' && (
          <div className="flex items-center justify-center ">
            <div className="w-40 h-40 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loading;
