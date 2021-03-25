import { spacing } from "styles/spacing";
import { css, styled } from "twin.macro";

type CenterProps = {
  /**
   * Whether to apply text-align center
   */
  andText?: boolean;
  /**
   * The size of gutters to add on the left and right (i.e. 1rem)
   */
  gutters?: string;
  /**
   * Whether to use flexbox to center elements inside of the container, not
   * just the container itself
   */
  intrinsic?: boolean;
  /**
   * The maximum width of the container
   */
  max?: string;
};

export const Center = styled.div<CenterProps>`
  box-sizing: content-box;
  display: block;
  margin-left: auto;
  margin-right: auto;

  max-width: ${(props) => props.max};

  ${(props) =>
    props.intrinsic
      ? css`
          align-items: center;
          flex-direction: column;
          display: flex;
        `
      : ""}

  ${(props) =>
    props.gutters !== undefined
      ? css`
          padding-left: ${props.gutters};
          padding-right: ${props.gutters};
        `
      : ""}

  ${(props) => (props.andText ? `text-align: center;` : "")}
`;

Center.defaultProps = {
  andText: false,
  gutters: "0",
  intrinsic: false,
  max: spacing.prose,
};
