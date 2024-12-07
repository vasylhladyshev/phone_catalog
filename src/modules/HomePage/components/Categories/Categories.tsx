import { FunctionComponent, useContext } from "react";
import styles from "./Categories.module.scss";
import phones from "../../../../api/phones.json";
import tablets from "../../../../api/tablets.json";
import accessories from "../../../../api/accessories.json";
import { Link } from "react-router-dom";

interface CategoriesProps {}

const Categories: FunctionComponent<CategoriesProps> = () => {
 
  return (
    <div className={styles.categories}>
      <h2 className={styles.categories_title}>Shop by category</h2>
      <div className={styles.categories_content}>
        <div className={styles.category}>
          <Link to="/phones" >
            < div className={styles.category_image_phones}>
              <img src="img/category-phones.webp" alt="category-image" />
            </div>
          </Link>
          <span className={styles.category_title}>Mobile phones</span>
          <span className={styles.category_info}>{phones.length} models</span>
        </div>
        <div className={styles.category}>
          <Link to="/tablets" >
            <div className={styles.category_image_tablets}>
              <img src="img/category-tablets.png" alt="category-image" />
            </div>
          </Link>

          <span className={styles.category_title}>Tablets</span>
          <span className={styles.category_info}>{tablets.length} models</span>
        </div>
        <div className={styles.category}>
          <Link to="/accessories" >
            <div className={styles.category_image_accessories}>
              <img src="img/category-accessories.png" alt="category-image" />
            </div>
          </Link>

          <span className={styles.category_title}>Accessories</span>
          <span className={styles.category_info}>
            {accessories.length} models
          </span>
        </div>
      </div>
    </div>
  );
};

export default Categories;
