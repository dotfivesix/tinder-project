import { Query } from "../types";
import Header from "./header";
import SwipeViewContainer from "./swipe-view";

export default function Home
    ({ query }: {query: Query}) {
    return (
        <>
            <Header />
            <main>
                <SwipeViewContainer {...{query}} />
            </main>
        </>
    );
}