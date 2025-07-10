import { useEffect, useState } from "preact/hooks";

type Props = {
  idNumber: number;
};

const ButtonProduct = ({ idNumber }: Props) => {
  const id = idNumber.toString();
  const [quantity, setQuantity] = useState<number>(0);

  // Leer cantidad del producto desde la cookie
  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("cartItems="));

    const items = cookie ? cookie.split("=")[1].split(",") : [];
    const found = items.find((item) => item.startsWith(id + ":"));

    if (found) {
      const qty = parseInt(found.split(":")[1]);
      setQuantity(qty);
    }
  }, [id]);

  const updateCartCookie = (newQuantity: number) => {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("cartItems="));

    let items = cookie ? cookie.split("=")[1].split(",") : [];

    if (newQuantity <= 0) {
      // Eliminar producto
      items = items.filter((item) => !item.startsWith(id + ":"));
    } else {
      const exists = items.find((item) => item.startsWith(id + ":"));
      if (exists) {
        // Actualizar cantidad
        items = items.map((item) =>
          item.startsWith(id + ":") ? `${id}:${newQuantity}` : item
        );
      } else {
        // Añadir nuevo producto
        items.push(`${id}:${newQuantity}`);
      }
    }

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `cartItems=${items.join(
      ","
    )}; expires=${expires.toUTCString()}; path=/`;

    setQuantity(newQuantity);
  };

  const addOne = () => updateCartCookie(quantity + 1);
  const removeOne = () => updateCartCookie(quantity - 1);

  return (
    <div>
      <p>Producto ID: {id}</p>
      <p>Cantidad: {quantity}</p>
      <button onClick={addOne}>Añadir</button>
      <button onClick={removeOne} disabled={quantity === 0}>
        Quitar
      </button>
    </div>
  );
};

export default ButtonProduct;
