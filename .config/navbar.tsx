// Pages
import Home from "@pages/Home/Home";
import Menu from "@pages/Menu/Menu";
import Services from "@pages/Services/Services";

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
        name: 'Menu',
        target: '/menu',
        component: <Menu />
    },
    {
        name: 'Services',
        target: '/services',
        component: <Services />
    },
]

export default navbar;