import { Spinner } from 'react-bootstrap';

const SpinnerLoading = () => {
  return (
    <Spinner animation='border' role='status' style={{ width: '4rem', height: '4rem' }}>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  );
};

export default SpinnerLoading;
