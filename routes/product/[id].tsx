import { PageProps } from "$fresh/server.ts";
import { FreshContext, Handlers } from "$fresh/server.ts";
import axios from "axios";
import { Producto } from "../../types.ts";
import ProductDetails from "../../components/ProductDetails.tsx";
type Prop={
  producto:Producto;
}
export const handler: Handlers = {
  async GET(_req:Request, ctx:FreshContext) {
    const {id} = ctx.params;
    const producto = await axios.get<Producto>(`https://fakestoreapi.com/products/${id}`);
    return await ctx.render({producto:producto.data});
  },
};

export default function LogIn(props:PageProps<Prop>) {
    const producto= props.data.producto;
  return (
    <div>
      <ProductDetails producto={producto}/>
    </div>
  );
}
