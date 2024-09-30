// Components
import Modal from "./Modal";

export type TContentModal = {
    id?: number;
    headline: string;
    message?: string;
    closable?: boolean;
    children?: React.ReactNode;
}

export default function ContentModal({ id, headline, message, closable, children }: TContentModal) {
    
    return (
        <Modal
            id={id}
            headline={headline}
            message={message}
            closable={closable}
        >
            {children}
        </Modal>
    )
}