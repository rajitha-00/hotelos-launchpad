// Register only production builds; development keeps normal Vite reload behavior.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
      .catch(error => console.warn('Offline support could not start:', error));
  });
}
export {};

