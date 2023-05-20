import { useEffect, useState } from "react";
import { getMatches, hotelData, swipes } from "../../data";
import { HotelCard } from "./hotel-card";
import Home from "../page";
import Header from "./header";
import SwipeViewContainer from "./swipe-view";

export default function MatchesView() {
    const [hotelIDs, setHotelIDs] = useState<null | string[]>(null);
    const [restart, setRestart] = useState(false);

    useEffect(() => {
        getMatches(swipes, []).then(res => {
            setHotelIDs(res);
        });
    }, []);

    const btnStyle = 'w-full flex justify-center py-2 px-4 border bg-gray-800 text-neutral-200 hover:bg-gray-700'

    if (restart)
    {
        while (swipes.length !== 0) swipes.pop();
        return <SwipeViewContainer />;
    }

    if (hotelIDs) return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-xl font-semibold">Your Matches</h1>
            <div className="flex flex-col gap-4">
                {hotelIDs.map((hotelID, index) => (
                    <HotelCard data={hotelData[hotelID]} key={index} />
                ))}
            </div>
            <div className="flex flex-col gap-4">
                <button className={btnStyle}>Share</button>
                <button className={btnStyle} onClick={() => setRestart(true)}>Restart</button>
            </div>

        </div>

    );

    return <></>;
}