import { FunctionalComponent } from "preact/src/index.js";
import { Producto } from "../types.ts";
type Props = {
    producto: Producto;
};

const ProductDetails: FunctionalComponent<Props> = ({ producto }) => {
    const full = "★".repeat(Math.round(producto.rating.rate));
    const empty = "☆".repeat(5 - Math.round(producto.rating.rate));
    return (
        <div class="productContainer">
            <div class="productDetailsCard">
                <h1>{producto.title}</h1>
                <img src={producto.image} />
                <p>{producto.price}$</p>
                <p>{producto.description}</p>
                <h1>rating:{producto.rating.rate}{full + empty}</h1>
            </div>
        </div>
    );
};
export default ProductDetails;
