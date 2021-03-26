import React, { CSSProperties } from "react";
import { SpringConfig, useSpring } from "react-spring";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface useBoopOptions {
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  timing?: number;
  springConfig?: SpringConfig;
  boopOnMount?: boolean;
}

export const useBoop = (options: useBoopOptions = {}) => {
  const {
    x = 0,
    y = 0,
    rotation = 0,
    scale = 1,
    timing = 150,
    springConfig = {
      tension: 300,
      friction: 10,
    },
    boopOnMount = false,
  } = options;
  const [isBooped, setIsBooped] = React.useState(boopOnMount);
  const style = useSpring({
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: springConfig,
  });
  React.useEffect(() => {
    if (!isBooped) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped]);
  const trigger = React.useCallback(() => {
    setIsBooped(true);
  }, []);
  let appliedStyle = usePrefersReducedMotion() ? ({} as CSSProperties) : style;
  return [appliedStyle, trigger] as const;
};
