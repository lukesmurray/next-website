import { SlugPageQuery } from "../../prisma/graphql";
import { renderMdxDataToString } from "./renderMdxDataToString";

/**
 * Function to add mdx data to a graphql result
 * @returns
 */
export async function addMdxToData(data: SlugPageQuery) {
  // create a copy of the data object
  data = JSON.parse(JSON.stringify(data));

  // create the mdx
  const mdx = await renderMdxDataToString(
    data.currentPage!.content,
    data.currentPage!.slug
  );

  // add the mdx to the current page
  data.currentPage = Object.assign(data.currentPage, {
    mdx: mdx,
  });

  // type helper for modifying a type by overriding keys
  type Modify<T, R> = Omit<T, keyof R> & R;

  // create the modified result type
  // modifies data.currentPage by adding mdx
  type ModifiedDataType = Modify<
    typeof data,
    {
      currentPage: Modify<
        typeof data.currentPage,
        {
          mdx: typeof mdx;
        }
      >;
    }
  >;

  return Object.freeze(data) as ModifiedDataType;
}
