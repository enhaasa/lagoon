// Pages
import Home from "@pages/Home/Home";
import Menu from "@pages/Menu/Menu";
import Services from "@pages/Services/Services";
import TheVenue from "@pages/TheVenue/TheVenue";
import Bookings from "@pages/Bookings/Bookings";

export type NavItem = {
    name: string;
    target: string;
    component: JSX.Element;
    isNewTab?: boolean;
    isActive?: boolean;
}

const navbar: NavItem[] = [
    {
        name: 'Home',
        target: '/',
        component: <Home />
    },
    {
        name: 'Venue',
        target: '/venue',
        component: <TheVenue />
    },
    {
        name: 'Services',
        target: '/services',
        component: <Services />
    },
    {
        name: 'Bookings',
        target: '/bookings',
        component: <Bookings />
    },
    {
        name: 'Menu',
        target: '/menu',
        component: <Menu />
    },
]

export default navbar;