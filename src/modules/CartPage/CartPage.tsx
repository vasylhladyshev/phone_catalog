import { FunctionComponent, useEffect, useState } from "react";
import styles from "./CartPage.module.scss";
import { Tablet } from "../../types/tablet";
import { Phone } from "../../types/phone";
import { Accessorize } from "../../types/accessorize";
import { useCartContext } from "../../context/CartContext/CartContext";
import { Link } from "react-router-dom";
import iconClose from "../../assets/IconClose.jpg";
import iconPlus from "../../assets/IconPlus.jpg";
import iconMinus from "../../assets/IconMinus.jpg";

interface CartPageProps {}

const CartPage: FunctionComponent<CartPageProps> = () => {
  const { cartItems, setCartItems, removeFromCart } = useCartContext();

  const handleRemoveFromCart = (itemId: string): void => {
    removeFromCart(itemId);
  };

  const increaseQuantity = (itemId: string): void => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId: string): void => {
    const foundItem = cartItems.find((item) => item.id === itemId);
    if (foundItem && foundItem.quantity > 1) {
      setCartItems(
        cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  return (
    <div className={styles.cart_page}>
      <Link to={`/`} className={styles.back_btn}>
        Back
      </Link>
      <h2 className={styles.page_title}>Cart</h2>
      {cartItems.length ? (
        <div className={styles.cart_content}>
          <div className={styles.cart_items}>
            {cartItems.map((item) => (
              <div className={styles.cart_item} key={item.id}>
                <div className={styles.cart_item_main}>
                  <button
                    className={styles.remove_btn}
                    onClick={() => handleRemoveFromCart(item.id)}
                  ></button>

                  <img
                    className={styles.item_img}
                    src={item.product.images[0]}
                    alt="product_image"
                  />
                  <span className={styles.item_name}>{item.product.name}</span>
                </div>

                <div className={styles.cart_item_info}>
                  <div className={styles.item_quantity}>
                    <button
                      className={styles.decrease_btn}
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity === 1}
                    ></button>

                    <span className={styles.quantity_span}>
                      {item.quantity}
                    </span>
                    <button
                      className={styles.increase_btn}
                      onClick={() => increaseQuantity(item.id)}
                    ></button>
                  </div>
                  <span className={styles.price}>
                    {`$${item.product.priceDiscount * item.quantity}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.checkout_div}>
            <div className={styles.total_price}>
              <span className={styles.price_span}>{`$${cartItems.reduce(
                (sum, item) => sum + item.product.priceDiscount * item.quantity,
                0
              )}`}</span>
              <span
                className={styles.total_quantity}
              >{`Total for ${cartItems.reduce(
                (sum, item) => sum + item.quantity,
                0
              )} items`}</span>
            </div>
            <button className={styles.checkout_btn}>Checkout</button>
          </div>
        </div>
      ) : (
        <span className={styles.page_title}>Your cart is empty</span>
      )}
    </div>
  );
};

export default CartPage;
