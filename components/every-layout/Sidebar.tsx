import { spacing } from "styles/spacing";
import { css, styled } from "twin.macro";

type SidebarProps = {
  /**
   * The width of the sidebar, empty means not set, defaults to content width
   */
  sideWidth?: string;

  /**
   * The narrowest the content element can be before wrapping.
   * Should be a percentage
   */
  contentMinimumWidth: string;

  /**
   * The margin between the sidebar and the non sidebar
   */
  space?: string;

  /**
   * Whether the sidebar is on the right or not
   */
  sideBarOnRight?: boolean;
};

/**
 * Create a responsive sidebar component.
 * If the sidebar is on the left it rotates to the top.
 * If the sidebar is on the rigth it rotates to the bottom.
 * The sidebar requires a nested container component
 */
export const Sidebar = styled.div<SidebarProps>`
  overflow: hidden;

  & > * {
    display: flex;
    flex-wrap: wrap;
    margin: calc(${(props) => props.space} / 2 * -1);
  }

  & > * > * {
    margin: calc(${(props) => props.space} / 2);
    ${(props) =>
      props.sideWidth !== undefined
        ? css`
            flex-basis: ${props.sideWidth};
          `
        : ""}

    flex-grow: 1;
  }

  & > * > :first-child {
    flex-basis: 0;
    flex-grow: 999;
    min-width: calc(
      ${(props) => props.contentMinimumWidth} - ${(props) => props.space}
    );
  }
`;

Sidebar.defaultProps = {
  contentMinimumWidth: "50%",
  space: spacing[4],
  sideBarOnRight: false,
};
