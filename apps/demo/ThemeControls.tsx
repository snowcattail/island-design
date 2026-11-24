import { useLayoutEffect, useState } from 'react';

const accents = { mint: '薄荷', coral: '珊瑚', amber: '琥珀' } as const;
type Accent = keyof typeof accents;
const storageKey = 'island-design-demo-theme';

function readTheme(): { mode: 'light' | 'dark'; accent: Accent } {
    try {
        const [mode, accent] = (window.localStorage.getItem(storageKey) ?? '').split(':');
        return { mode: mode === 'dark' ? 'dark' : 'light', accent: isAccent(accent) ? accent : 'mint' };
    } catch {
        return { mode: 'light', accent: 'mint' };
    }
}

function isAccent(value: string): value is Accent {
    return Object.prototype.hasOwnProperty.call(accents, value);
}

export default function ThemeControls() {
    const [{ mode, accent }, setTheme] = useState(readTheme);

    useLayoutEffect(() => {
        document.documentElement.dataset.theme = mode;
        document.documentElement.dataset.accent = accent;
        try {
            window.localStorage.setItem(storageKey, `${mode}:${accent}`);
        } catch {
            // Preferences still apply for this session when storage is unavailable.
        }
    }, [mode, accent]);

    return (
        <div className="demo-theme-controls" role="group" aria-label="演练场主题">
            <button
                type="button"
                aria-pressed={mode === 'dark'}
                onClick={() => setTheme({ mode: mode === 'dark' ? 'light' : 'dark', accent })}
            >
                暗色模式
            </button>
            <select
                aria-label="主题色"
                value={accent}
                onChange={({ currentTarget: { value } }) => {
                    if (isAccent(value)) setTheme({ mode, accent: value });
                }}
            >
                {Object.entries(accents).map(([value, label]) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
}
