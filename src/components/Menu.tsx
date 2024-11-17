
import { useState } from 'react';
import { Card } from './Card';
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl"
import { Wallet, HDNodeWallet } from "ethers";
import { PublicKey } from "@solana/web3.js";
import { toast, Toaster } from 'sonner';
type menuType = {
    pathType : string;
    background : string;
    mnemonic : string
}
export const Menu = ({pathType,background,mnemonic} : menuType) => {
    const [currentIndex,setCurrentIndex] = useState(0);
    const[wallet,setWallet] = useState<{ publicKey: string; privateKey: string }[]>([]);
    
    const handleAddWallet = async  () => {
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/${pathType}'/${currentIndex}'/0'`;
        if(pathType === "501"){
            const derivedSeed = derivePath(path,seed.toString()).key;
            const { publicKey, secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
            const publicKeyStr = new PublicKey(publicKey).toBase58();
            setWallet((prevWallet) => [
                ...prevWallet,
                { publicKey: publicKeyStr, privateKey: Buffer.from(secretKey).toString('hex') },
            ]);
            setCurrentIndex(currentIndex + 1);
        }else{
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(path);
            const privateKey = child.privateKey;
            const wallet = new Wallet(privateKey);
            setWallet((prevWallet) => [
                ...prevWallet,
                { publicKey: wallet.address, privateKey },
            ]);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
        toast.success("Wallet added successfully!")
    }
    const handleClearWallets = () => {
        if(wallet.length !==0){
            setWallet([]);
            toast.success("All wallets clear successfully")
        }else{
            toast.error("No wallet found")
        }
        

            
    }
    const handleDeletion = (publicKeyToDelete: string) => {
        setWallet((prevWallet) => prevWallet.filter((wallet) => wallet.publicKey !== publicKeyToDelete));
    };
    return (
        <div className='flex flex-col gap-5'>
        <div className={`flex justify-between items-center`}>
            <h1 className={`text-5xl md:text-4xl sm:text-3xl font-extrabold ${background === "light" ? "text-black" : "text-white"}`}>{pathType === "60" ? "Ethereum" : "Solana"}</h1>
            <div className='gap-2 flex justify-center items-center sm:flex-col md:flex-row sm:gap-4'>
                
                <Toaster />
                <button type="button" className="text-gray-900 ml-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 sm:text-xs sm:px-3 sm:py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleAddWallet}>Add Wallet</button>
                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:text-xs sm:px-3 sm:py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleClearWallets}>Clear Wallets</button>
            </div>
            
        </div>
        <div className=' '>{
            wallet.map((wallet,index) => (
                <Card handleDeletion={handleDeletion} background={background} privateKey={wallet.privateKey} publicKey={wallet.publicKey} currentIndex={index +1} />
            ))
            }</div>
        </div>
    )
}