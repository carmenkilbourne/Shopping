import { useEffect, useState } from "preact/hooks";
type props ={
    idNumber:number;
}
const ButtonAddProduct=({idNumber}:{idNumber:number})=>{
    const id=idNumber.toString();
    const [addToCart,setaddToCart]=useState<boolean>(false);
    useEffect(()=>{
        const cookie = document.cookie.split(";").find((c)=>
        c.startsWith("cartIds="));
       const ids = cookie ? cookie.split("=")[1].split(",") : [];
    setaddToCart(ids.includes(id));
  }, [id]);
 const toggleCart = () => {
    const cookie = document.cookie.split("; ").find((c) =>
      c.startsWith("cartIds")
    );
    const ids = cookie ? cookie.split("=")[1].split(",") : [];

    const updated = addToCart ? ids.filter((CartId) => CartId !== id) : [...ids, id];

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `cartIds=${
      updated.join(",")
    }; expires=${expires.toUTCString()}; path=/`;

    setaddToCart(!addToCart);
  };

    return(
        <div>
            <button type="submit" onClick={toggleCart}>Añadir producto</button>
        </div>
    );
};
export default ButtonAddProduct;




