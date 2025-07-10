import { FunctionalComponent } from "preact/src/index.js";
import { Producto } from "../types.ts";
import ProductCard from "./ProductCard.tsx";
type Props ={
    productos:Producto[];
}

const ProductosContainer:FunctionalComponent<Props>=({productos})=>{
    return(
        <div class="productContainer">
            {productos.map((p)=>(
                <ProductCard producto={p}/>
            ))}

        </div>
    );
};
export default ProductosContainer;