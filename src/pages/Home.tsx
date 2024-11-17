import { Navbar } from "../components/Navbar"
import { Display } from "../components/Display";
import { Footer } from "../components/Footer";
type backgroundType = "light" | "dark";

type HomeProps = {
    background: backgroundType;
    setBackground: (value: backgroundType | ((prev: backgroundType) => backgroundType)) => void;
};
export const Home = ({background, setBackground} : HomeProps) =>{
    return (
        <div className="flex flex-col gap-24">
        <Navbar background = {background} setBackground = {setBackground}></Navbar>
        <Display background = {background} />
        <div className="absolute bottom-10 w-full"> <Footer background = {background} />  </div>
        
        </div>

    )
}