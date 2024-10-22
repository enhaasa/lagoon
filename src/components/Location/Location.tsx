import styles from './Location.module.scss';

// Components
import Title from '@components/Title/Title';
import Icon from '@components/Icon/Icon';
import Text from '@components/Text/Text';

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
    closestAetheryte?: string;
}

export default function Location({
    server,
    area,
    ward,
    plot,
    closestAetheryte
}: ILocation) {

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <span className={styles.column}>
                    <span className={styles.server}>
                        <Text>{ server }</Text>
                    </span>
                </span>
            </div>

            <div className={styles.items}>
                <div className={styles.row}>
                    <span className={styles.column}>
                        <Title headline={area} />
                    </span>
                </div>

                <div className={styles.row}>
                    <span className={styles.column}>
                        <Icon icon={icon.ward} />
                        <Text>Ward:</Text>
                    </span>

                    <span className={styles.column}>
                        <Text>{ ward }</Text>
                    </span>
                </div>

                <div className={styles.row}>
                    <span className={styles.column}>
                        <Icon icon={icon.plot} />
                        <Text>Plot:</Text>
                    </span>

                    <span className={styles.column}>
                        <Text>{ plot }</Text>
                    </span>
                </div>
                
                {closestAetheryte &&
                    <div className={styles.row}>
                        <span className={styles.column}>
                            <Icon icon={icon.aetheryte} />
                            <Text>Aetheryte</Text>
                        </span>
                        
                        <span className={styles.column}>
                            <span className={styles.aetheryte}>
                                <Text>"{ closestAetheryte }"</Text>
                            </span>
                        </span>
                    </div>
                }
            </div>
        </div>    
    );
}