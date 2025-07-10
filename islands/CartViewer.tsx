import { useEffect, useState } from "preact/hooks";
import { Producto } from "../types.ts";
import ProductosContainer from "../components/ProductosContainer.tsx";

const CartViewer = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const cookie = document.cookie.split("; ").find((c) =>
      c.startsWith("cartItems=")
    );
    const ids = cookie ? cookie.split("=")[1].split(",") : [];

    if (ids.length === 0) return;

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((all: Producto[]) => {
        const seleccionados = all.filter((p) =>
          ids.includes(p.id.toString())
        );
        setProductos(seleccionados);
        const suma = seleccionados.reduce((acc, p) => acc + p.price, 0);
        setTotal(suma);
      });
  }, []);

  return (
    <div>
      {productos.length === 0
        ? <h1>No hay productos en el carrito</h1>
        : (
          <>
            <ProductosContainer productos={productos} />
            <h2>Total: ${total.toFixed(2)}</h2>
          </>
        )}
    </div>
  );
};

export default CartViewer;
