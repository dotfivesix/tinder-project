"use client";
import { HotelID, getInitialHotelIds, hotelData } from "@/data";
import { HotelCard } from "./hotel-card";
import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card';
import { AiOutlineCheck, AiOutlineUndo, AiOutlineClose } from "react-icons/ai";

const db = [
    {
        name: 'Richard Hendricks',
        url: './img/richard.jpg'
    },
    {
        name: 'Erlich Bachman',
        url: './img/erlich.jpg'
    },
    {
        name: 'Monica Hall',
        url: './img/monica.jpg'
    },
    {
        name: 'Jared Dunn',
        url: './img/jared.jpg'
    },
    {
        name: 'Dinesh Chugtai',
        url: './img/dinesh.jpg'
    }
];

function SwipeView({ hotelIDs }:{hotelIDs : string[]} ) {

    const [currentIndex, setCurrentIndex] = useState(hotelIDs.length - 1)
    const [lastDirection, setLastDirection] = useState()

    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
        () =>
            Array(hotelIDs.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val: any) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < hotelIDs.length - 1

    const canSwipe = currentIndex >= 0

    const swiped = (direction: any, nameToDelete: any, index: any) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name: any, idx: any) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        // @ts-ignore
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
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

    return (
        <div>
            <div className='relative'>
                {hotelIDs.map((hotelID, index) => {
                    return (
                        <TinderCard
                            // @ts-ignore
                            ref={childRefs[index]}
                            className='swipe absolute'
                            key={hotelID}
                            onSwipe={(dir) => swiped(dir, hotelID, index)}
                            onCardLeftScreen={() => outOfFrame(hotelID, index)}
                        >
                            <HotelCard data={hotelData[hotelID]} />
                        </TinderCard>
                    )
                })}
            </div>
            <div className='absolute bottom-0 p-4'>
                <button onClick={() => goBack()}>
                    <AiOutlineUndo />
                </button>
                <button onClick={() => swipe('left')}>
                    <AiOutlineClose />
                </button>
                <button onClick={() => swipe('right')}>
                    <AiOutlineCheck />
                </button>
            </div>

        </div>
    )

}

export default function SwipeViewContainer()
{
    const [hotelIDs, setHotelIDs] = useState<null|string[]>(null);

    useEffect(() => {
        getInitialHotelIds().then(res => {
            setHotelIDs(res);
        });
    }, []);

    if (hotelIDs) return <SwipeView {...{hotelIDs}} />;
    else return <></>;
}