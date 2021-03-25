import { spacing } from "styles/spacing";
import { css, styled } from "twin.macro";

type StackProps = {
  /**
   * Whether to apply the spacing recursively to all children
   */
  recursive?: boolean;

  /**
   * The element after which to split the stack.
   * Elements below this are pushed to the bottom
   */
  splitAfter?: number;

  /**
   * The space between successive elements
   */
  space?: string;
};

export const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & ${(props) => (props.recursive ? "" : ">")} * {
    margin-top: 0;
    margin-bottom: 0;
  }

  & ${(props) => (props.recursive ? "" : ">")} * + * {
    margin-top: ${(props) => props.space};
  }

  ${(props) =>
    props.splitAfter !== undefined
      ? css`
          &:only-child {
            height: 100%;
          }

          & > :nth-child(${props.splitAfter}) {
            margin-bottom: auto;
          }
        `
      : ""}
`;

Stack.defaultProps = {
  recursive: false,
  space: spacing[8],
};
