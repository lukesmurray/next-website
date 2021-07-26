import { spacing } from "styles/spacing";
import tw, { css } from "twin.macro";

export function Admonition({
  type,
  icon = undefined,
  title = undefined,
  children,
}: {
  type: AdmonitionType;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <aside
      css={[
        tw`border-2 border-solid p-4 md:p-6`,
        css`
          border-color: var(--text-secondary-light);
        `,
      ]}
    >
      <div
        css={[
          tw`bg-primary`,
          css`
            width: fit-content;
            margin-top: -${spacing["8"]};
            margin-left: calc(-1 * (${spacing["4"]} + 2px));

            /* equivalent of md: */
            @media (min-width: 768px) {
              margin-top: -${spacing["10"]};
              margin-left: calc(-1 * (${spacing["6"]} + 2px));
            }
          `,
        ]}
      >
        <span>{icon ?? <AdmonitionIcon type={type} />}</span>
        {title !== "" && (
          <span css={tw`px-3 text-caption`}>
            {title ?? <AdmonitionTitle type={type} />}
          </span>
        )}
      </div>
      {children}
    </aside>
  );
}

type AdmonitionType = "note" | "tip" | "info" | "caution" | "danger";

function AdmonitionIcon({ type }: { type: AdmonitionType }) {
  const typeToIcon: Record<AdmonitionType, string> = {
    note: "📝",
    tip: "💡",
    info: "ℹ️",
    caution: "⚠️",
    danger: "🔥",
  };

  return <>{typeToIcon[type]}</>;
}

function AdmonitionTitle({ type }: { type: AdmonitionType }) {
  return <>{capitalizeFirstCharacter(type)}</>;
}

function capitalizeFirstCharacter(type: string) {
  return type[0].toLocaleUpperCase() + type.slice(1);
}
