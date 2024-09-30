// Components
import Modal from "./Modal";

export interface IInfoModal {
    id?: number;
    headline: string;
    message?: string;
}

export default function InfoModal({ headline, message, id }: IInfoModal) {
    

    return (
        <Modal
            id={id}
            headline={headline}
            message={message}
        >
        
        </Modal>
    )
}