import { keyframes } from "@emotion/css";
import { css } from "twin.macro";

const slideInFwdBottomKeyFrames = keyframes`
0% {
    transform: translateZ(-1400px) translateY(400px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0) translateY(0);
    opacity: 1;
  }
`;

const scaleOutBottomKeyFrames = keyframes`
0% {
    transform: scale(1);
    transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    transform: scale(0);
    transform-origin: 50% 100%;
    opacity: 1;
  }
`;

export const tippyFootnoteAnimation = css`
  @media screen and (prefers-reduced-motion: no-preference) {
    .tippy-box[data-animation="tippyFootnoteAnimation"][data-state="hidden"] {
      animation: ${scaleOutBottomKeyFrames} 0.25s
        cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
    }

    .tippy-box[data-animation="tippyFootnoteAnimation"][data-state="visible"] {
      animation: ${slideInFwdBottomKeyFrames} 0.25s
        cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }
  }
`;
