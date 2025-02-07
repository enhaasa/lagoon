// Components
import Location from '../Location';

// Config
import location from '@config/location';

interface ILagoonLocation {
    isCentered?: boolean;
}

export default function LagoonLocation({ isCentered }: ILagoonLocation) {

    return (
        <Location
            server={location.server}
            area={location.area}
            ward={location.ward}
            plot={location.plot}
            closestAetheryte={location.closestAetheryte}
            isCentered={isCentered}
        />    
    );
}
