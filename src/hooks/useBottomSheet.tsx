import React, { useRef, useEffect } from "react";

export function useBottomSheet() {
  const sheetRef = useRef<HTMLDivElement | null>(null);

  const metrics = useRef<any>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none",
    },
  });

  const handleTouchStart = (e: TouchEvent) => {
    if (!sheetRef.current) return;

    const { touchStart } = metrics.current;
    // 바텀시트 높이 기억
    touchStart.sheetY = sheetRef.current.getBoundingClientRect().y;
    // 터치한 위치 기억
    touchStart.touchY = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();

    if (!sheetRef.current) return;

    const { touchStart, touchMove } = metrics.current;
    const currentTouch = e.touches[0];

    if (touchMove.prevTouchY === 0) {
      touchMove.prevTouchY = touchStart.touchY;
    }

    if (touchMove.prevTouchY < currentTouch.clientY) {
      touchMove.movingDirection = "down";
    }

    if (touchMove.prevTouchY > currentTouch.clientY) {
      touchMove.movingDirection = "up";
    }

    // 터치 시작점에서부터 현재 터치 포인트까지의 변화된 y값
    const touchOffset = currentTouch.clientY - touchStart.touchY;
    let nextSheetY = touchStart.sheetY + touchOffset;

    // nextSheetY 는 MIN_Y와 MAX_Y 사이의 값으로 clamp 되어야 한다
    if (nextSheetY <= 60) {
      nextSheetY = 60;
    }

    if (nextSheetY >= window.innerHeight - 140) {
      nextSheetY = window.innerHeight - 140;
    }

    // sheet 위치 갱신.
    sheetRef.current.style.setProperty(
      "transform",
      `translateY(${nextSheetY - (window.innerHeight - 80)}px)`
    );
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!sheetRef.current) return;

    const { touchMove } = metrics.current;

    // Snap Animation
    const currentSheetY = sheetRef.current.getBoundingClientRect().y;

    if (currentSheetY !== 60) {
      if (touchMove.movingDirection === "down") {
        sheetRef.current.style.setProperty("transform", "translateY(0)");
      }
      if (touchMove.movingDirection === "up") {
        sheetRef.current.style.setProperty(
          "transform",
          `translateY(${60 - window.innerHeight + 140}px)`
        );
      }
    }

    // metrics 초기화.
    metrics.current = {
      touchStart: {
        sheetY: 0,
        touchY: 0,
      },
      touchMove: {
        prevTouchY: 0,
        movingDirection: "none",
      },
    };
  };

  // Touch Event 핸들러들을 등록한다.
  useEffect(() => {
    if (!sheetRef.current) return;

    sheetRef.current.addEventListener("touchstart", handleTouchStart);
    sheetRef.current.addEventListener("touchmove", handleTouchMove);
    sheetRef.current.addEventListener("touchend", handleTouchEnd);

    return () => {
      if (!sheetRef.current) return;

      sheetRef.current.removeEventListener("touchstart", handleTouchStart);
      sheetRef.current.removeEventListener("touchmove", handleTouchMove);
      sheetRef.current.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return { sheetRef };
}
