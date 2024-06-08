
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import NavButton from "@/components/NavButton";
import { Menu } from "lucide-react";



const routes = [
    {
        href: '/prepare',
        label: 'Prepare'
    },
    {
        href: '/archive',
        label: 'Archive'
    }
]

const Navigation = () => {
    const pathname = useLocation().pathname;
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1024px)');
        
        const handleResize = () => {
          setIsMobile(mediaQuery.matches);
        };
    
        mediaQuery.addEventListener('change', handleResize);
    
        return () => {
          mediaQuery.removeEventListener('change', handleResize);
        };
      }, []);


    const onClick = (href) => {
        navigate(href);
        setIsOpen(false);
    }


    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger  >
                    <Button variant="outline" size={"sm"} className="font-normal bg-white/0 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition">
                        <Menu className="size-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side={"left"} className="px-2">
                    <nav className="flex flex-col gay-y-2 pt-6">
                        {routes.map((route) => (
                            <Button
                                variant={route.href === pathname ? "secondary" : "ghost"}
                                key={route.href}
                                onClick={() => { onClick(route.href) }}
                                className="w-full justify-start"
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }


    return (
        <>
            <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">

                {routes.map((route) => (
                    <NavButton
                        key={route.href}
                        href={route.href}
                        label={route.label}
                        isActive={pathname === route.href}
                    />
                ))}
            </nav>
        </>
    );
}

export default Navigation;