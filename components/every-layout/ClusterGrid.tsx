import { spacing } from "styles/spacing";
import { styled } from "twin.macro";

type ClusterGridProps = {
  /**
   * The margin between each of the clustered elements.
   * Accepts same values as gap (row and column gap)
   */
  space?: string;

  /**
   * The repeat value.
   * Auto-fill means the browser will fill available space with equal sized
   * columns.
   * Auto-fit means the browser will expand columns to fill available space.
   */
  repeat?: "auto-fill" | "auto-fit";

  /**
   * The min value passed to minmax
   */
  min?: string;

  /**
   * The max value passed to minmax
   */
  max?: string;
};

/**
 * Create a wrapped flexbox with space size gap between all items.
 * Requires a child container component. Spacing is applied inside that child.
 */
export const ClusterGrid = styled.div<ClusterGridProps>`
  & > * {
    display: grid;
    grid-gap: ${(props) => props.space};
    /* prettier-ignore */
    grid-template-columns: repeat(${(props) => props.repeat}, minmax(${(
      props
    ) => props.min}, ${(props) => props.max}));
  }
`;

ClusterGrid.defaultProps = {
  space: spacing[4],
  repeat: "auto-fill",
  // this really only allows for 2 items next two eachother unless
  // 0 spacing is passed, divide 100 by n + 1 to get a percentage for
  // spacing n elements
  min: "33%",
  max: "1fr",
};
