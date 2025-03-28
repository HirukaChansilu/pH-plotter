import { RefObject, TouchEvent, useEffect, useState } from "react";

export function useSwipe({
  element,
  onLeft,
  onRight,
}: {
  element: RefObject<HTMLDivElement | null>;
  onLeft: () => void;
  onRight: () => void;
}) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const el = element.current;
    if (!el) return;

    const minSwipeDistance = 30;

    const onTouchStart = (e: unknown) => {
      setTouchEnd(null);
      setTouchStart((e as TouchEvent).targetTouches[0].clientX);
    };

    const onTouchMove = (e: unknown) =>
      setTouchEnd((e as TouchEvent).targetTouches[0].clientX);

    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        onLeft();
      } else if (isRightSwipe) {
        onRight();
      }
    };

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchmove", onTouchMove);
    el.addEventListener("touchend", onTouchEnd);
  }, [element, onLeft, onRight, touchEnd, touchStart]);
}
