/* eslint-disable @typescript-eslint/no-explicit-any */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

// Components
import ContentModal from '@components/Modal/ContentModal';
import Text from '@components/Text/Text';

interface IInfoCardModal {
    id?: number;
    title: string;
    description?: Document;
    background?: string;
}

export default function InfoCardModal({ id, title, description, background }: IInfoCardModal) {

    return (
        <ContentModal
            id={id}
            headline={title}
            background={background}
        >
            {description &&
                <Text>
                    {documentToReactComponents(description)}
                </Text>
            }
        </ContentModal>
    );
}
