import { useEffect, useState } from "react";
import { generateMnemonic } from "bip39";
import { Toaster, toast } from 'sonner'
import { mnemonicToSeed } from "bip39";
import { Copy } from 'lucide-react';
type FlyoutMenuType = {
  background : "light" | "dark";
  isOpen : boolean;
  setIsOpen : ( value : boolean) => void;
  pathType : string;
  mnemonic : string;
  setMnemonic : (value : string) => void
}
const FlyoutMenu =  ({background, isOpen , setIsOpen, pathType,mnemonic,setMnemonic} : FlyoutMenuType) => {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
const [seed,setSeed] = useState("")
  useEffect(() => {
    const initializeMnemonicAndSeed = async () => {
      const mn = generateMnemonic();
      setMnemonic(mn);
      const s = await mnemonicToSeed(mn);
      setSeed(s.toString('hex'));
    };
  
    initializeMnemonicAndSeed();
  },[pathType])
  console.log("seed" ,seed)
 const copyToClipboard = (content:string) =>{
    navigator.clipboard.writeText(content)
    toast.success("Copied to clipboard!")
 }
  return (
    <div className="w-full flex justify-center ">
      <button
        type="button"
        className="border inline-flex justify-between h-16 items-center gap-x-1 text-sm font-semibold text-gray-900 w-4/ sm:w-full md:w-4/5 "
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        
        <span className={`text-3xl p-5 font-bold  ${background === "light" ? "text-black" : "text-white"} `}>Your Secret Phrase</span>
        <svg className={`size-5 m-5 ${background === "light" ? "text-black" : "text-white"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    <Toaster />
      {isOpen && (
        <div className="absolute left-1/2 z-10 mt-24 flex w-screen max-w-max -translate-x-1/2 px-4 cursor-pointer p-5">
          <div onClick={() => {copyToClipboard(seed)}} className={`w-screen h-72 max-w-6xl max-h-sm flex-auto overflow-hidden rounded-3xl ${background === "light" ? "bg-white" : "bg-black"}  text-sm shadow-lg ring-1 ring-gray-900/5`}>
          <div className="grid grid-cols-12 gap-4 p-4">
            {mnemonic.split(" ").map((word,index) => (
              <div key={index} className={`col-span-3 h-14 w-full p-1 flex items-center justify-center rounded-lg  text-xl font-bold  ${background === "light" ? "text-black bg-slate-100 hover:bg-slate-200" : "text-white bg-slate-900 hover:bg-slate-800"}`}>{word}</div>
            ))}
          </div>
          <div>
            <h3 className={`${background === "light" ? "text-black" : "text-white"} text-md font-bold p-5 flex items-center gap-2`}>
                <Copy />
                Click anywhere to copy
                </h3>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlyoutMenu;
