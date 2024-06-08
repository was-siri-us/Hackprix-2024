import { SignInButton } from "@clerk/clerk-react";


const Home = () => {
    return (
        <>
            Home
            <br />
            
                <SignInButton className="bg-blue-500 px-4 rounded-lg ml-2 py-2" forceRedirectUrl="/dashboard">
                    Sign in
                </SignInButton>
            
        </>
    );
}

export default Home;