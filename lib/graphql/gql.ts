/**
 * Fake graphql template literal so that graphql dev tools work
 * Simply takes in a tagged template and returns the string
 */
export const gql = (
  literals: TemplateStringsArray,
  ...placeholders: any[]
): string => {
  let str = "";
  literals.forEach((string, i) => {
    if (i < placeholders.length) {
      str += `${string}${placeholders[i]}`;
    } else {
      str += string;
    }
  });
  return str;
};
