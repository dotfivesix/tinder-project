"use client";
import { getInitialHotelIds, hotelData } from "@/data";
import { HotelCard } from "./hotel-card";
import React, { useState, useMemo, useRef, useLayoutEffect, useEffect } from 'react'
import TinderCard from 'react-tinder-card';
import { AiOutlineCheck, AiOutlineUndo, AiOutlineClose } from "react-icons/ai";
import { swipes } from "@/data";

function SwipeView({ hotelIDs }:{hotelIDs : string[]} ) {

    const [currentIndex, setCurrentIndex] = useState(hotelIDs.length - 1)
    const [lastDirection, setLastDirection] = useState()

    const currentIndexRef = useRef(currentIndex);

    const childRefs = useMemo(
        () =>
            Array(hotelIDs.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    );

    const updateCurrentIndex = (val: any) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    };

    const canGoBack = currentIndex < hotelIDs.length - 1;

    const canSwipe = currentIndex >= 0;

    const swiped = (direction: any, id: any, index: any) => {
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
        console.log("Swiped !", direction, id, index);
        if (!swipes.filter(swipe => swipe.id === id).length) swipes.push({ direction, id });
        console.log(swipes);
    }

    const outOfFrame = (name: any, idx: any) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        // @ts-ignore
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    }

    const swipe = async (dir: any) => {
        if (canSwipe && currentIndex < hotelIDs.length) {
            // @ts-ignore
            await childRefs[currentIndex].current.swipe(dir);
        }
    }

    const goBack = async () => {
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        // @ts-ignore
        await childRefs[newIndex].current.restoreCard()
    }

    const btnStyle = 'w-10 h-10 border-black border rounded-full flex justify-center items-center text-xl bg-white';

    return (
        <div className="p-4 w-full overflow-x-clip">
            <div className='relative'>
                {hotelIDs.map((hotelID, index) => {
                    return (
                        <TinderCard
                            // @ts-ignore
                            ref={childRefs[index]}
                            className='absolute'
                            key={hotelID}
                            onSwipe={(dir) => swiped(dir, hotelID, index)}
                            onCardLeftScreen={() => outOfFrame(hotelID, index)}
                        >
                            <HotelCard data={hotelData[hotelID]} />
                        </TinderCard>
                    )
                })}
            </div>
            <div className='absolute left-0 bottom-4 w-full flex justify-center gap-4'>
                <button className={btnStyle} onClick={() => goBack()}>
                    <AiOutlineUndo />
                </button>
                <button className={btnStyle} onClick={() => swipe('left')}>
                    <AiOutlineClose />
                </button>
                <button className={btnStyle} onClick={() => swipe('right')}>
                    <AiOutlineCheck />
                </button>
            </div>

        </div>
    )

}

export default function SwipeViewContainer()
{
    const [hotelIDs, setHotelIDs] = useState<null|string[]>(null);

    useLayoutEffect(() => {
        getInitialHotelIds().then(res => {
            setHotelIDs(res);
        });
    }, []);

    if (hotelIDs) return <SwipeView {...{hotelIDs}} />;
    else return <></>;
}