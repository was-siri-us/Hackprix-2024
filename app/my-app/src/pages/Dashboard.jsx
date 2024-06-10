import { UserButton } from "@clerk/clerk-react";
import logo from '../assets/logoipsum.svg';
import Navigation from "@/components/Navigation";


const HeaderLogo = () => {
    return (
        <div className="items-center hidden lg:flex">
            <img src={logo} alt="Logo" className="size-8" />
            <span className="text-white text-2xl ml-2.5 font-bold">PrashnManch</span>
        </div>
    )
}

const Dashboard = () => {
    return (
        <div className="bg-black/90 px-4 py-3 flex items-center justify-between">




            <div className="flex items-center lg:gap-12">
                <HeaderLogo />
                <Navigation />
            </div>

            <div>
                <UserButton />
            </div>
        </div>
    );
}

export default Dashboard;