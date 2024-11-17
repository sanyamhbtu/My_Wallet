
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import { Box } from 'lucide-react';
type backgroundType = "light" | "dark";

type HomeProps = {
    background: backgroundType;
    setBackground: (value: backgroundType | ((prev: backgroundType) => backgroundType)) => void;
};
export const Navbar = ({background , setBackground} : HomeProps) => {
    const handleToggle = () =>{
        setBackground((prev) => (prev === "light" ? "dark" : "light"));
    }
    return (
        <nav className="flex mx-6 md:mx-10 py-4 md:py-5 justify-between">
            <div className="flex items-center gap-2">
                {background === "light" ? <Box className="text-black w-14 sm:w-12 md:w-12" /> : <Box className="text-white w-10 sm:w-12 md:w-12"/>}
                <h1 className={`text-lg sm:text-2xl font-bold ${background === "light" ? "text-black" : "text-white"}`}>Sanyam Jain</h1>
                <button className={`text-sm sm:text-xl font-semibold px-2 py-1 ${background === "light" ? "text-black" : "text-white"} bg-slate-400 rounded-2xl disabled cursor-default`}>v1.0</button>
            </div>
            <div className="flex items-center gap-2">
            <Sun className={` ${background === "light" ? "text-black " : "text-gray-500"}`} />
                <label className="inline-flex items-center  cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onChange={handleToggle}/>
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-black after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
                </label>
                <Moon className={` ${background === "light" ? "text-gray-500 " : "text-white "}`} />
            </div>
        </nav>
    )
}