export const Footer = ({background} : any) =>{
    return (
        <div>
            <hr className="w-full"/>
            <h1 className={`text-xl sm:text-2xl mt-6 sm:ml-4 md:ml-10  font-bold ${background === "light" ? "text-black" : "text-white"}`}>Designed by Sanyam Jain</h1>
        </div>
    )
}