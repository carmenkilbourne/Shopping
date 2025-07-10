import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Producto } from "../types.ts";
import ProductosContainer from "../components/ProductosContainer.tsx";

type State = {
  cartItems: string;
};

export const handler: Handlers<Producto[], State> = {
  async GET(_req, ctx: FreshContext<State>) {
    const raw = ctx.state.cartItems ?? "";
    const pairs = raw.split(",").filter(Boolean);

    const quantityMap = new Map<string, number>();
    for (const pair of pairs) {
      const [id, qty] = pair.split(":");
      if (id && qty) quantityMap.set(id, Number(qty));
    }

    const res = await fetch("https://fakestoreapi.com/products");
    const all: Producto[] = await res.json();

    const ids = Array.from(quantityMap.keys());
    const pCart = all.filter((p) => ids.includes(p.id.toString()));

    // Adjuntamos cantidades como campo extra si lo necesitas
    const productsWithQty = pCart.map((p) => ({
      ...p,
      quantity: quantityMap.get(p.id.toString()) ?? 1,
    }));

    return ctx.render(productsWithQty);
  },
};

export default function getProductInCart({ data }: PageProps<(Producto & { quantity: number })[]>) {
  let total = 0;

  return (
    <div class = "cart">
      {data.length === 0 ? (
        <h1>No hay productos en el carrito</h1>
      ) : (
        <>
          <ProductosContainer productos={data} />
          <ul>
            {data.map((d) => {
              total += d.price * d.quantity;
            })}
          </ul>
          <h1>Total: {total.toFixed(2)}$</h1>
        </>
      )}
    </div>
  );
}
