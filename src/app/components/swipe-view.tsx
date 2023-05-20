"use client";
import { getInitialHotelIds, getNextHotelIds, hotelData } from "@/data";
import { HotelCard } from "./hotel-card";
import React, { useState, useMemo, useRef, useLayoutEffect, useEffect } from 'react'
import { AiOutlineCheck, AiOutlineUndo, AiOutlineClose } from "react-icons/ai";
import { swipes } from "@/data";
import TinderCard from "../modules/react-tinder";
import MatchesView from "./matches-view";
import { Query } from "../types";

function SwipeView({ data, currentIndex, setCurrentIndex, query }:{data : string[], currentIndex:number, setCurrentIndex:any, query:Query} ) {

    const [hotelIDs, setHotelIDs] = useState(data);
    const [lastDirection, setLastDirection] = useState();

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
        swipes.push({ direction, id });
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

    useEffect(() => {
        if (typeof currentIndex === 'number' && swipes.length % hotelIDs.length === 0) getNextHotelIds(swipes, hotelIDs).then(nextIDs => {
            setHotelIDs(nextIDs);
            setCurrentIndex(nextIDs.length - 1);
        });
    }, [currentIndex]);

    if (swipes.length >= 6 && swipes.filter(swipe => swipe.direction === 'right').length >= 2) return (
        <MatchesView {...{query}} />
    );

    return (
        <div className="p-4 w-full overflow-x-clip">
            <div className='relative'>
                {hotelIDs.map((hotelID, index) => {
                    return (
                        // @ts-ignore
                        <TinderCard
                            // @ts-ignore
                            ref={childRefs[index]}
                            className='absolute'
                            key={hotelID}
                            onSwipe={(dir:any) => swiped(dir, hotelID, index)}
                            onCardLeftScreen={() => outOfFrame(hotelID, index)}
                            height={innerHeight}
                            width={innerWidth}
                        >
                            <HotelCard data={hotelData[hotelID]} />
                        </TinderCard>
                    )
                })}
            </div>
            <div className="absolute left-0 bottom-4 w-full flex flex-col items-center gap-4">
                {query ? <span className="font-medium">Matching with {query.name}</span> : ''}
                <div className='flex justify-center gap-4'>
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
        </div>
    )

}

export default function SwipeViewContainer({ query }:{ query:Query })
{
    const [hotelIDs, setHotelIDs] = useState<null|string[]>(null);
    const [currentIndex, setCurrentIndex] = useState<number|null>(null);
    useEffect(() => {
        getInitialHotelIds().then(initialIDs => {
            setHotelIDs(initialIDs);
            setCurrentIndex(initialIDs.length - 1);
        });
    }, []);

    if (hotelIDs && (typeof currentIndex === 'number')) return <SwipeView {...{data:hotelIDs, currentIndex, setCurrentIndex, query}} />;
    else return <></>;
}