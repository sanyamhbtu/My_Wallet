import { Trash2 } from 'lucide-react';
import { LockKeyholeOpen } from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Toaster, toast } from 'sonner'
import { EyeOff } from 'lucide-react';
import { useState } from 'react';
type cardType = {
    background : string;
    publicKey : string;
    privateKey : string;
    currentIndex : number;
    handleDeletion: (publicKeyToDelete: string) => void;
}
export const Card = ({background, publicKey, privateKey, currentIndex, handleDeletion} : cardType) =>{
    const [isVisible , setIsVisible] = useState(false)
    const handleEye = () => {
        setIsVisible(!isVisible);
    }
    const copyToClipboard = (content: string) => {
        navigator.clipboard.writeText(content);
       
        toast.success("Copied to clipboard!");
      };
      const handleDeletionCard = () => {
        handleDeletion(publicKey);
        toast.success("Wallet deleted successfully!");
    };
    return (
        <div className={`h-64 md:h-72 lg:h-80 rounded-lg border p-4 flex flex-col justify-around m-3`}>
                <div className='flex justify-between'>
                    <h1 className={`text-lg sm:text-xl md:text-2xl font-bold ${background === "light" ? "text-black" : "text-white"}`}>Wallet {currentIndex}</h1>
                    <button onClick={handleDeletionCard}> <Trash2 className='text-red-600 cursor-pointer'/> </button>
                </div>
                <div className={` h-4/5 rounded-xl p-1  ${background === "light" ? "bg-slate-100" : "bg-slate-900"} `}>
                    <div className='pl-5 pt-1 '>
                            <label htmlFor="input-group-1" className={`block mb-2 text-xs sm:text-sm font-medium  ${background === "light" ? "text-gray-900" : "text-white"}`}>Public Key</label>
                            <div className="relative mb-4 md:mb-6">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <LockKeyholeOpen className={`mr-2 w-4 sm:w-5 `}/>
                                </div>
                                <Toaster />
                                <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => {copyToClipboard(publicKey)}} id="input-group-1" className="readOnly font-bold w-full md:w-5/6 h-8 bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  > {publicKey}</p>
                            </div>
                    </div>
                    <div className='pl-3 sm:pl-5'>
                    <label htmlFor="input-group-2" className={`block mb-2 text-xs sm:text-sm font-medium  ${background === "light" ? "text-gray-900" : "text-white"}`}>Private Key</label>
                            <div className="relative mb-4 md:mb-6">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <LockKeyhole className={`mr-2 w-4 sm:w-5 `}/>
                                </div>
                                <Toaster />
                                <div className='flex justify-between items-center '>
                                    
                                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => {copyToClipboard(publicKey)}} id="input-group-2" className="readOnly font-bold w-full md:w-5/6 h-8 bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " >{isVisible ? `${privateKey}` : "******************************************"}</p>
                                    <button onClick={handleEye} className='absolute inset-y-0 end-0 flex items-center pe-2'> {isVisible ? <EyeOff className={` w-4 sm:w-5 cursor-pointer ${background === "light" ? "text-black" : "text-black  md:text-white"}`} /> : <Eye className={`w-4 sm:w-5 cursor-pointer ${background === "light" ? "text-black" : "text-black  md:text-white"}`} />} </button>
                                </div>
                            </div>
                            
                    </div>
                </div>
        </div>
    )
}