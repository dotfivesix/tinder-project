import { useEffect } from "react";
"use client";
import Header from "./components/header";
import SwipeViewContainer from "./components/swipe-view";
import { useSearchParams } from "next/navigation";
import { hotelData } from "@/data";
import Home from "./components/Home";

export default function Index() {

  const searchParams = useSearchParams();
 
  const name = searchParams.get('name');
  const left = searchParams.get('left');
  const right = searchParams.get('right');

  const validate = (arr:string[]) => {
    const newArr = [];
    arr.forEach(id => {
      if (id in hotelData) newArr.push(id);
    });
    if (newArr.length === arr.length) return true;
    else return false;
  }

  if (name && left && right)
  {
    const leftSlided = left.split(' ');
    const rightSlided = right.split(' ');

    if (validate(leftSlided) && validate(rightSlided))
    {
      return <Home {...{query:{name, left:leftSlided, right:rightSlided}}} />
    }
    else return <h1 className="absolute flex justify-center h-screen w-full items-center text-xl">Invalid Query !</h1>
  }
  else return <Home query={null} />
}
