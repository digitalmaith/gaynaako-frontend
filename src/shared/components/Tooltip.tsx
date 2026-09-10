import { useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  label: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

export function Tooltip({ label, children, disabled }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (disabled || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setCoords({ top: rect.top + rect.height / 2, left: rect.right + 10 });
    setVisible(true);
  };

  return (
    <div
      ref={anchorRef}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible &&
        !disabled &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transform: "translateY(-50%)",
            }}
            className="z-50 flex items-center gap-1.5 whitespace-nowrap rounded-md bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-white dark:text-primary-dark"
          >
            {label}
          </div>,
          document.body
        )}
    </div>
  );
}