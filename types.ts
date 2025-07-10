export type Producto ={
  id:number;
  title:string;
  image:string;
  price:number;
  description:string;
  rating:Rate;
}
type Rate={
  rate:number;
  count:number;
}