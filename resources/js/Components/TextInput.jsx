import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, style = {}, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={className}
            style={{
                /* Dark-theme defaults — overridden by inline style prop */
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(99,150,255,0.18)',
                borderRadius: '10px',
                color: '#f0f4ff',
                width: '100%',
                padding: '0.6rem 0.9rem',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                ...style,
            }}
            onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(79,140,255,0.5)';
                e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(79,140,255,0.12)';
                props.onFocus?.(e);
            }}
            onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(99,150,255,0.18)';
                e.currentTarget.style.boxShadow   = 'none';
                props.onBlur?.(e);
            }}
            ref={localRef}
        />
    );
});
