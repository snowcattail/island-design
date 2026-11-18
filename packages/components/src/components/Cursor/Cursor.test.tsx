import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Cursor } from './Cursor';

describe('Cursor', () => {
    it('渲染 children 并包含 island-cursor 类', () => {
        const { container, getByTestId } = render(
            <Cursor>
                <span data-testid="child">child</span>
            </Cursor>
        );
        const root = container.firstChild as HTMLElement;
        expect(root).toHaveClass('island-cursor');
        expect(getByTestId('child')).toBeInTheDocument();
    });

    it('forceAll=true（默认）应用 island-cursor--force', () => {
        const { container } = render(<Cursor>x</Cursor>);
        expect(container.firstChild).toHaveClass('island-cursor--force');
    });

    it('forceAll=false 应用 island-cursor--scoped', () => {
        const { container } = render(<Cursor forceAll={false}>x</Cursor>);
        expect(container.firstChild).toHaveClass('island-cursor--scoped');
    });

    it('type 未设置时（默认）不带 raindrop 类', () => {
        const { container } = render(<Cursor>x</Cursor>);
        expect(container.firstChild).not.toHaveClass('island-cursor--raindrop');
    });

    it('type="raindrop" 应用 island-cursor--raindrop', () => {
        const { container } = render(<Cursor type="raindrop">x</Cursor>);
        expect(container.firstChild).toHaveClass('island-cursor--raindrop');
        expect(container.firstChild).toHaveClass('island-cursor--force');
    });

    it('type="raindrop" 与 forceAll=false 组合', () => {
        const { container } = render(
            <Cursor type="raindrop" forceAll={false}>
                x
            </Cursor>
        );
        expect(container.firstChild).toHaveClass('island-cursor--raindrop');
        expect(container.firstChild).toHaveClass('island-cursor--scoped');
    });

    it('应用 className 与 style', () => {
        const { container } = render(
            <Cursor className="extra" style={{ padding: 4 }}>
                x
            </Cursor>
        );
        const root = container.firstChild as HTMLElement;
        expect(root).toHaveClass('extra');
        expect(root).toHaveStyle({ padding: '4px' });
    });
});
