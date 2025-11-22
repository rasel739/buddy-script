'use client';
import { useEffect } from 'react';
import '@/lib/custom';

const BootstrapScript = () => {
  useEffect(() => {
    // @ts-expect-error - no type declarations for the bootstrap dist bundle
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return <></>;
};

export default BootstrapScript;
