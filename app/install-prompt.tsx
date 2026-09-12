'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

function isInstalled() {
  const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
  return window.matchMedia('(display-mode: standalone)').matches || navigatorWithStandalone.standalone === true;
}

export function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (isInstalled() || sessionStorage.getItem('pwa-install-prompt-dismissed') === '1') return;

    const isiOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isiOS) {
      window.setTimeout(() => {
        setShowIosHelp(true);
        setDismissed(false);
      }, 0);
    }

    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      setDismissed(false);
    };
    const handleInstalled = () => {
      setInstallEvent(null);
      setShowIosHelp(false);
      setDismissed(true);
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  function dismiss() {
    sessionStorage.setItem('pwa-install-prompt-dismissed', '1');
    setDismissed(true);
  }

  async function install() {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === 'accepted') dismiss();
    setInstallEvent(null);
  }

  if (dismissed || (!installEvent && !showIosHelp)) return null;

  return (
    <aside className="install-prompt" aria-label="安裝旅遊 App">
      {/* A plain image keeps the relative URL compatible with the GitHub Pages base path. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="./icon-192.png" alt="" width="48" height="48" />
      <div className="install-prompt-copy">
        <strong>加入桌面，旅途中更方便</strong>
        <span>
          {showIosHelp
            ? '點 Safari 的分享按鈕，再選「加入主畫面」'
            : '將沖繩行程安裝成 App，之後可從桌面快速開啟'}
        </span>
      </div>
      <div className="install-prompt-actions">
        {installEvent && <button className="install-button" type="button" onClick={install}>加入桌面</button>}
        <button className="dismiss-button" type="button" onClick={dismiss}>{showIosHelp ? '知道了' : '稍後'}</button>
      </div>
    </aside>
  );
}
