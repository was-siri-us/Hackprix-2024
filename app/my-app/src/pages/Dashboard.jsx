import { UserButton } from "@clerk/clerk-react";


const Dashboard = () => {
    return ( 
        <div>
            <h1>Dashboard</h1>
            <div>
                <UserButton />
            </div>
        </div>
     );
}
 
export default Dashboard;