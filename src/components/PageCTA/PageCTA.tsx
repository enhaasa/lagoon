import styles from './PageCTA.module.scss';
import { useContext } from 'react';

// Contexts
import { PageContext } from '@contexts/Page';

// Components
import Title from '@components/Title/Title';
import Text from '@components/Text/Text';
import Button from '@components/Button/Button';

interface IPageCTA {
    title: string;
    description: string;
    button: {
        target: string;
        text: string;
    }
}

export default function PageCTA({ title, description, button }: IPageCTA) {
    
    const { navigator } = useContext(PageContext);

    function handleClick() {
        if (!navigator) return;

        navigator.internalNavigate(button.target);
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <Title 
                    headline={title} 
                    isCentered={true}
                />
            </div>
     
            <nav className={styles.nav}>
                <div className={styles.message}>
                    <Text>{description}</Text>
                </div>
                <Button onClick={handleClick} name={button.text} />
            </nav>
        </div>    
    );
}
