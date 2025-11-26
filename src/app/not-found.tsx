import { Button, Container } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container
      className='d-flex flex-column justify-content-center align-items-center'
      style={{ height: '100vh', textAlign: 'center' }}
    >
      <h1 className='display-3 fw-bold'>404</h1>
      <p className='lead mb-4'>{"Oops! The page you are looking for doesn't exist."}</p>

      <Button href='/' variant='primary' size='lg'>
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
