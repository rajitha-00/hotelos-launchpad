import { useEffect, useRef, useState } from 'react';
import './InstallApp.css';
interface InstallPrompt extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
export const InstallApp = () => {
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);
  const help = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(display-mode: standalone)');
    const update = () => setInstalled(media.matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    const available = (event: Event) => { event.preventDefault(); setPrompt(event as InstallPrompt); };
    const done = () => { setInstalled(true); setPrompt(null); };
    update();
    media.addEventListener('change', update);
    window.addEventListener('beforeinstallprompt', available);
    window.addEventListener('appinstalled', done);
    return () => { media.removeEventListener('change', update); window.removeEventListener('beforeinstallprompt', available); window.removeEventListener('appinstalled', done); };
  }, []);
  const install = async () => {
    if (!prompt) { help.current?.showModal(); return; }
    try { await prompt.prompt(); await prompt.userChoice; }
    catch { help.current?.showModal(); }
    finally { setPrompt(null); }
  };
  if (installed) return null;
  return <div className="nami-install">
    <button type="button" className="nami-install-button" onClick={() => void install()}>Install app</button>
    <dialog ref={help} aria-labelledby="install-heading">
      <h2 id="install-heading">Add to your home screen</h2>
      <p>On iPhone or iPad, open this app in Safari, tap Share, then Add to Home Screen.</p>
      <p>On Android, open the browser menu and choose Install app or Add to Home screen.</p>
      <button type="button" onClick={() => help.current?.close()}>Done</button>
    </dialog>
  </div>;
};

