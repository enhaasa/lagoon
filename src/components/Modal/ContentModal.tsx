// Components
import Modal from "./Modal";

export interface IContentModal {
    id?: number;
    headline: string;
    message?: string;
    closable?: boolean;
    children?: React.ReactNode;
    background?: string;
}

export default function ContentModal({ id, headline, message, closable, children, background }: IContentModal) {
    
    return (
        <Modal
            id={id}
            headline={headline}
            message={message}
            closable={closable}
            background={background}
        >
            {children}
        </Modal>
    )
}