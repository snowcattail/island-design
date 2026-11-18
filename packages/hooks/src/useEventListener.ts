import { useEffect, useRef } from 'react';

export function useEventListener<K extends keyof DocumentEventMap>(
    target: Document | null,
    type: K,
    listener: (event: DocumentEventMap[K]) => void,
    options?: AddEventListenerOptions
) {
    const listenerRef = useRef(listener);
    listenerRef.current = listener;
    useEffect(() => {
        if (!target) return;
        const handler = (event: DocumentEventMap[K]) => listenerRef.current(event);
        target.addEventListener(type, handler, options);
        return () => target.removeEventListener(type, handler, options);
    }, [target, type, options]);
}
