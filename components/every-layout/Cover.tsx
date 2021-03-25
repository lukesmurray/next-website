import { spacing } from "styles/spacing";
import { styled } from "twin.macro";

type CoverProps = {
  /**
   * Element that should be centeered towards the vertical center of the space.
   * Identify with a simple selector
   */
  centeredSelector: string;

  /**
   * The minimum height of the parent element before it grows to accomodate content.
   */
  minimumHeight: string;

  /**
   * The minimum space between and around the child elements
   */
  space: string;

  /**
   * Whether to remove padding from the parent element
   */
  noPadding: boolean;
};

export const Cover = styled.div<CoverProps>`
  & {
    display: flex;
    flex-direction: column;
    min-height: ${(props) => props.minimumHeight};
    padding: ${(props) => (props.noPadding ? 0 : props.space)};
  }

  & > * {
    margin-top: ${(props) => props.space};
    margin-bottom: ${(props) => props.space};
  }

  & > :first-child:not(${(props) => props.centeredSelector}) {
    margin-top: 0;
  }

  & > :last-child:not(${(props) => props.centeredSelector}) {
    margin-bottom: 0;
  }

  & > ${(props) => props.centeredSelector} {
    margin-top: auto;
    margin-bottom: auto;
  }
`;

Cover.defaultProps = {
  minimumHeight: "100vh",
  space: spacing[4],
  noPadding: false,
};
