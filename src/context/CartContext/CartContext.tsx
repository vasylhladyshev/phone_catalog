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

type Product = {
  id: string;
  quantity: number;
  product: Phone | Tablet | Accessorize;
};

interface CartContextType {
  cartItems: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: string) => void;
  setCartItems: Dispatch<SetStateAction<Product[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem("cartItem");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Product) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
