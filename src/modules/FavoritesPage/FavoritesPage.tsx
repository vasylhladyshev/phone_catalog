import { FunctionComponent } from "react";
import styles from "./FavoritePage.module.scss";
import { useFavoriteContext } from "../../context/FavoriteContext/FavoriteContext";
import iconHome from "../../assets/IconHome.jpg";
import iconRight from "../../assets/VectorRight.png";
import { Link } from "react-router-dom";
import ProductCardDiscount from "../../shared/ProductCardDiscount/ProductCardDiscount";

interface FavoritesPageProps {}

const FavoritesPage: FunctionComponent<FavoritesPageProps> = () => {
  const { favoriteItems} = useFavoriteContext();


  return (
    <div className={styles.favorites_page}>
      <div className={styles.path}>
        <Link to="/">
          <img className={styles.icon_home} src={iconHome} alt="icon_home" />
        </Link>

        <img className={styles.icon_right} src={iconRight} alt="icon_right" />

        <span className={styles.path_span}>Favourites</span>
      </div>
      <h2 className={styles.page_title}>Favourites</h2>
      <span className={styles.items_quantity}>{`${favoriteItems.length} items`}</span>
      <div className={styles.favorite_items}>
        {favoriteItems.map((item) => <ProductCardDiscount item={item}/>)}
      </div>
    </div>
  );
};

export default FavoritesPage;
