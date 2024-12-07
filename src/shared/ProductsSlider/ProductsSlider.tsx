import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import styles from "./ProductsSliders.module.scss";

interface ProductsSliderProps {
  children: ReactNode
  title: string;
}

const smallSlide = 212;
const midSlide = 237;
const largeSlide = 272;
const gap = 16;

const ProductsSlider: FunctionComponent<ProductsSliderProps> = ({ children, title }) => {
  const [index, setIndex] = useState(0);
  const [slideLength, setSlideLength] = useState(0);

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setSlideLength(smallSlide + gap);
    } else if (window.innerWidth <= 1200) {
      setSlideLength(midSlide + gap);
    } else if (window.innerWidth > 1200) {
      setSlideLength(largeSlide + gap);
    }
  }, [window.innerWidth]);

  const slideLeft = (): void => {
    setIndex((index) => index + 1);
  };

  const slideRight = (): void => {
    setIndex((index) => index - 1);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slider_header}>
        <h2 className={styles.slider_title}>{title}</h2>
        <div className={styles.slider_buttons}>
          <button
            className={styles.left_btn}
            onClick={slideLeft}
            disabled={index === 0}
          ></button>
          <button className={styles.right_btn} onClick={slideRight}></button>
        </div>
      </div>
      <div className={styles.window}>
        <div
          className={styles.main_container}
          style={{
            transform: `translateX(${index * slideLength}px)`,
            transition: "transform 0.5s ease",
          }}
        >
          { children }
        </div>
      </div>
    </div>
  );
};

export default ProductsSlider;
