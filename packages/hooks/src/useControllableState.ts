import { useCallback, useState } from 'react';

export function useControllableState<T>(value: T | undefined, defaultValue: T, onChange?: (value: T) => void) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const current = value === undefined ? internalValue : value;
    const setValue = useCallback(
        (next: T) => {
            if (value === undefined) setInternalValue(next);
            if (!Object.is(current, next)) onChange?.(next);
        },
        [value, current, onChange]
    );
    return [current, setValue] as const;
}
