// eventually could expand to remote images
// TODO(lukemurray): https://github.com/image-size/image-size/issues/258#issuecomment-792493746
import { Element } from "hast";
import imageSize from "image-size";
import { isValidHttpUrl } from "lib/utils/isValidHttpUrl";
import { resolveImgUrlInBuild } from "lib/utils/resolveImgUrl";
import { Processor, Settings, Transformer } from "unified";
import { Parent } from "unist";
import visit from "unist-util-visit";
import { promisify } from "util";

const sizeOf = promisify(imageSize);

/**
 * An `<img>` HAST node
 */
interface ImageNode extends Element {
  tagName: "img";
  properties: {
    src: string;
    height?: number;
    width?: number;
  };
}

interface RemarkImageMetadataOptions {
  slug: string;
}

export function imageMetadata(
  this: Processor<Settings>,
  settings: RemarkImageMetadataOptions
): Transformer {
  return async (tree) => {
    const imgNodes: ImageNode[] = [];
    visit<ImageNode>(tree, isLocalImgNode, (node, index, parent) => {
      imgNodes.push(node);
      return visit.CONTINUE;
    });

    await Promise.all(imgNodes.map((v) => addMetadata(v, settings.slug)));
  };
}

/**
 * unist-util-visit filter function which filters to local img nodes
 */
const isLocalImgNode = (
  node: any,
  index?: number,
  parent?: Parent
): node is ImageNode => {
  if (
    node.type === "element" &&
    node.tagName === "img" &&
    node.properties &&
    typeof node.properties.src === "string" &&
    // assume invalid http means local
    !isValidHttpUrl(node.properties.src)
  ) {
    return true;
  }
  return false;
};

/**
 * add img height and width to it's properties
 */
const addMetadata = async (node: ImageNode, slug: string) => {
  const imgUrl = resolveImgUrlInBuild(node.properties.src, slug);
  const res = await sizeOf(imgUrl!);
  if (!res) {
    throw Error(`Invalid image with src "${node.properties.src}"`);
  }
  node.properties.width = res.width;
  node.properties.height = res.height;
};
