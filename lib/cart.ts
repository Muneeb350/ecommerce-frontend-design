export interface CartItem {
  id: number;
  title: string;
  price: number;
  src: string;
  qty: number;
}

/** Add one unit of a product to the localStorage cart. Increments qty if already present. */
export function addToCart(item: Omit<CartItem, "qty">): void {
  const raw = localStorage.getItem("cart");
  const cart: CartItem[] = raw ? JSON.parse(raw) : [];
  const idx = cart.findIndex((c) => c.id === item.id);
  if (idx !== -1) {
    cart[idx].qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
