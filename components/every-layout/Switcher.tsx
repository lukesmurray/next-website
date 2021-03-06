import { spacing } from "styles/spacing";
import { css, styled } from "twin.macro";

type SwitcherProps = {
  /**
   * The container width at which the component switches between a horizontal and vertical layout
   */
  threshold?: string;

  /**
   * The margin between the child elements
   */
  space?: string;

  /**
   * The maximum number of elements allow to appear in a horizontal layout
   */
  limit?: number;
};

/**
 * The switcher places a limited number of elements side by side then stacks them.
 * Requires a nested container component.
 */
export const Switcher = styled.div<SwitcherProps>`
  & > * {
    display: flex;
    flex-wrap: wrap;
    margin: calc((${(props) => props.space} / 2) * -1);
  }

  & > * > * {
    flex-grow: 1;
    flex-basis: calc(
      (${(props) => props.threshold} - (100% - ${(props) => props.space})) * 999
    );
    margin: calc(${(props) => props.space} / 2);
  }

  ${(props) =>
    props.limit !== undefined
      ? css`
          & > * > :nth-last-child(n + ${props.limit + 1}),
          & > * > :nth-last-child(n + ${props.limit + 1}) ~ * {
            flex-basis: 100%;
          }
        `
      : ""}
`;

Switcher.defaultProps = {
  threshold: spacing.prose,
  space: spacing[4],
  limit: 4,
};
