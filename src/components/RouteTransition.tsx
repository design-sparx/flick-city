import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationProgress, startNavigationProgress, completeNavigationProgress, incrementNavigationProgress } from '@mantine/nprogress';

interface RouterProps {
  children: React.ReactNode
}

const RouterTransition = ({ children }: RouterProps): JSX.Element => {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState('');
  const location = useLocation();

  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc('');
    }

    startNavigationProgress();
    setInterval(() => {
      incrementNavigationProgress(10);
    }, 1000);
  }, [location]);

  useEffect(() => {
    setTimeout(() => {
      setProgress(false);
    }, 1100);
  }, [prevLoc]);

  return (
    <>
      {progress && <NavigationProgress autoReset={true} transitionDuration={100} onFinish={() => completeNavigationProgress()}/>}
      {children}
    </>
  );
};

export default RouterTransition;
