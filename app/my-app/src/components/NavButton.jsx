import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PropTypes from 'prop-types';


// type Props = {
//     href:string;
//     label:string;
//     isActive:boolean;

// }



const Navbutton = ({href,label,isActive}) => {
    return ( 
        <>
            <Button asChild size="sm" variant="outline" className={cn(
                "w-full lg:auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
                isActive ? "bg-white/10 text-white" : "bg-transparent",
            )}>
                <Link to={href}>
                    {label}
                </Link>
            </Button>
        </>
     );
}

Navbutton.propTypes = {
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  };
 
export default Navbutton;