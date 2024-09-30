import { useNavigate } from "react-router-dom";

const EXTERNAL_LINK_TRIGGERS = [
    'https://',
    'http://'
]

export default function useNavigation() {
    const navigate = useNavigate();

    function isExternalLink(path: string) {
        let isExternal = false;

        for (const link of EXTERNAL_LINK_TRIGGERS) {
            if (path.startsWith(link)) {
                isExternal = true;
                break;
            }
        }

        return isExternal;
    }

    function internalNavigate(path: string) {
        navigate(path);
    }

    function externalNavigate(path: string, isNewTab: boolean = false) {
        if (isNewTab) {
            window.open(path, '_blank');
        } else {
            window.location.href = path;
        }
    }

    function dynamicNavigate(path: string, isNewTab: boolean = false) {
        if (isExternalLink(path)) {
            externalNavigate(path, isNewTab);
        } else {
            internalNavigate(path);
        }
    }

    return {
        internalNavigate,
        externalNavigate,
        dynamicNavigate
    }
}