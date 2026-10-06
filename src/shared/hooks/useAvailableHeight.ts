import { useEffect, useState, type RefObject } from "react";

/**
 * Mesure la hauteur de viewport réellement disponible sous un élément,
 * peu importe ce que le layout parent place au-dessus (topbar, bannière...).
 */
export function useAvailableHeight(ref: RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const top = el.getBoundingClientRect().top;
      setHeight(window.innerHeight - top);
    };

    update();
    window.addEventListener("resize", update);

    // Capte aussi un changement de hauteur du header lui-même (ex: bannière qui apparaît)
    const observer = new ResizeObserver(update);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [ref]);

  return height;
}