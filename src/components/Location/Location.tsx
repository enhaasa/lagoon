import styles from './Location.module.scss';

// Components
import Title from '@components/Title/Title';
import Icon from '@components/Icon/Icon';

// Icons
import icon from '@utils/icon';

type Area = 
    'The Lavender Beds' |
    'Mist' |
    'The Goblet' |
    'Shirogane' |
    'Empyreum';

interface ILocation {
    server: string;
    area: Area;
    ward: number;
    plot: number;
}

export default function Location({
    server,
    area,
    ward,
    plot
}: ILocation) {

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <span className={styles.column}>
                    <span className={styles.server}>
                        { server }
                    </span>
                </span>
            </div>

            <div className={styles.row}>
                <span className={styles.column}>
                    <Title headline={area} />
                </span>
            </div>

            <div className={styles.row}>
                <span className={styles.column}>
                    <Icon icon={icon.ward} />
                    Ward:
                </span>

                <span className={styles.column}>
                    { ward }
                </span>
            </div>

            <div className={styles.row}>
                <span className={styles.column}>
                    <Icon icon={icon.plot} />
                    Plot:
                </span>

                <span className={styles.column}>
                    { plot }
                </span>
            </div>
        </div>    
    );
}
