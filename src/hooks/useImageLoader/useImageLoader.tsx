import { useEffect, useRef, useState } from "react";

interface UseImageLoaderProps {
  src: string;
  alt?: string;
  maxWidth?: string;
  maxHeight?: string;
}

const useImageLoader = ({ src, alt = "Image", maxWidth = "100%", maxHeight = "100%" }: UseImageLoaderProps) => {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const imgElement = imageRef.current;
    
    if (imgElement) {
      const handleLoad = () => setLoaded(true);

      imgElement.addEventListener("load", handleLoad);
      return () => {
        imgElement.removeEventListener("load", handleLoad);
      };
    }
  }, [src]);

  const ImageElement = (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      style={{ maxWidth, maxHeight }}
    />
  );

  return { ImageElement, loaded };
};

export default useImageLoader;
