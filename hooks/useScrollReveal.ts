// hooks/useScrollReveal.ts
import { useEffect, RefObject } from "react";

export function useScrollReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options?: IntersectionObserverInit
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}
