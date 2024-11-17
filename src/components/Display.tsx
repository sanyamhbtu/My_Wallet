import { useNavigate } from "react-router-dom"
import { useState } from "react";
export const Display = ({background} : any) =>{
    const navigate = useNavigate();
    const [pathType,setPathType] = useState("");
    const handleButton = async (type : string) =>{
        setPathType(type)
        navigate("/wallet",{state : {pathType : type }});
    }
    return (
        <div className="flex flex-col sm:ml-4 md:ml-10 gap-5">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${background === "light" ? "text-black" : "text-white"}` }>Sanyam supports multiple blockchains</h1>
            <h5 className={`text-xl sm:text-2xl font-bold ${background === "light" ? "text-black" : "text-white" }`}>Choose a blockchain to get started</h5>
            <div className="flex gap-3 sm:gap-2 flex-wrap">
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 h-10 w-28 " onClick={() => handleButton("501")}>Solana</button>
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 h-10 w-28 " onClick={() => handleButton("60")}>Ethereum</button>
            </div>
        </div>
    )
}