import logo from "@/public/luxury-escapes.svg";
import Image from "next/image";

export default function Header()
{
    return (
        <header className="w-full p-4 bg-white border-b">
            <Image src={logo} alt="Luxury Escapes Logo" />
        </header>
    )
}