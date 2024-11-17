import { Navbar } from "../components/Navbar"
import { useLocation } from "react-router-dom";
import FlyoutMenu from "../components/FlyoutMenu";
import { Menu } from "../components/Menu";
import { useState } from "react";
type backgroundType = "light" | "dark";

type HomeProps = {
    background: backgroundType;
    setBackground: (value: backgroundType | ((prev: backgroundType) => backgroundType)) => void;
};
export const Wallet = ({background, setBackground} : HomeProps) => {
    const[mnemonic,setMnemonic] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const pathType = location.state?.pathType
    return (
        <div>
            <Navbar  background = {background} setBackground = {setBackground}></Navbar>
            <div className="relative flex justify-center"><FlyoutMenu background = {background} isOpen={isOpen} setIsOpen={setIsOpen} pathType={pathType} mnemonic={mnemonic} setMnemonic={setMnemonic}/></div>
            <div className={`absolute lex justify-between p-20 items-start  w-full h-24 ${isOpen ? "bottom-32 " : "top-48 "}`}> <Menu pathType={pathType}  background = {background} mnemonic={mnemonic}/>
             
            </div>
        </div>
    )
}