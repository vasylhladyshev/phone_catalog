import { FunctionComponent } from "react";
import phones from "../../api/phones.json";
import styles from "./HomePage.module.scss";
import { Slider } from "./components/Slider/Slider";
import ProductsSlider from "../../shared/ProductsSlider/ProductsSlider";
import Categories from "./components/Categories/Categories";
import ProductCard from "../../shared/ProductCard/ProductCard";
import ProductCardDiscount from "../../shared/ProductCardDiscount/ProductCardDiscount";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <div className={styles.home_page}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <Slider />
      <ProductsSlider title={"Brand new models"}>
        {phones.map((item) => (
          <ProductCard item={item} />
        ))}
      </ProductsSlider>
      <Categories />
      <ProductsSlider title={"Hot prices"}>
        {phones
          .sort((a, b) => {
            return (
              b.priceRegular -
              b.priceDiscount -
              (a.priceRegular - a.priceDiscount)
            );
          })
          .map((item) => (
            <ProductCardDiscount item={item} />
          ))}
      </ProductsSlider>
    </div>
  );
};

export default HomePage;
