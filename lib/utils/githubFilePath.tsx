import { githubRepoSlug } from "../constants/githubRepoSlug";
import { rootDirectory } from "../constants/rootDirectory";

export function githubFilePath(filePath: string): string {
  return `${githubRepoSlug}/${rootDirectory}/${filePath}`;
}
