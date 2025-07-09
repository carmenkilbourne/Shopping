import { Handlers, PageProps } from "$fresh/server.ts";
import axios from 'axios';
import { Producto } from "../types.ts";
import ProductosContainer from "../components/ProductosContainer.tsx";

type Props={
  productos:Producto[];
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const results = await axios.get<Producto[]>("https://fakestoreapi.com/products");
    const resp = await ctx.render({productos:results.data});
    return resp;
  },
};

export default function mostrarProductos(productos:PageProps<Props>) {
  const productosArray =productos.data.productos;
  return (
    <div>
     <ProductosContainer productos={productosArray}/>

    </div>
  );
}