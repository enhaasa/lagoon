import styles from './Menu.module.scss';
import { useContext } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import MenuList from '@components/MenuList/MenuList';
import Title from '@components/Title/Title';

export default function Menu() {
    const cmsMenu = useContext(CMSContext).menu;
    
    return (
        <>
            <Page>
                <div className={styles.container}>

                    <div className={styles.teaser}>
                        <Title 
                            style='handwritten'
                            size='xl'
                            isCentered={true}
                            headline={cmsMenu?.content?.headline}
                            subline={cmsMenu?.content?.subline}
                        />
                    </div>

                    <MenuList 

                    />
                </div>
            </Page>   
        </> 
    );
}
