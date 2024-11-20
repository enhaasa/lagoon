import styles from './Menu.module.scss';
import { useContext } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import MenuList from '@components/MenuList/MenuList';
import Title from '@components/Title/Title';
import Separator from '@components/Separator/Separator';

export default function Menu() {
    const { menu } = useContext(CMSContext);

    return (
        <Page>
            <div className={styles.container}>
                <div className={styles.teaser}>
                    <Title 
                        size='xl'
                        isCentered={true}
                        headline={menu?.content?.headline}
                        subline={menu?.content?.subline}
                    />
                </div>

                <Separator />

                <MenuList />
            </div>
        </Page>    
    );
}
