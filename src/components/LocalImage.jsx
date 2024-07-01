import { handleImageAsset, ImageWrap } from '../lib/image-tool'

export default async function LocalImage({
  sizes,
  src: relativeSrc,
  noLink,
  ...rest
}) {
  let { src, width, height } = await handleImageAsset(relativeSrc)
  return <ImageWrap src={src} width={width} height={height} noLink={noLink} />
}
