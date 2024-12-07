import { FunctionComponent, useEffect, useState } from "react";
import styles from "./ProductPage.module.scss";
import products from "../../api/products.json";
import phones from "../../api/phones.json";
import tablets from "../../api/tablets.json";
import accessories from "../../api/accessories.json";
import { Phone } from "../../types/phone";
import { Tablet } from "../../types/tablet";
import { Accessorize } from "../../types/accessorize";
import iconHome from "../../assets/IconHome.jpg";
import iconRight from "../../assets/VectorRight.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductsSlider from "../ProductsSlider/ProductsSlider";
import ProductCardDiscount from "../ProductCardDiscount/ProductCardDiscount";
import { useCartContext } from "../../context/CartContext/CartContext";
import { useFavoriteContext } from "../../context/FavoriteContext/FavoriteContext";

interface ProductPageProps {}

type Item = Phone | Tablet | Accessorize;

const ProductPage: FunctionComponent<ProductPageProps> = () => {
  const { cartItems, addToCart } = useCartContext();
  const { favoriteItems, addToFavorite, removeFromFavorite } =
    useFavoriteContext();
  const [item, setItem] = useState<Item>();
  const [choosenColor, setChoosenColor] = useState<string>("");
  const [choosenCapacity, setChoosenCapacity] = useState<string>("");
  const [choosenImage, setChoosenImage] = useState<number>(0);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isInFavorite, setIsInFavorite] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const category = products.find((product) =>
    window.location.pathname.includes(product.category)
  )?.category;

  useEffect(() => {
    if (category === "phones") {
      const phone = phones.find((phone) =>
        window.location.pathname.includes(phone.id)
      );
      if (phone) {
        setItem(phone);
        setIsInCart(!!cartItems.find((cartItem) => cartItem.id === phone.id));
        setChoosenColor(phone.color);
        setChoosenCapacity(phone.capacity);
        setIsInFavorite(
          !!favoriteItems.find((favoriteItem) => favoriteItem.id === phone.id)
        );
      }
    } else if (category === "tablets") {
      const tablet = tablets.find((tablet) =>
        window.location.pathname.includes(tablet.id)
      );
      if (tablet) {
        setItem(tablet);
        setChoosenColor(tablet.color);
        setChoosenCapacity(tablet.capacity);
        setIsInCart(!!cartItems.find((cartItem) => cartItem.id === tablet.id));
        setIsInFavorite(
          !!favoriteItems.find((favoriteItem) => favoriteItem.id === tablet.id)
        );
      }
    } else if (category === "accessories") {
      const accessorize = accessories.find((accessorize) =>
        window.location.pathname.includes(accessorize.id)
      );
      if (accessorize) {
        setItem(accessorize);
        setChoosenColor(accessorize.color);
        setChoosenCapacity(accessorize.capacity);
        setIsInCart(
          !!cartItems.find((cartItem) => cartItem.id === accessorize.id)
        );
        setIsInFavorite(
          !!favoriteItems.find(
            (favoriteItem) => favoriteItem.id === accessorize.id
          )
        );
      }
    }
  }, [location.pathname]);

  const changeColor = (color: string): void => {
    if (category === "phones") {
      setItem(
        phones.find(
          (product) =>
            product.color === color &&
            product.namespaceId === item?.namespaceId &&
            product.capacity === choosenCapacity
        )
      );
      const newUrl = `${location.pathname.slice(
        0,
        location.pathname.lastIndexOf("/") + 1
      )}${
        phones.find(
          (product) =>
            product.capacity === choosenCapacity &&
            product.namespaceId === item?.namespaceId &&
            product.color === color
        )?.id
      }`;
      navigate(newUrl);
      setChoosenColor(color);
    } else if (category === "tablets") {
      setItem(
        tablets.find(
          (product) =>
            product.color === color &&
            product.namespaceId === item?.namespaceId &&
            product.capacity === choosenCapacity
        )
      );
      const newUrl = `${location.pathname.slice(
        0,
        location.pathname.lastIndexOf("/") + 1
      )}${
        tablets.find(
          (product) =>
            product.capacity === choosenCapacity &&
            product.namespaceId === item?.namespaceId &&
            product.color === color
        )?.id
      }`;
      navigate(newUrl);
      setChoosenColor(color);
    } else if (category === "accessories") {
      setItem(
        accessories.find(
          (product) =>
            product.color === color &&
            product.namespaceId === item?.namespaceId &&
            product.capacity === choosenCapacity
        )
      );
      const newUrl = `${location.pathname.slice(
        0,
        location.pathname.lastIndexOf("/") + 1
      )}${
        accessories.find(
          (product) =>
            product.capacity === choosenCapacity &&
            product.namespaceId === item?.namespaceId &&
            product.color === color
        )?.id
      }`;
      navigate(newUrl);
      setChoosenColor(color);
    }
  };

  const changeCapacity = (capacity: string): void => {
    if (category === "phones") {
      setItem(
        phones.find(
          (product) =>
            product.capacity === capacity &&
            product.namespaceId === item?.namespaceId &&
            product.color === choosenColor
        )
      );
      const newUrl = `${location.pathname.slice(
        0,
        location.pathname.lastIndexOf("/") + 1
      )}${
        phones.find(
          (product) =>
            product.capacity === capacity &&
            product.namespaceId === item?.namespaceId &&
            product.color === choosenColor
        )?.id
      }`;
      navigate(newUrl);
      setChoosenCapacity(capacity);
    } else if (category === "tablets") {
      setItem(
        tablets.find(
          (product) =>
            product.capacity === capacity &&
            product.namespaceId === item?.namespaceId &&
            product.color === choosenColor
        )
      );
      const newUrl = `${location.pathname.slice(
        0,
        location.pathname.lastIndexOf("/") + 1
      )}${
        tablets.find(
          (product) =>
            product.capacity === capacity &&
            product.namespaceId === item?.namespaceId &&
            product.color === choosenColor
        )?.id
      }`;
      navigate(newUrl);
      setChoosenCapacity(capacity);
    } else if (category === "accessories") {
      setItem(
        accessories.find(
          (product) =>
            product.capacity === capacity &&
            product.namespaceId === item?.namespaceId &&
            product.color === choosenColor
        )
      );
      const newUrl = `${location.pathname.slice(
        0,
        location.pathname.lastIndexOf("/") + 1
      )}${
        accessories.find(
          (product) =>
            product.capacity === capacity &&
            product.namespaceId === item?.namespaceId &&
            product.color === choosenColor
        )?.id
      }`;
      navigate(newUrl);
      setChoosenCapacity(capacity);
    }
  };

  const changeImage = (index: number): void => {
    setChoosenImage(index);
  };

  const handleAddToCart = (item: Item) => {
    const product = {
      id: item.id,
      quantity: 1,
      product: item,
    };
    product && addToCart(product);
    setIsInCart(true);
  };

  const handleAddToFavorite = (item: Item): void => {
    addToFavorite(item);
    setIsInFavorite(true);
  };

  const handleRemoveFromFavorite = (itemId: string): void => {
    removeFromFavorite(itemId);
    setIsInFavorite(false);
  };

  return (
    <div className={styles.product_page}>
      <div className={styles.path}>
        <Link to="/">
          <img className={styles.icon_home} src={iconHome} alt="icon_home" />
        </Link>

        <img className={styles.icon_right} src={iconRight} alt="icon_right" />

        <Link className={styles.link} to={`/${category}`}>
          <span className={styles.path_span}>
            {category && category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </Link>

        <img className={styles.icon_right} src={iconRight} alt="icon_right" />

        <span className={styles.path_id_span}>{item?.name}</span>
      </div>
      <Link to={`/${category}`} className={styles.back_btn}>
        Back
      </Link>
      <span className={styles.product_name}>{item?.name}</span>
      <div className={styles.product_main}>
        <div className={styles.images}>
          <div className={styles.small_images}>
            {item?.images.map((image, index) => (
              <div
                className={
                  index === choosenImage
                    ? styles.small_image_active
                    : styles.small_image
                }
                key={image}
                onClick={() => changeImage(index)}
              >
                <img src={`/${image}`} alt="product_image" />{" "}
              </div>
            ))}
          </div>
          <div className={styles.main_image}>
            <img
              src={`/${item?.images.find(
                (image, index) => index === choosenImage
              )}`}
              alt="product_image"
            />
          </div>
        </div>
        <div className={styles.product_settings}>
          <div className={styles.color_settings}>
            <span className={styles.color_title}>Available colors</span>
            <div className={styles.available_colors}>
              {item?.colorsAvailable.map((availableColor) => (
                <div
                  className={
                    availableColor === item?.color
                      ? `${styles.choose_color_btn_div} ${styles.active}`
                      : styles.choose_color_btn_div
                  }
                  key={availableColor}
                  onClick={() => changeColor(availableColor)}
                >
                  <input
                    type="radio"
                    value={availableColor}
                    name="color"
                    className={styles.choose_color_btn}
                    checked={availableColor === item?.color}
                    readOnly
                  />
                  <span
                    className={styles.circle}
                    style={{ backgroundColor: availableColor }}
                  ></span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.capacity_settings}>
            <span className={styles.capacity_span}>Select capacity</span>
            <div className={styles.capacity_buttons}>
              {item?.capacityAvailable.map((capacity) => (
                <button
                  className={
                    capacity === choosenCapacity
                      ? styles.capacity_btn_active
                      : styles.capacity_btn
                  }
                  onClick={() => changeCapacity(capacity)}
                  key={capacity}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.confirmation}>
            <div className={styles.price}>
              <span className={styles.price_discount_span}>
                ${item?.priceDiscount}
              </span>
              <span className={styles.price_span}>${item?.priceRegular}</span>
            </div>
            <div className={styles.buttons}>
              <button
                className={isInCart ? styles.add_btn_active : styles.add_btn}
                onClick={() => handleAddToCart(item as Item)}
              >
                {isInCart ? "Added" : "Add to cart"}
              </button>
              {item && isInFavorite ? (
                <button
                  className={styles.fav_btn_active}
                  onClick={() => handleRemoveFromFavorite(item.id)}
                ></button>
              ) : (
                <button
                  className={styles.fav_btn}
                  onClick={() => handleAddToFavorite(item as Item)}
                ></button>
              )}
            </div>
            <div className={styles.characteristics}>
              <div className={styles.info}>
                <span className={styles.characteristic_name}>Screen</span>
                <span className={styles.characteristic_value}>
                  {item?.screen}
                </span>
              </div>
              <div className={styles.info}>
                <span className={styles.characteristic_name}>Resolution</span>
                <span className={styles.characteristic_value}>
                  {item?.resolution}
                </span>
              </div>
              <div className={styles.info}>
                <span className={styles.characteristic_name}>Processor</span>
                <span className={styles.characteristic_value}>
                  {item?.processor}
                </span>
              </div>
              <div className={styles.info}>
                <span className={styles.characteristic_name}>RAM</span>
                <span className={styles.characteristic_value}>{item?.ram}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.product_info}>
        <div className={styles.product_description}>
          <div className={styles.product_about}>
            <div className={styles.about_title}>
              <h3 className={styles.about_span}>About</h3>
            </div>
            <div className={styles.paragraph_about}>
              <h3 className={styles.paragraph_title}>
                {item?.description[0].title}
              </h3>
              <p className={styles.paragraph_text}>
                {item?.description[0].text}
              </p>
            </div>
            <div className={styles.paragraph_about}>
              <h3 className={styles.paragraph_title}>
                {item?.description[1].title}
              </h3>
              <p className={styles.paragraph_text}>
                {item?.description[1].text}
              </p>
            </div>
            <div className={styles.paragraph_about}>
              <h3 className={styles.paragraph_title}>
                {item?.description[2].title}
              </h3>
              <p className={styles.paragraph_text}>
                {item?.description[2].text}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.product_specifications}>
          <div className={styles.specifications_title}>
            <h3 className={styles.specifications_span}>Tech specs</h3>
          </div>
          <div className={styles.specification_info}>
            <span className={styles.characteristic_name}>Screen</span>
            <span className={styles.characteristic_value}>{item?.screen}</span>
          </div>
          <div className={styles.specification_info}>
            <span className={styles.characteristic_name}>Resolution</span>
            <span className={styles.characteristic_value}>
              {item?.resolution}
            </span>
          </div>
          <div className={styles.specification_info}>
            <span className={styles.characteristic_name}>Processor</span>
            <span className={styles.characteristic_value}>
              {item?.processor}
            </span>
          </div>
          <div className={styles.specification_info}>
            <span className={styles.characteristic_name}>RAM</span>
            <span className={styles.characteristic_value}>{item?.ram}</span>
          </div>
          <div className={styles.specification_info}>
            <span className={styles.characteristic_name}>Built in memory</span>
            <span className={styles.characteristic_value}>
              {item?.capacity}
            </span>
          </div>

          {item && "camera" in item && (
            <div className={styles.specification_info}>
              <span className={styles.characteristic_name}>Camera</span>

              <span className={styles.characteristic_value}>
                {item?.camera}
              </span>
            </div>
          )}
          {item && "zoom" in item && (
            <div className={styles.specification_info}>
              <span className={styles.characteristic_name}>Zoom</span>
              <span className={styles.characteristic_value}></span>
              {item?.zoom}
            </div>
          )}
          <div className={styles.specification_info}>
            <span className={styles.characteristic_name}>Cell</span>
            <span className={styles.characteristic_value}>
              {item?.cell.join(", ")}
            </span>
          </div>
        </div>
      </div>
      <ProductsSlider title={"You may also like this"}>
        {phones.map((item) => (
          <ProductCardDiscount item={item} />
        ))}
      </ProductsSlider>
    </div>
  );
};

export default ProductPage;
