import SpinnerLoading from '@/components/ui/spinner';

const Loading = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f8f9fa',
      }}
    >
      <SpinnerLoading />
    </div>
  );
};

export default Loading;
