/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Event.module.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Components
import EventResult from './EventResult/EventResult';
import NoResult from './NoResult/NoResult';
import ResultLoading from './ResultLoading/ResultLoading';
import Page from '@components/Page/Page';

// Clients
import { ContentfulClient } from '@service_clients/ContentfulClient';

const client = new ContentfulClient();

export default function Event() {
    const { slug } = useParams();

    const [ assets, setAssets ] = useState(null);
    const [ content, setContent ] = useState(null);
    const [ noresult, setNoresult ] = useState(false);

    useEffect(() => {
        if (!slug) return;
        setContent(null);
        setAssets(null);
        setNoresult(false);

        const params = {
            "content_type": "event",
            "fields.slug": slug
        }

        client.getEntries(JSON.stringify(params)).then(result => {
            if (result.items.length === 0) {
                setNoresult(true);
                return;
            }

            const newAssets: any = {};

            result.includes.Asset.forEach((asset: any) => (
                newAssets[asset.sys.id] = { 
                    ...asset.fields, 
                    file: { ...asset.fields.file, url: `https:${asset.fields.file.url}` } 
                }
            ));

            setContent({ id: result.items[0].sys.id, ...result.items[0].fields });
            setAssets(newAssets);
        });
    }, [ slug ]);

    return (
        <Page>
            <div className={styles.container}>
                {
                    content && !noresult 
                    ? <EventResult content={content} assets={assets} />
                    : !noresult 
                    ? <ResultLoading />
                    : <NoResult />
                }
            </div>    
        </Page>
    );    
}

/*
function _isSlugValid(slug?: string) {
    return !(navbar.map(i => i.target).includes(`/${slug}`));
}
*/