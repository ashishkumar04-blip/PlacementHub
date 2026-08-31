import { useEffect } from 'react';

export function useKeyboardShortcut(
  keyCombo: string,
  callback: (e: KeyboardEvent) => void,
  targetElement: HTMLElement | Window = window
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Support 'k' with Cmd or Ctrl
      if (keyCombo.toLowerCase() === 'cmd+k' || keyCombo.toLowerCase() === 'ctrl+k') {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          callback(e);
        }
      } else if (e.key.toLowerCase() === keyCombo.toLowerCase()) {
        callback(e);
      }
    };

    targetElement.addEventListener('keydown', handleKeyDown as EventListener);
    return () => {
      targetElement.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [keyCombo, callback, targetElement]);
}
