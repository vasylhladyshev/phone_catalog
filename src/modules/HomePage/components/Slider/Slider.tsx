import { FunctionComponent, TouchEvent, useEffect, useState } from "react";
import styles from "./Slider.module.scss";
import slider1 from "../../../../assets/SliderImg1.png";
import slider2 from "../../../../assets/SliderImg2.png";
import slider3 from "../../../../assets/SliderImg3.png";

interface SliderProps {}

export const Slider: FunctionComponent<SliderProps> = () => {
  const [index, setIndex] = useState(0);
  const [touchX, setTouchX] = useState(0);

  const slideLeft = (): void => {
    if (index < 0) {
      setIndex((index) => index + 1);
    } else {
      setIndex(-2);
    }
  };

  const slideRight = (): void => {
    if (index > -2) {
      setIndex((index) => index - 1);
    } else {
      setIndex(0);
    }
  };

  const changeSlide = (digit: number): void => {
    setIndex(digit);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => {
        if (prevIndex > -2) {
          return prevIndex - 1;
        } else {
          return 0;
        }
      });
    }, 5000);
  
    return () => clearTimeout(timer); 
  }, [index]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>): void => {
    setTouchX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>): void => {
    if (touchX === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const difference = touchX - touchEndX;

    const swipeThreshold = 50;

    if (difference > swipeThreshold) {
      if (index > -2) setIndex(index - 1);
    } else if (difference < -swipeThreshold) {
      if (index < 0) setIndex(index + 1);
    }
  };

  return (
    <div className={styles.slider}>
      <div className={styles.main_container}>
        <button className={styles.left_btn} onClick={slideLeft}></button>
        <div className={styles.window}>
          <div
            className={styles.all_pages_container}
            onTouchStart={(event) => handleTouchStart(event)}
            onTouchEnd={(event) => handleTouchEnd(event)}
            style={{
              transform: `translateX(${index * 100}%)`,
              transition: "transform 0.5s ease",
            }}
          >
            <img
              className={styles.slider_item}
              src={slider1}
              alt="slider-image"
            />
            <img
              className={styles.slider_item}
              src={slider2}
              alt="slider-image"
            />
            <img
              className={styles.slider_item}
              src={slider3}
              alt="slider-image"
            />
          </div>
        </div>
        <button className={styles.right_btn} onClick={slideRight}></button>
      </div>
      <div className={styles.indicators}>
        <div
          className={index === 0 ? styles.indicator_active : styles.indicator}
          onClick={() => changeSlide(0)}
        ></div>
        <div
          className={index === -1 ? styles.indicator_active : styles.indicator}
          onClick={() => changeSlide(-1)}
        ></div>
        <div
          className={index === -2 ? styles.indicator_active : styles.indicator}
          onClick={() => changeSlide(-2)}
        ></div>
      </div>
    </div>
  );
};
