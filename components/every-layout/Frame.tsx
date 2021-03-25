import { styled } from "twin.macro";

type FrameProps = {
  numerator: number;
  denominator: number;
};

export const Frame = styled.div<FrameProps>`
  & {
    /* prettier-ignore */
    padding-bottom: calc(${(props) => props.numerator} / ${(props) =>
      props.denominator} * 100%);
    position: relative;
  }

  & > * {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > img,
  & > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

Frame.defaultProps = {
  numerator: 9,
  denominator: 16,
};
