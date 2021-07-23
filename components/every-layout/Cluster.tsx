import { CSSProperties } from "react";
import { spacing } from "styles/spacing";
import { styled } from "twin.macro";

type ClusterProps = {
  /**
   * The justify content value
   */
  justify?: CSSProperties["justifyContent"];

  /**
   * The align items value
   */
  align?: CSSProperties["alignItems"];

  /**
   * The margin between each of the clustered elements
   */
  space?: string;
};

/**
 * Create a wrapped flexbox with space size gap between all items.
 * Requires a child container component. Spacing is applied inside that child.
 */
export const Cluster = styled.div<ClusterProps>`
  /* ↓ Suppress horizontal scrolling caused by
  the negative margin in some circumstances */
  /* overflow: hidden; */

  & > * {
    display: flex;
    flex-wrap: wrap;
    justify-content: ${(props) => props.justify};
    align-items: ${(props) => props.align};
    margin: calc(${(props) => props.space} / 2 * -1);
  }

  & > * > * {
    margin: calc(${(props) => props.space} / 2);
  }
`;

Cluster.defaultProps = {
  justify: "flex-start",
  align: "center",
  space: spacing[4],
};
