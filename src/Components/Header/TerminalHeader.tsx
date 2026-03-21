import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FULL_NAME = 'Abhijith Eanuga';

const TerminalHeader: React.FC = () => {
    const [displayed, setDisplayed] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // Typing animation — runs once on mount
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < FULL_NAME.length) {
                setDisplayed(FULL_NAME.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 80);
        return () => clearInterval(interval);
    }, []);

    // Blinking cursor
    useEffect(() => {
        const blink = setInterval(() => setShowCursor(c => !c), 530);
        return () => clearInterval(blink);
    }, []);

    const isActive = (path: string) => location.pathname === path || (path === '/' && location.pathname === '');

    return (
        <nav style={{
            backgroundColor: '#1e2130',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 24px',
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
            {/* Terminal prompt badge */}
            <div style={{
                backgroundColor: '#2a2d3e',
                borderRadius: '8px',
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                cursor: 'pointer',
            }} onClick={() => navigate('/')}>
                <span style={{ color: '#bd93f9' }}>guest</span>
                <span style={{ color: '#8892b0' }}> @ </span>
                <span style={{ color: '#50fa7b' }}>abhijith</span>
                <span style={{ color: '#8892b0' }}> : ~ $ </span>
                <span style={{ color: '#f8f8f2', fontWeight: 'bold' }}>{displayed}</span>
                <span style={{
                    display: 'inline-block',
                    width: '9px',
                    height: '16px',
                    backgroundColor: '#bd93f9',
                    opacity: showCursor ? 0.8 : 0,
                    transition: 'opacity 0.1s',
                    marginLeft: '1px',
                    borderRadius: '1px',
                }} />
            </div>

            {/* Nav links */}
            <div style={{ display: 'flex', gap: '24px' }}>
                {[
                    { label: '~/HOME', path: '/' },
                    { label: '~/ABOUT', path: '/about' },
                ].map(({ label, path }) => (
                    <button
                        key={path}
                        onClick={() => navigate(path)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            fontSize: '13px',
                            fontWeight: '500',
                            color: isActive(path) ? '#50fa7b' : '#8892b0',
                            letterSpacing: '0.05em',
                            textDecoration: 'none',
                            padding: '4px 0',
                            borderBottom: isActive(path) ? '1px solid #50fa7b' : '1px solid transparent',
                            transition: 'color 0.2s, border-color 0.2s',
                        }}
                        onMouseEnter={e => { (e.target as HTMLElement).style.color = '#f8f8f2'; }}
                        onMouseLeave={e => { (e.target as HTMLElement).style.color = isActive(path) ? '#50fa7b' : '#8892b0'; }}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default TerminalHeader;
