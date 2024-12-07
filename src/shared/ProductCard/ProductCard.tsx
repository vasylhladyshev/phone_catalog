import { FunctionComponent, useState } from "react";
import styles from "./ProductCard.module.scss";
import { Phone } from "../../types/phone";
import { Tablet } from "../../types/tablet";
import { Accessorize } from "../../types/accessorize";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext/CartContext";
import { useFavoriteContext } from "../../context/FavoriteContext/FavoriteContext";

type Item = Phone | Tablet | Accessorize;

interface ProductCardProps {
  item: Item;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ item }) => {
  const { cartItems, addToCart } = useCartContext();
  const { favoriteItems, addToFavorite, removeFromFavorite } = useFavoriteContext();
  const [isInFavorite, setIsInFavorite] = useState<boolean>(
    !!favoriteItems.find((favoriteItem) => favoriteItem.id === item.id)
  );
  const [isInCart, setIsInCart] = useState<boolean>(
    !!cartItems.find((cartItem) => cartItem.id === item.id)
  );

  const handleAddToFavorite = (item: Item) => {
    addToFavorite(item);
    setIsInFavorite(true);
  };

  const handleRemoveFromFavorite = (itemId: string) => {
    removeFromFavorite(itemId);
    setIsInFavorite(false);
  };

  const scrollToTop = (): void => {
    console.log("a");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAddToCart = (item: Item) => {
    if (!isInCart) {
    const product = {
      id: item.id,
      quantity: 1,
      product: item,
    };
    product && addToCart(product);
    setIsInCart(true);
  }
  };

  return (
    <div className={styles.product_card}>
      <Link
        className={styles.img_link}
        to={`/${item.category}/${item.id}`}
        onClick={scrollToTop}
      >
        {" "}
        <img src={`/${item.images[0]}`} alt="product_image" />
      </Link>
      <div className={styles.info}>
        <Link
          className={styles.title_link}
          to={`/${item.category}/${item.id}`}
          onClick={scrollToTop}
        >
          <span className={styles.title}>{item.name}</span>
        </Link>
        <div className={styles.price}>
          <span className={styles.price_span}>${item.priceRegular}</span>
        </div>
        <div className={styles.characteristic}>
          <span className={styles.characteristic_name}>Screen</span>
          <span className={styles.characteristic_property}>{item.screen}</span>
        </div>
        <div className={styles.characteristic}>
          <span className={styles.characteristic_name}>Capacity</span>
          <span className={styles.characteristic_property}>
            {item.capacity}
          </span>
        </div>
        <div className={styles.characteristic}>
          <span className={styles.characteristic_name}>RAM</span>
          <span className={styles.characteristic_property}>{item.ram}</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          className={
            isInCart ? styles.add_cart_btn_active : styles.add_cart_btn
          }
          onClick={() => handleAddToCart(item)}
        >
          {isInCart ? "Added" : "Add to cart"}
        </button>
        {isInFavorite ? (
          <button
            className={styles.add_fav_btn_active}
            onClick={() => handleRemoveFromFavorite(item.id)}
          ></button>
        ) : (
          <button
            className={styles.add_fav_btn}
            onClick={() => handleAddToFavorite(item)}
          ></button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
