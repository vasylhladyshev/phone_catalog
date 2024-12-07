import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { Phone } from "../../types/phone";
import { Tablet } from "../../types/tablet";
import { Accessorize } from "../../types/accessorize";

type Product = Phone | Tablet | Accessorize;

interface FavoriteContextType {
  favoriteItems: Product[];
  addToFavorite: (item: Product) => void;
  removeFromFavorite: (itemId: string) => void;
  setFavoriteItems: Dispatch<SetStateAction<Product[]>>;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  const [favoriteItems, setFavoriteItems] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem("favoriteItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const addToFavorite = (item: Product) => {
    setFavoriteItems((prevItems) => [...prevItems, item]);
  };

  const removeFromFavorite = (itemId: string) => {
    setFavoriteItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoriteItems,
        addToFavorite,
        removeFromFavorite,
        setFavoriteItems,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = (): FavoriteContextType => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};
