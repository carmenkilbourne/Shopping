import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Producto } from "../types.ts";
import ProductosContainer from "../components/ProductosContainer.tsx";
type State={
  cartIds:string;
}
export const handler: Handlers<Producto[],State> = {
  async GET(_req, ctx:FreshContext<State>) {
     const ids = ctx.state.cartIds?.split(",") ?? [];
        const res = await fetch("https://fakestoreapi.com/products");
        const all: Producto[] = await res.json();
        const pCart = all.filter((ch) => ids.includes(ch.id.toString()));
        if (pCart === null){
            return ctx.render(<h1>no hay personajes favoritos</h1>)
        }
        else{
        return ctx.render(pCart);

        }
  },
};

export default function getProductInCart({data} : PageProps<Producto[]>) {
  let total =0;
  return (
    <div>
      {data.length ===0 ?
      <h1>No hay productos en el cart</h1>
      :<ProductosContainer productos={data}/>

      }
      { data.map((d)=>(
        total +=d.price
      ))  &&
      <h1>total: {total}</h1>
      }
      
    
    </div>
  );
}
