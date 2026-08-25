import { alpha, keyframes, styled } from '@mui/material/styles';

const overlayFade = keyframes`
  0% { opacity: 0; }
  16% { opacity: 1; }
  68% { opacity: 0.82; }
  100% { opacity: 0; }
`;

const reducedFade = keyframes`
  0% { opacity: 0; }
  45% { opacity: 0.12; }
  100% { opacity: 0; }
`;

const bloom = keyframes`
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.45); filter: blur(3rem); }
  30% { opacity: 0.38; }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(1.65); filter: blur(5rem); }
`;

export const RippleOverlay = styled('div', {
  shouldForwardProp: (prop) => prop !== '$reducedMotion',
})<{ $reducedMotion: boolean }>(({ theme, $reducedMotion }) => ({
  position: 'fixed',
  inset: 0,
  zIndex: theme.zIndex.modal + 100,
  overflow: 'hidden',
  pointerEvents: 'none',
  backgroundColor: alpha(theme.palette.background.default, 0.04),
  animation: `${$reducedMotion ? reducedFade : overlayFade} ${$reducedMotion ? 200 : 1450}ms ease-out both`,
}));

export const RippleBloom = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '70vmax',
  aspectRatio: '1',
  borderRadius: '50%',
  background: `radial-gradient(circle, ${alpha(theme.palette.info.light, 0.28)} 0%, ${alpha(theme.palette.primary.main, 0.16)} 34%, ${alpha(theme.palette.secondary.main, 0.1)} 58%, transparent 76%)`,
  animation: `${bloom} 1450ms cubic-bezier(0.16, 1, 0.3, 1) both`,
}));

export const RippleBloomSecondary = styled(RippleBloom)(({ theme }) => ({
  left: '28%',
  top: '42%',
  width: '48vmax',
  background: `radial-gradient(circle, ${alpha(theme.palette.secondary.light, 0.18)} 0%, ${alpha(theme.palette.primary.light, 0.1)} 48%, transparent 74%)`,
  animationDelay: '80ms',
}));

export const RippleBloomAccent = styled(RippleBloom)(({ theme }) => ({
  left: '72%',
  top: '58%',
  width: '44vmax',
  background: `radial-gradient(circle, ${alpha(theme.palette.error.light, 0.12)} 0%, ${alpha(theme.palette.info.main, 0.1)} 46%, transparent 72%)`,
  animationDelay: '140ms',
}));

