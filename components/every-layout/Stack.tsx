import { spacing } from "styles/spacing";
import { css, styled } from "twin.macro";

type StackProps = {
  recursive?: boolean;
  splitAfter?: number;
  space?: string;
};

const Stack = styled.div<StackProps>`
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

export default Stack;
