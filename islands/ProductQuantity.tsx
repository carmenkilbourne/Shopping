import { useEffect, useState } from "preact/hooks";

type Props = {
  idNumber: number;
};

const ProductQuantity = ({ idNumber }: Props) => {
  const id = idNumber.toString();
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("cartIds="));
    const ids = cookie?.split("=")[1].split(",").filter(Boolean) || [];
    const found = ids.reduce((count: number, entry: string) => {
      const [eid, qty] = entry.split(":");
      return eid === id ? Number(qty) : count;
    }, 0);
    setQuantity(found);
  }, [id]);

  const updateCookie = (newQty: number) => {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("cartIds="));
    const ids = cookie?.split("=")[1].split(",").filter(Boolean) || [];

    const filtered = ids.filter((e) => !e.startsWith(id + ":"));
    if (newQty > 0) filtered.push(`${id}:${newQty}`);

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `cartIds=${filtered.join(
      ","
    )}; expires=${expires.toUTCString()}; path=/`;
  };

  const changeQty = (delta: number) => {
    const newQty = Math.max(0, quantity + delta);
    setQuantity(newQty);
    updateCookie(newQty);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
      <button onClick={() => changeQty(-1)} disabled={quantity === 0}>–</button>
      <span>{quantity}</span>
      <button onClick={() => changeQty(1)}>+</button>
    </div>
  );
};

export default ProductQuantity;
