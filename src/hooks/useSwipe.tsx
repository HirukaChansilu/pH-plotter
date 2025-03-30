import { RefObject, TouchEvent, useEffect, useState, useCallback } from "react";

export function useSwipe({
  element,
  direction,
  onLeft,
  onRight,
  onUp,
  onDown,
}: {
  element: RefObject<HTMLDivElement | null>;
  direction: "horizontal" | "vertical";
  onLeft?: () => void;
  onRight?: () => void;
  onUp?: () => void;
  onDown?: () => void;
}) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
    null
  );

  const minSwipeDistance = 30;

  const onTouchStart = useCallback((e: unknown) => {
    setTouchEnd(null);
    setTouchStart({
      x: (e as TouchEvent).targetTouches[0].clientX,
      y: (e as TouchEvent).targetTouches[0].clientY,
    });
  }, []);

  const onTouchMove = useCallback((e: unknown) => {
    setTouchEnd({
      x: (e as TouchEvent).targetTouches[0].clientX,
      y: (e as TouchEvent).targetTouches[0].clientY,
    });
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;

    if (direction === "horizontal") {
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0 && onLeft) onLeft();
        if (deltaX < 0 && onRight) onRight();
      }
    } else if (direction === "vertical") {
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0 && onUp) onUp();
        if (deltaY < 0 && onDown) onDown();
      }
    }
  }, [touchStart, touchEnd, direction, onLeft, onRight, onUp, onDown]);

  useEffect(() => {
    const el = element.current;
    if (!el) return;

    el.addEventListener("touchstart", onTouchStart as EventListener);
    el.addEventListener("touchmove", onTouchMove as EventListener);
    el.addEventListener("touchend", onTouchEnd as EventListener);

    return () => {
      el.removeEventListener("touchstart", onTouchStart as EventListener);
      el.removeEventListener("touchmove", onTouchMove as EventListener);
      el.removeEventListener("touchend", onTouchEnd as EventListener);
    };
  }, [element, onTouchStart, onTouchMove, onTouchEnd]);

  return null;
}
