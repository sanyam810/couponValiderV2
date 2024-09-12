import { TronCanvas } from "./canvas";

const Quote = () => {
    return (
        <div className="bg-slate-200 h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="max-w-lg">
                    <div className="text-3xl font-bold">
                        "I will fetch coupons for you and will let you validate coupons, ensuring that users can use them confidently without issues."
                    </div>
                    {/* <div className="max-w-md text-2xl font-semibold mt-4">
                        Lorem Ipsum
                    </div>
                    <div className="max-w-md text-sm font-semibold text-slate-400">
                            XYZ | Area 51
                    </div>  */}
                </div>
                
            </div>  
            <div className="pt-10">
                <TronCanvas />    
            </div>   
            
        </div>
    );
}
 
export default Quote;