import { FunctionComponent, useEffect, useState } from "react";
import styles from "./ProductsPage.module.scss";
import ProductCard from "../../shared/ProductCard/ProductCard";
import { Phone } from "../../types/phone";
import { Tablet } from "../../types/tablet";
import { Accessorize } from "../../types/accessorize";
import iconHome from "../../assets/IconHome.jpg";
import iconRight from "../../assets/VectorRight.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface ProductsPageProps {
  products: Phone[] | Tablet[] | Accessorize[];
}

const ProductsPage: FunctionComponent<ProductsPageProps> = ({ products }) => {
  const [perPage, setPerPage] = useState<number>(16);
  const [sort, setSort] = useState<string>("Newest");
  const [amountPerPage, setAmountPerPage] = useState<string>('16');
  const [curPage, setCurPage] = useState<number>(1);
  const [renderedArray, setRenderedArray] = useState<
    Phone[] | Tablet[] | Accessorize[]
  >([]);
  const [sortTypeIsOpen, setSortTypeIsOpen] = useState<boolean>(false);
  const [itemsOnPageIsOpen, setItemsOnPageIsOpen] = useState<boolean>(false);
  const [sortName, setSortName] = useState<string>("age");


  useEffect(() => {
    setRenderedArray(products);
    handleClick("age", curPage, perPage);
  }, [products]);

  const countOfPages = Array.from(
    { length: Math.ceil(products.length / perPage) },
    (_, i) => i + 1
  );

  useEffect(() => {
    changeRenderArray();
  }, [curPage, perPage, sort]);

  const changeRenderArray = () => {
    if (sort === "Cheapest") {
      const copy = [...products];
      setRenderedArray(
        copy
          .sort((a, b) => a.priceRegular - b.priceRegular)
          .slice(
            Number(perPage) * curPage - Number(perPage),
            Number(perPage) * curPage
          )
      );
    } else if (sort === "Alphabetically") {
      const copy = [...products];

      setRenderedArray(
        copy
          .sort((a, b) => a.name.localeCompare(b.name))
          .slice(
            Number(perPage) * curPage - Number(perPage),
            Number(perPage) * curPage
          )
      );
    } else if (sort === "Newest") {
      const copy = [...products];
      setRenderedArray(
        copy
          .reverse()
          .slice(
            Number(perPage) * curPage - Number(perPage),
            Number(perPage) * curPage
          )
      );
    }
  };

  const paginate = (pageNumber: number): void => {
    setCurPage(pageNumber);
  };

  const chooseItemsPerPage = (amount: string) => {
    setAmountPerPage(amount);
    if (amount === "All") {
      setPerPage(products.length);
    } else {
      setPerPage(Number(amount));
      if (curPage > Math.ceil(products.length / Number(amount))) {
        setCurPage(Math.ceil(products.length / Number(amount)));
      }
    }
    setItemsOnPageIsOpen(false)
  };

  const setPrev = (): void => {
    setCurPage((cur) => cur - 1);
  };

  const setNext = (): void => {
    setCurPage((cur) => cur + 1);
  };

  const openItemsOnPage = (): void => {
    setItemsOnPageIsOpen((cur) => !cur);
  };

  const navigate = useNavigate();

  const location = useLocation();

  const handleClick = (sort: string, page: number, amountOnPage: number): void => {
    if (amountOnPage === products.length) {
      const newUrl = `${location.pathname}?sort=${sort}?`;
      navigate(newUrl);
    } else if (page === 1) {
      const newUrl = `${location.pathname}?sort=${sort}?perPage=${amountOnPage}`;
      navigate(newUrl);
    } else {
      const newUrl = `${location.pathname}?sort=${sort}?page=${page}&perPage=${amountOnPage}`;
      navigate(newUrl);
    }
    setSortName(sort);
  };

  const openSortMenu = (): void => {
    setSortTypeIsOpen((cur) => !cur);
  };

  const chooseSortType = (sort: string): void => {
    setSort(sort);
    setSortTypeIsOpen(false);
  };

  return (
    <div className={styles.products_page}>
      <div className={styles.path}>
        <Link to="/">
          <img className={styles.icon_home} src={iconHome} alt="icon_home" />
        </Link>

        <img className={styles.icon_right} src={iconRight} alt="icon_right" />

        <span className={styles.path_span}>
          {products[0].category.charAt(0).toUpperCase() +
            products[0].category.slice(1)}
        </span>
      </div>
      <h1 className={styles.products_page_title}>
        {products[0].category.charAt(0).toUpperCase() +
          products[0].category.slice(1)}
      </h1>
      <span className={styles.items_amount}>{products.length} models</span>
      <div className={styles.products_page_content}>
        <div className={styles.parameters}>
          <div className={styles.sort}>
            <span className={styles.sort_span}>Sort by</span>
            <div
              className={
                sortTypeIsOpen
                  ? styles.sort_type_div_open
                  : styles.sort_type_div
              }
              onClick={openSortMenu}
            >
              {sort}
            </div>
            <div
              className={sortTypeIsOpen ? styles.options_open : styles.options}
            >
              <div
                className={styles.option}
                onClick={() => {
                  handleClick("age", curPage, perPage);
                  chooseSortType("Newest");
                }}
              >
                Newest
              </div>
              <div
                className={styles.option}
                onClick={() => {
                  handleClick("alphabet", curPage, perPage);
                  chooseSortType("Alphabetically");
                }}
              >
                Alphabetically
              </div>
              <div
                className={styles.option}
                onClick={() => {
                  handleClick("cost", curPage, perPage);
                  chooseSortType("Cheapest");
                }}
              >
                Cheapest
              </div>
            </div>
          </div>

          <div className={styles.items_on_page}>
            <span className={styles.items_on_page_span}>Items on page</span>
            <div
              className={
                itemsOnPageIsOpen
                  ? styles.sort_control_div_open
                  : styles.sort_control_div
              }
              onClick={openItemsOnPage}
            >{amountPerPage}
            </div>

              <div
                className={
                  itemsOnPageIsOpen ? styles.options_open : styles.options
                }
              >
                <div
                  className={styles.option}
                  onClick={() => {
                    handleClick(sortName, curPage, products.length);
                    chooseItemsPerPage('All')
                  }}
                >
                  All
                </div>
                <div
                  className={styles.option}
                  onClick={() => {
                    handleClick(sortName, curPage, 16);
                    chooseItemsPerPage('16')
                  }}
                >
                  16
                </div>
                <div
                  className={styles.option}
                  onClick={() => {
                    handleClick(sortName, curPage, 24);
                    chooseItemsPerPage('24')
                  }}
                >
                  24
                </div>
                <div
                  className={styles.option}
                  onClick={() => {
                    handleClick(sortName, curPage, 32);
                    chooseItemsPerPage('32')
                  }}
                >
                  32
                </div>
              </div>
              {/* <select
                className={styles.sort_control}
                value={perPage}
                onChange={handleChange}
                onClick={openItemsOnPage}
                onBlur={() => setItemsOnPageIsOpen(false)}
              >
                <option
                  value="All"
                  onClick={() => handleClick(sortName, curPage)}
                >
                  All
                </option>
                <option
                  value="16"
                  onClick={() => handleClick(sortName, curPage)}
                >
                  16
                </option>
                <option
                  value="24"
                  onClick={() => handleClick(sortName, curPage)}
                >
                  24
                </option>
                <option
                  value="32"
                  onClick={() => handleClick(sortName, curPage)}
                >
                  32
                </option>
              </select> */}
          </div>
        </div>

        <div className={styles.products_page_items}>
          {renderedArray.map((item) => (
            <ProductCard item={item} key={item.id} />
          ))}
        </div>
        {perPage !== products.length && (
          <div className={styles.buttons}>
            <button
              className={styles.prev_btn}
              onClick={setPrev}
              disabled={curPage === 1}
            ></button>
            <div className={styles.paginate_btns}>
              {countOfPages.map((number) => (
                <button
                  className={
                    curPage === number
                      ? styles.page_btn_active
                      : styles.page_btn
                  }
                  key={number}
                  onClick={() => {
                    paginate(number);
                    handleClick(sortName, number, perPage);
                  }}
                >
                  {number}
                </button>
              ))}
            </div>
            <button
              className={styles.next_btn}
              onClick={setNext}
              disabled={curPage === countOfPages.length}
            ></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
