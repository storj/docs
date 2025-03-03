import sharp from 'sharp'
import glob from 'fast-glob'
import * as path from 'path'
import fs from 'fs'

export function ImageWrap({ src, alt, width, height, noLink }) {
  let imgStyle = 'xs:max-w-full sm:max-w-sm'
  let newWidth = width
  let newHeight = height
  if (width > height) {
    imgStyle = 'max-w-full h-auto'
  }
  if (height > 384) {
    newHeight = 384
    newWidth = (width * newHeight) / height
  }
  let img = (
    <img
      className={`object-fit ${imgStyle}`}
      width={newWidth}
      height={newHeight}
      src={src}
      alt={alt}
    />
  )
  if (noLink) {
    return img
  }

  return (
    <a target="_blank" rel="noreferrer" href={src}>
      {img}
    </a>
  )
}

export async function handleImageAsset(root, dir, src) {
  if(root && dir) {
    let inputPath = path.join(dir, src);
    let relativeImagePath = path.relative(root, inputPath);
    let publicPath = path.resolve('./public')
    let outputPath = path.join(publicPath, 'images', relativeImagePath);

    if(!fs.existsSync(outputPath)) {
      fs.mkdirSync(path.dirname(outputPath), {recursive: true});
      fs.copyFileSync(inputPath, outputPath);
    }

    const { width, height } = await sharp(outputPath).metadata()

    return {src: `/images/${relativeImagePath}`, width, height}
  }

  let filename = path.basename(src)
  // TODO this is pretty fragile and ignores the fact that there could be multiple files with the same name
  let files = glob.sync(`app/\\\(blog\\\)/blog/**/${filename}`, {
    cwd: '.',
  })
  let publicPath = path.resolve('./public')
  let outputDir = path.join(publicPath, 'images')
  let imagePath = files[0]
  fs.mkdirSync(outputDir, { recursive: true })

  let imagePublicPath = path.join(outputDir, path.basename(files[0]))
  const { width, height } = await sharp(imagePath).metadata()

  if (!fs.existsSync(imagePublicPath)) {
    fs.copyFileSync(imagePath, path.join(outputDir, path.basename(files[0])))
  }
  return { src: `/images/${filename}`, width, height }
}
