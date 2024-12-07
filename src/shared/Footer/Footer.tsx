import { FunctionComponent } from "react";
import styles from "./Footer.module.scss";
import logo from "../../assets/NiceGadgets.png";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.navigation}>
          <a className={styles.navigation_link} href="">
            GITHUB
          </a>
          <a className={styles.navigation_link} href="">
            CONTACTS
          </a>
          <a className={styles.navigation_link} href="">
            RIGHTS
          </a>
        </div>
        <div className={styles.to_top_button_div}>
          <span className={styles.to_top_button_span}>Back to top</span>
          <button
            className={styles.to_top_button}
            onClick={scrollToTop}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
