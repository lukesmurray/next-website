// eventually could expand to remote images
// TODO(lukemurray): https://github.com/image-size/image-size/issues/258#issuecomment-792493746
import { Element } from "hast";
import { classnames } from "hast-util-classnames";
import { Processor, Transformer } from "unified";
import { Parent } from "unist";
import visit from "unist-util-visit";
import { isLocalUrl } from "../../utils/isLocalUrl";

/**
 * An `<a>` HAST node
 */
interface AnchorNode extends Element {
  tagName: "a";
  properties: {
    href: string;
  };
}

interface AnchorMetadataOptions {}

export function anchorMetadata(
  this: Processor,
  settings: AnchorMetadataOptions
): Transformer {
  return async (tree) => {
    visit<AnchorNode>(tree, isLocalAnchorNode, (node, index, parent) => {
      addMetadata(node);
      return visit.CONTINUE;
    });
  };
}

const isLocalAnchorNode = (
  node: any,
  index?: number,
  parent?: Parent
): node is AnchorNode => {
  if (
    node.type === "element" &&
    node.tagName === "a" &&
    node.properties &&
    typeof node.properties.href === "string" &&
    isLocalUrl(node.properties.href)
  ) {
    return true;
  }
  return false;
};

/**
 * add img height and width to it's properties
 */
const addMetadata = async (node: AnchorNode) => {
  classnames(node, "internal");
};

// http://localhost:3000/blog/database-first-development
// http://localhost:3000/test/blog/database-first-development
