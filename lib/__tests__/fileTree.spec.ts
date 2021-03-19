import path from "path";
import { createFileTree } from "../fileTree";

describe("file tree works", () => {
  it("can parse a fake root", async () => {
    const rootDirectory = path.join(__dirname, "fakeRoot");
    const tree = await createFileTree(rootDirectory);
    expect(tree.isHome).toBe(true);
    expect(tree.isSection).toBe(true);
    expect(tree.pages.length).toBe(2);
    expect(tree.sections.length).toBe(1);
    expect(tree.sections[0].file.path).toBe(
      path.join(rootDirectory, "blog/_index.md")
    );
  });
});
