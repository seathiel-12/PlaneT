import { type FC, type ImgHTMLAttributes } from 'react'

type ImageProps = ImgHTMLAttributes<HTMLImageElement>

const Image:FC<ImageProps> = ({...props}) => {
  return (
    <img 
    {...props}
    onError={(e) => {
        const img = e.currentTarget;
        img.onerror = null;                    // coupe la boucle
        if (!img.src.endsWith("/Images/no_images.jpg")) {
        img.src = "/assets/Images/no_images.jpg";   // évite de réassigner si déjà le fallback
        }
    }}
    />
  )
}

export default Image