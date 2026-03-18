'use client';

import {
  useRef,
  useEffect,
  useCallback,
  type ComponentPropsWithoutRef,
  type ChangeEvent,
} from 'react';
import styles from './Textarea.module.scss';

/** 0.9375rem * 1.6 — field line-height와 맞춤 */
const LINE_HEIGHT_PX = 24;
const PADDING_VERTICAL_PX = 32; // 1rem * 2

export type AutoGrowTextareaProps = Omit<ComponentPropsWithoutRef<'textarea'>, 'onChange'> & {
  label?: string;
  /** 최소 줄 수 (기본 3) */
  minLines?: number;
  /** 최대 줄 수 (기본 6), 넘으면 스크롤 */
  maxLines?: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export function Textarea({
  label,
  minLines = 3,
  maxLines = 6,
  value,
  onChange,
  className,
  ...rest
}: AutoGrowTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const minHeightPx = minLines * LINE_HEIGHT_PX + PADDING_VERTICAL_PX; // 최소 줄 수 * 라인 높이 + 세로 패딩
  const maxHeightPx = maxLines * LINE_HEIGHT_PX + PADDING_VERTICAL_PX; // 최대 줄 수 * 라인 높이 + 세로 패딩

  /** 텍스트 영역 높이 조정 */
  const adjustHeight = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.overflowY = 'hidden';
    const h = Math.min(Math.max(ta.scrollHeight, minHeightPx), maxHeightPx);
    ta.style.height = `${h}px`;
    if (h >= maxHeightPx) ta.style.overflowY = 'auto';
  }, [minHeightPx, maxHeightPx]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = `${minHeightPx}px`;
    ta.style.overflowY = 'hidden';
  }, [minHeightPx]);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const fieldClass = className ? `${styles.field} ${className}` : styles.field;

  return (
    <div>
      {label ? <label className={styles.label}>{label}</label> : null}
      <textarea
        ref={textareaRef}
        className={fieldClass}
        value={value}
        onChange={(e) => {
          onChange(e);
          requestAnimationFrame(() => adjustHeight());
        }}
        {...rest}
      />
    </div>
  );
}
