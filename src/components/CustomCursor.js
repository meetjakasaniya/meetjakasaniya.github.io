import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';

const CustomCursor = () => {
    const theme = useTheme();
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show custom cursor on non-touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        setIsVisible(true);

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            // Update main cursor immediately
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
            }

            // Update follower with a slightly lagged position via requestAnimationFrame or similar logic
            // For simplicity and smoothness, we'll use a direct transform update here but adding a transition in CSS handles the lag.
            if (followerRef.current) {
                followerRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
            }
        };

        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);

        const onMouseOver = (e) => {
            const target = e.target;
            // Check if hovering over interactive elements
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isInteractive);
        };

        // Hide default cursor
        document.body.style.cursor = 'none';

        // Add event listeners
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseover', onMouseOver);

        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseover', onMouseOver);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <style>
                {`
          a, button, [role="button"], input, textarea, select {
            cursor: none;
          }
          /* Allow system cursor on specific elements */
          .system-cursor {
            cursor: pointer !important;
          }
          body {
             cursor: none;
          }
        `}
            </style>

            {/* Main Cursor (Dot) */}
            <div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '8px',
                    height: '8px',
                    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    opacity: isHovering && document.querySelector('.system-cursor:hover') ? 0 : 1,
                    transition: 'transform 0.05s linear, opacity 0.3s', // Fast update for position
                }}
            />

            {/* Follower Cursor (Circle) */}
            <div
                ref={followerRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: isHovering ? '50px' : '30px',
                    height: isHovering ? '50px' : '30px',
                    border: `1.5px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}`,
                    backgroundColor: isClicking
                        ? (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)')
                        : 'transparent',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    opacity: isHovering && document.querySelector('.system-cursor:hover') ? 0 : 1,
                    transition: 'transform 0.15s ease-out, width 0.3s ease, height 0.3s ease, background-color 0.2s, opacity 0.2s', // Smooth lag + size change
                }}
            />
        </>
    );
};

export default CustomCursor;
