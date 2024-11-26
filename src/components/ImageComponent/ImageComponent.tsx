import { useEffect, useRef, useState } from "react";
import styles from "./ImageComponent.module.scss";
import Loader from "../../UI/Loader/Loader";

interface ImageComponentProps {
    src:string;
    alt:string;
    maxWidth?:string;
    maxHeight?:string;
    wrapWidth?:string;
    wrapHeight?:string;
}


const ImageComponent = ({ src, alt, maxWidth, maxHeight,wrapWidth,wrapHeight }: ImageComponentProps) => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [loaded, setLoaded] = useState(false);
  
  
    useEffect(() => {
      setLoaded(false);
    }, [src]);


  
    return (
      <div style={{width:wrapWidth,height:wrapHeight}} className={styles.wrap}>
        {!loaded && src && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
        <img
          style={{ maxWidth, maxHeight, opacity: loaded ? "1" : "0" }} 
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