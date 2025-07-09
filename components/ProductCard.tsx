import { FunctionalComponent } from "preact/src/index.js";
import { Producto } from "../types.ts";
type Props ={
    producto:Producto;
}

const ProductCard:FunctionalComponent<Props>=({producto})=>{
    return(
        <div class ="productCard">
            <a href={`/product/${producto.id}`}>
            <h1>{producto.title}</h1>
            <img src={producto.image} />
            <p>{producto.price}$</p>
            </a>

        </div>
    );
};
export default ProductCard;