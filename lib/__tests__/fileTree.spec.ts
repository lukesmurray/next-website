import path from "path";
import { createFileTree } from "../fileTree";

describe("file tree works", () => {
  it("can parse a fake root", async () => {
    const rootDirectory = path.join(__dirname, "fakeRoot");
    const { root: tree } = await createFileTree(rootDirectory);
    expect(tree.isHome).toBe(true);
    expect(tree.isSection).toBe(true);
    expect(tree.regularPages.length).toBe(2);
    expect(tree.sections.length).toBe(1);
    expect(tree.pages.length).toBe(3);
  });
});
