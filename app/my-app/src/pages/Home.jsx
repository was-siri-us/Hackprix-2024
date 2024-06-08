import logo from '../assets/logoipsum.svg';
import '../App.css'
import { Button } from '@/components/ui/button';
import { GithubIcon } from 'lucide-react';

const HeaderLogo = () => {
    return (
        <div className="items-center hidden lg:flex mt-5 mx-4">
            <img src={logo} alt="Logo" className="size-8" />
            <span className="text-white text-2xl ml-2.5 font-bold">PrashnManch</span>
        </div>
    )
}


const Home = () => {
    return (
        <>
            <div id="HomePage">
                <div id="bg">
                    <div id="gif">
                    </div>
                    <div id="black-blur">
                    </div>
                </div>
                <div id="landingPageRoot">
                    <div id="landingPageContainer">
                        <HeaderLogo />
                        <div id="hero">
                            PrashnManch
                        </div>
                        <div className="navButtons">
                            <Button className="bg-black/60 font-semibold text-lg border-1  border-white needBorder" variant="outline">Dashboard</Button>
                            <Button className="bg-transparent text-white font-semibold text-xl flex gap-2" variant="outline">
                            <GithubIcon />
                                Github
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Home;