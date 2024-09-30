export type NavItem = {
    name: string;
    target: string;
    isNewTab?: boolean;
}

const navbar: NavItem[] = [
    {
        name: 'Home',
        target: '/'
    },
    {
        name: 'Menu',
        target: 'menu'
    },
    {
        name: 'Services',
        target: 'services'
    }
]

export default navbar;