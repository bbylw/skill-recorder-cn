import { useEffect, useState } from 'react';
import { CheckIcon, CopySimpleIcon, WarningCircleIcon } from '@phosphor-icons/react';

type CopyState = 'idle' | 'done' | 'selected' | 'fail';

export function CopyButton({ text, label, target }: { text: string; label: string; target?: string }) {
  const [state, setState] = useState<CopyState>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const timeout = window.setTimeout(() => setState('idle'), 2600);
    return () => window.clearTimeout(timeout);
  }, [state]);

  const selectText = () => {
    if (!target) return false;
    const element = document.getElementById(target);
    if (!element) return false;
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    return true;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState('done');
    } catch {
      setState(selectText() ? 'selected' : 'fail');
    }
  };

  const message = state === 'done'
    ? '内容已复制到剪贴板'
    : state === 'selected'
      ? '复制受限，内容已选中，请按 Ctrl+C'
      : state === 'fail'
        ? '复制失败，请手动选择内容'
        : '';
  const visibleLabel = state === 'done' ? '已复制' : state === 'selected' ? '已选中' : state === 'fail' ? '复制失败' : label;

  return (
    <span className="copy-control">
      <button type="button" className="copy" onClick={copy} data-state={state} title={state === 'selected' ? '按 Ctrl+C 复制' : undefined}>
        {state === 'done' || state === 'selected'
          ? <CheckIcon size={15} weight="bold" aria-hidden="true" />
          : state === 'fail'
            ? <WarningCircleIcon size={15} aria-hidden="true" />
            : <CopySimpleIcon size={15} aria-hidden="true" />}
        <span>{visibleLabel}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">{message}</span>
    </span>
  );
}
