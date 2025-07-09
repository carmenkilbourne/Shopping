import { FunctionalComponent } from "preact/src/index.js";

const Header:FunctionalComponent=()=>{
    return(
        <div class="header">
            <a href={`/pagPrincipal`}>Catalog</a>
            <a href={`/cart`}>Cart</a>
        </div>
    );
};
export default Header;