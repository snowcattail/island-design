import { useEffect } from 'react';

export function useFocusReturn(active: boolean) {
    useEffect(() => {
        if (!active || typeof document === 'undefined') return;
        const previous = document.activeElement;
        return () => {
            if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
        };
    }, [active]);
}
