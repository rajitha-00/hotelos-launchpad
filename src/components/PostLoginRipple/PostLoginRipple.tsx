import { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  RippleBloom,
  RippleBloomAccent,
  RippleBloomSecondary,
  RippleOverlay,
} from './PostLoginRipple.styles';

export interface PostLoginRippleProps {
  active: boolean;
  onComplete: () => void;
}

export const PostLoginRipple = ({ active, onComplete }: PostLoginRippleProps) => {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const duration = reduceMotion ? 200 : 1450;

  useEffect(() => {
    if (!active) return undefined;
    const timeout = window.setTimeout(onComplete, duration);
    return () => window.clearTimeout(timeout);
  }, [active, duration, onComplete]);

  if (!active) return null;

  return (
    <RippleOverlay $reducedMotion={reduceMotion} aria-hidden="true">
      {!reduceMotion ? (
        <>
          <RippleBloom />
          <RippleBloomSecondary />
          <RippleBloomAccent />
        </>
      ) : null}
    </RippleOverlay>
  );
};

