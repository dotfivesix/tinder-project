import { Hotel } from "@/data";

export function HotelCard
({ data }: {data : Hotel }) {

    const {image, name, location, type, description, duration, price} = data;

    return (
        <article className="bg-white border border-gray-300">
            <div className="w-full h-48 relative">
                <div className={`absolute w-full h-full bg-center bg-cover`} style={{ backgroundImage: `url(${image})`}}></div>
                <div className="absolute top-2 left-2 bg-gray-800 text-neutral-200 text-xs px-1 py-[2px]">{type}</div>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <div className="text-xs flex-col">
                    <h4>{location}</h4>
                    <h2 className="font-semibold">{name}</h2>
                </div>
                <p className="text-sm">{description}</p>
                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <h3 className="text-xs text-gray-500">{duration} from</h3>
                        <p className="flex gap-[2px] items-center">
                            <span className="text-gray-800 font-bold text-base">A${price}</span>
                            <span className="text-xs text-gray-500">/room</span>
                        </p>
                        <h6 className="text-gray-500 text-xs">Includes taxes & fees</h6>
                    </div>
                    <button className="text-xs bg-gray-800 text-neutral-200 p-2 h-min hover:bg-gray-700">View Offer</button>
                </div>
            </div>
            
        </article>
    )
}