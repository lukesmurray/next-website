import { styled } from "twin.macro";

type CenterProps = {
  andText?: boolean;
  gutters?: string;
  intrinsic?: boolean;
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
      ? `
    align-items: center;
    display: flex;
    flex-direction: column;`
      : ""}
  ${({ gutters }) =>
    gutters
      ? `
    padding-left: ${gutters};
    padding-right: ${gutters};`
      : ""}
  ${(props) => (props.andText ? `text-align: center;` : "")}
`;

Center.defaultProps = {
  andText: false,
  gutters: "0",
  intrinsic: false,
  max: "var(--measure)",
};
