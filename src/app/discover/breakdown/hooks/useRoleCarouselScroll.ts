"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Dir = "left" | "right";

const EDGE_GAP_PX = 20;
const MIN_SCROLL_PX = 260;
const SCROLL_FRACTION = 0.7;

export function useRoleCarouselScroll(selectedId: string) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft < maxScrollLeft - 2);
  }, []);

  const scrollByCards = useCallback((dir: Dir) => {
    const el = scrollerRef.current;
    if (!el) return;

    const amount = Math.max(MIN_SCROLL_PX, Math.floor(el.clientWidth * SCROLL_FRACTION));
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  const scrollSelectedIntoView = useCallback((id: string) => {
    const el = scrollerRef.current;
    if (!el) return;

    const target = el.querySelector<HTMLButtonElement>(`button[data-role-id="${id}"]`);
    if (!target) return;

    const left = target.offsetLeft;
    const right = left + target.offsetWidth;
    const viewLeft = el.scrollLeft;
    const viewRight = viewLeft + el.clientWidth;

    if (left < viewLeft + EDGE_GAP_PX) {
      el.scrollTo({ left: Math.max(0, left - EDGE_GAP_PX), behavior: "smooth" });
      return;
    }

    if (right > viewRight - EDGE_GAP_PX) {
      el.scrollTo({ left: right - el.clientWidth + EDGE_GAP_PX, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    updateScrollButtons();

    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => updateScrollButtons();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateScrollButtons());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [updateScrollButtons]);

  useEffect(() => {
    if (selectedId) scrollSelectedIntoView(selectedId);
  }, [selectedId, scrollSelectedIntoView]);

  return useMemo(
    () => ({
      scrollerRef,
      canLeft,
      canRight,
      scrollLeft: () => scrollByCards("left"),
      scrollRight: () => scrollByCards("right"),
    }),
    [canLeft, canRight, scrollByCards]
  );
}
