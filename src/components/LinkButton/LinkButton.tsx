import styles from './LinkButton.module.scss';

// Utils
import useNavigation from './../../hooks/useNavigation';

interface ILinkButton {
    name: string;
    target: string;
    isNewTab: boolean;
}

export default function LinkButton({ name, target, isNewTab = false }: ILinkButton ) {

    const navigator = useNavigation();

    return (
        <button className={styles.container} onClick={() => navigator.dynamicNavigate(target, isNewTab)}>
            { name }
        </button>
    );
}
