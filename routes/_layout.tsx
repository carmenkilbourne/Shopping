import { type PageProps } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";
export default function App({ Component }: PageProps) {
    return (
        <div>
            <Header />
            <Component />
        </div>
    );
}
