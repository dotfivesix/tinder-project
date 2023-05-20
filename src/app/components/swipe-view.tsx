"use client";
import { Hotel, HotelID, getInitialHotelIds, hotelData } from "@/data";
import { HotelCard } from "./hotel-card";
import { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card'

// ...

const onSwipe = (direction:string) => {
  console.log('You swiped: ' + direction)
}

const onCardLeftScreen = (myIdentifier:string) => {
  console.log(myIdentifier + ' left the screen')
}

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
            <div className="relative">
                {hotelIDs ? hotelIDs.map((hotelID, index) => (
                    <TinderCard key={index} className={`custom-tinder-card absolute top-0 left-0`} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']}>
                        <HotelCard data={hotelData[hotelID]} />
                    </TinderCard>
                )) : ''}
            </div>
        </div>
    )
}