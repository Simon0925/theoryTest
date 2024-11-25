import { useEffect, useRef, useState } from "react";
import styles from "./ImageComponent.module.scss";
import Loader from "../../UI/Loader/Loader";

interface ImageComponentProps {
    src:string;
    alt:string;
    maxWidth?:string;
    maxHeight?:string;
}


const ImageComponent = ({ src, alt, maxWidth, maxHeight }: ImageComponentProps) => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      setLoaded(false);
    }, [src]);
  
    return (
      <div className={styles.wrap}>
        {!loaded && src && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
        <img
          style={{ maxWidth, maxHeight, visibility: loaded ? "visible" : "hidden" }} 
          ref={imageRef}
          className={styles.img}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)} 
        />
      </div>
    );
  };
  
  export default ImageComponent;