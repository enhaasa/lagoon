import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Contexts
import { UIContext } from "@contexts/UI";

const PAGE_NAVIGATION_DELAY = 500;
const EXTERNAL_LINK_TRIGGERS = [
    'https://',
    'http://'
];

export default function useNavigation() {
    const { offCanvas, page } = useContext(UIContext);

    const navigate = useNavigate();
    const location = useLocation();

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
        if (
            location.pathname === `/${path}` 
            || location.pathname === path
        ) return;

        offCanvas.hide();
        page.hide();

        setTimeout(() => {
            navigate(path);
            page.show();
        }, PAGE_NAVIGATION_DELAY)
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