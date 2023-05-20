"use client";
import { Hotel, HotelID, getInitialHotelIds, hotelData } from "@/data";
import { HotelCard } from "./hotel-card";
import { useEffect, useState } from "react";

export default function SwipeView()
{
    const [hotelIDs, setHotelIDs] = useState<null|HotelID[]>(null);

    useEffect(() => {
        getInitialHotelIds().then(res => {
            setHotelIDs(res);
        });
    }, []);
    
    return (
        <div className="p-4 flex flex-col gap-4">
            {hotelIDs ? hotelIDs.map((hotelID, index) => (
                <HotelCard key={index} data={hotelData[hotelID]} />
            )) : ''}
        </div>
    )
}