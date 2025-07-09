import { FreshContext, Handlers } from "$fresh/server.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";
type Prop={
  data:string;
}
export const handler: Handlers = {
  async GET(req, ctx) {
    const cookies = getCookies(req.headers);
    return await ctx.render(cookies.email );
  },
  async POST(req:Request, _ctx:FreshContext) {
    const form = await req.formData();
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";
    const headers = new Headers();
    if (email === "c@gmail.com" && password === "123") {
      setCookie(headers, {
        name: "email",
        value: email,
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "Lax",
        path: "/",
        secure: true,
      });
      setCookie(headers, {
        name: "password",
        value: password,
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "Lax",
        path: "/",
        secure: true,
      });
      headers.set("location", "/pagPrincipal");
      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    } else {
      headers.set("location", "/");
      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    }
  },
};

export default function LogIn(props:Prop) {
  const valorCookie = props.data;
  return (
    <div class="index">
      <h1>Log In</h1>
      <form method="post" class ="AddForm">
        <input type="email" name="email" value="" placeholder="email"/>
        <input type="password" name="password" value="" placeholder="password" />
        <button type="submit">Subscribe</button>
          {valorCookie!=="" && <p>Acceso no garantizado</p> ||<h1>Acceso garantizado</h1>}
      </form>
    
    </div>
  );
}
