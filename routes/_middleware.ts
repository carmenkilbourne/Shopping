import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

type State = {
    email?: string;
    password?: string;
};

export async function handler(
    req: Request,
    ctx: FreshContext<State>,
) {
    if (ctx.destination !== "route" || ctx.route === "/") {
        return await ctx.next();
    }
    const cookies = getCookies(req.headers);
    ctx.state.email = cookies.email;
    ctx.state.password = cookies.password;
    const email = cookies.email;
    const password=cookies.password;
    if(email && password){
        return await ctx.next();
    }
    return Response.redirect(new URL("/",req.url),307);
}
