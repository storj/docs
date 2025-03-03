import { handleImageAsset, ImageWrap } from '../lib/image-tool'

export default async function LocalImage({
  sizes,
  src: relativeSrc,
  root: root,
  dir: dir,
  fm: frontmatter,
  noLink,
  ...rest
}) {
  let { src, width, height } = await handleImageAsset(root, dir, relativeSrc)
  return <ImageWrap src={src} width={width} height={height} noLink={noLink} />
}
