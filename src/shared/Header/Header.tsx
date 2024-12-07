import { FunctionComponent, useState } from "react";
import styles from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/NiceGadgets.png";
import { useFavoriteContext } from "../../context/FavoriteContext/FavoriteContext";
import { useCartContext } from "../../context/CartContext/CartContext";

interface HeaderProps {}

export const Header: FunctionComponent<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { favoriteItems } = useFavoriteContext();
  const { cartItems } = useCartContext();

  const toggleMenu = (): void => {
    setIsMenuOpen((cur) => !cur);
    document.body.classList.toggle("no-scroll", !isMenuOpen);
  };

  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.navigation}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.menu_items}>
          <Link
            className={
              location.pathname === "/" ? styles.link_active : styles.link
            }
            to="/"
          >
            HOME
          </Link>
          <Link
            className={
              location.pathname.includes("phones")
                ? styles.link_active
                : styles.link
            }
            to="/phones"
          >
            PHONES
          </Link>
          <Link
            className={
              location.pathname.includes("tablets")
                ? styles.link_active
                : styles.link
            }
            to="/tablets"
          >
            TABLETS
          </Link>
          <Link
            className={
              location.pathname.includes("accessories")
                ? styles.link_active
                : styles.link
            }
            to="/accessories"
          >
            ACCESSORIES
          </Link>
        </div>
      </div>
      <div className={styles.buttons_right}>
        <Link
          className={
            location.pathname === "/favorites"
              ? styles.favorites_active
              : styles.favorites
          }
          to="/favorites"
        >
          {favoriteItems.length > 0 && (
            <div className={styles.quantity_div}>
              <span className={styles.quantity_span}>
                {favoriteItems.length}
              </span>
            </div>
          )}
        </Link>
        <Link
          className={
            location.pathname === "/cart" ? styles.cart_active : styles.cart
          }
          to="/cart"
        >
          {cartItems.length > 0 && (
            <div className={styles.quantity_div}>
              <span className={styles.quantity_span}>
                {cartItems.reduce(
                  (total, currentItem) => total + currentItem.quantity,
                  0
                )}
              </span>
            </div>
          )}
        </Link>
      </div>

      <div className={styles.menu}>
        <input
          type="checkbox"
          id="burger-checkbox"
          className={styles.burger_checkbox}
          checked={isMenuOpen}
        />
        <label
          htmlFor="burger-checkbox"
          className={styles.burger}
          onClick={toggleMenu}
        >
          <span></span>
        </label>
        <div className={styles.menu_list}>
          <Link
            className={
              location.pathname === "/" ? styles.link_active : styles.link
            }
            onClick={toggleMenu}
            to="/"
          >
            HOME
          </Link>

          <Link
            className={
              location.pathname === "/phones" ? styles.link_active : styles.link
            }
            onClick={toggleMenu}
            to="/phones"
          >
            PHONES
          </Link>

          <Link
            className={
              location.pathname === "/tablets"
                ? styles.link_active
                : styles.link
            }
            onClick={toggleMenu}
            to="/tablets"
          >
            TABLETS
          </Link>

          <Link
            className={
              location.pathname === "/accessories"
                ? styles.link_active
                : styles.link
            }
            onClick={toggleMenu}
            to="/accessories"
          >
            ACCESSORIES
          </Link>

          <div className={styles.buttons_bottom}>
            <Link
              className={
                location.pathname === "/favorites"
                  ? styles.favorites_active
                  : styles.favorites
              }
              onClick={toggleMenu}
              to="/favorites"
            > {favoriteItems.length > 0 && (
            <div className={styles.quantity_div_menu}>
              <span className={styles.quantity_span_menu}>
                {favoriteItems.length}
              </span>
            </div>
          )}</Link>
            <Link
              className={
                location.pathname === "/cart" ? styles.cart_active : styles.cart
              }
              onClick={toggleMenu}
              to="/cart"
            >{cartItems.length > 0 && (
            <div className={styles.quantity_div_menu}>
              <span className={styles.quantity_span_menu}>
                {cartItems.reduce(
                  (total, currentItem) => total + currentItem.quantity,
                  0
                )}
              </span>
            </div>
          )}</Link>
          </div>
        </div>
      </div>
    </header>
  );
};
