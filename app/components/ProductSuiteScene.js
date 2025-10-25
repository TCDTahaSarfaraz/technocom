// app/components/ProductSuiteScene.js
'use client';

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './productSuiteScene.css';

gsap.registerPlugin(ScrollTrigger);

// --- HOOKS & DATA ---
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);
        listener();
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [query]);
    return matches;
};

const allBoxesData = [
    { id: 'billing', label: 'Billing', color: '#f59e0b', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6Z" /><path d="M14 2v6h6"/></svg> },
    { id: 'invoicing', label: 'Invoicing', color: '#f59e0b', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M16 4h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg> },
    { id: 'tax', label: 'Tax', color: '#7c3aed', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M9 14.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S7.5 16.83 7.5 16s.67-1.5 1.5-1.5M15 14.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5M16 8H8v4h8V8Zm4-4h-2V2h-2v2H8V2H6v2H4v16h16V4Z" /></svg>, iconType: 'fill' },
    { id: 'connect', label: 'Connect', color: '#4f46e5', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M12 5v14M5 12h14"/></svg> },
    { id: 'issuing', label: 'Issuing', color: '#8b5cf6', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="8" cy="15" r="1.5"/></svg>, iconType: 'fill' },
    { id: 'payments', label: 'Payments', color: '#7c3aed', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M18 6H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2Z"/><path d="M4 10h16"/></svg> },
    { id: 'capital', label: 'Capital', color: '#22c55e', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><rect x="3" y="12" width="18" height="8" rx="2"/><path d="M3 8V6a2 2 0 012-2h14a2 2 0 012 2v2"/></svg> },
    { id: 'terminal', label: 'Terminal', color: '#10b981', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="m9 12 3 3 3-3"/></svg> },
    { id: 'radar', label: 'Radar', color: '#ef4444', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.5 8.5 2.1 2.1"/><circle cx="12" cy="12" r="3"/></svg> },
    { id: 'treasury', label: 'Treasury', color: '#06b6d4', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M8 14h8M8 10h8m-4 8V6"/><path d="M3 20V4a2 2 0 012-2h14a2 2 0 012 2v16l-4-4H7l-4 4Z"/></svg> },
];

// The definitive "Blueprint" with forced start/end sides for artistic control.
const animationPairsData = [
    { from: 'billing',  to: 'issuing',  pathType: 'custom-billing-issuing', startSide: 'right', endSide: 'right' },
    { from: 'invoicing',to: 'radar',    pathType: 'custom-invoicing-radar', startSide: 'right', endSide: 'right' },
    { from: 'payments', to: 'capital',  pathType: 'custom-payments-capital', startSide: 'bottom', endSide: 'right' },
    { from: 'tax',      to: 'treasury', pathType: 'custom-tax-treasury', startSide: 'right', endSide: 'top'},
    { from: 'connect',  to: 'terminal', pathType: 'custom-connect-terminal' },
];

// --- ADVANCED PATH GENERATION HELPERS ---
const getAttachmentPoint = (boxRect, targetCenter, sideOverride = null) => {
    const boxCenter = { x: boxRect.left + boxRect.width / 2, y: boxRect.top + boxRect.height / 2 };
    const buffer = 10;
    
    if (sideOverride) {
        switch(sideOverride) {
            case 'right': return { x: boxRect.right + buffer, y: boxCenter.y };
            case 'bottom': return { x: boxCenter.x, y: boxRect.bottom + buffer };
            case 'left': return { x: boxRect.left - buffer, y: boxCenter.y };
            case 'top': return { x: boxCenter.x, y: boxRect.top - buffer };
            default: return boxCenter;
        }
    }
    const angle = Math.atan2(targetCenter.y - boxCenter.y, targetCenter.x - boxCenter.x) * 180 / Math.PI;
    if (angle > -45 && angle <= 45) return { x: boxRect.right + buffer, y: boxCenter.y };
    if (angle > 45 && angle <= 135) return { x: boxCenter.x, y: boxRect.bottom + buffer };
    if (angle > 135 || angle <= -135) return { x: boxRect.left - buffer, y: boxCenter.y };
    return { x: boxRect.x + boxRect.width / 2, y: boxRect.top - buffer };
};

const createPath = (start, end, type, allRects, containerRect) => {
    const getRelCenter = (id) => ({
        x: (allRects[id].left + allRects[id].width / 2) - containerRect.left,
        y: (allRects[id].top + allRects[id].height / 2) - containerRect.top,
    });
    
    switch(type) {
        case 'custom-billing-issuing': {
            const waypointX = (getRelCenter('billing').x + getRelCenter('invoicing').x) / 2;
            const waypointY = getRelCenter('issuing').y;
            return `M ${start.x} ${start.y} H ${waypointX} V ${waypointY} H ${end.x}`;
        }
        case 'custom-invoicing-radar': {
            const waypointX = (getRelCenter('invoicing').x + getRelCenter('tax').x) / 2;
            const waypointY = getRelCenter('terminal').y;
            return `M ${start.x} ${start.y} H ${waypointX} V ${waypointY} H ${end.x}`;
        }
        case 'custom-payments-capital': {
            const waypointX = getRelCenter('issuing').x;
            const waypointY = end.y;
            return `M ${start.x} ${start.y} V ${waypointY} H ${waypointX} H ${end.x}`;
        }
        case 'custom-tax-treasury': {
             const waypointY1 = getRelCenter('radar').y;
             const waypointX = getRelCenter('terminal').x;
             return `M ${start.x} ${start.y} H ${start.x + 20} V ${waypointY1} H ${waypointX} V ${end.y}`;
        }
        case 'custom-connect-terminal': {
            const waypointX = (getRelCenter('connect').x + getRelCenter('issuing').x) / 2;
            const waypointY = getRelCenter('capital').y;
            return `M ${start.x} ${start.y} H ${waypointX} V ${waypointY} H ${end.x}`;
        }
        default: return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }
};

// --- SUB-COMPONENTS & MAIN DESKTOP COMPONENT ---
// This entire section is unchanged as the logic is correct and just interprets the new path data.

const ProductNode = React.forwardRef(({ id, children, Icon, color, iconType }, ref) => (
    <div id={id} ref={ref} className={`product-node ${iconType === 'fill' ? 'fill-icon' : ''}`} style={{ '--product-color': color }}>
        <div className="product-box"><div className="icon-container"><Icon /></div></div>
        <span className="product-label">{children}</span>
    </div>
));
ProductNode.displayName = 'ProductNode';

const MobileGrid = () => { /* ... */ };

const DesktopAnimation = () => {
    const containerRef = useRef(null);
    const boxRefs = useRef({});
    const [paths, setPaths] = useState([]);
    const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        const computeAndUpdatePaths = () => {
            if (!containerRef.current) return;
            const containerRect = containerRef.current.getBoundingClientRect();
            setSvgSize({ width: containerRect.width, height: containerRect.height });
            
            const allRects = Object.keys(boxRefs.current).reduce((acc, key) => {
                const el = boxRefs.current[key]?.querySelector('.product-box');
                if(el) acc[key] = el.getBoundingClientRect();
                return acc;
            }, {});
            if(Object.keys(allRects).length !== allBoxesData.length) return;

            const newPaths = animationPairsData.map(pair => {
                const fromRect = allRects[pair.from];
                const toRect = allRects[pair.to];
                if (!fromRect || !toRect) return null;
                
                const startPoint = getAttachmentPoint(fromRect, { x: toRect.left + toRect.width/2, y: toRect.top + toRect.height/2 }, pair.startSide);
                const endPoint = getAttachmentPoint(toRect, { x: fromRect.left + fromRect.width/2, y: fromRect.top + fromRect.height/2 }, pair.endSide);

                const relativeStart = { x: startPoint.x - containerRect.left, y: startPoint.y - containerRect.top };
                const relativeEnd = { x: endPoint.x - containerRect.left, y: endPoint.y - containerRect.top };
                
                const d = createPath(relativeStart, relativeEnd, pair.pathType, allRects, containerRect);
                const fromColor = allBoxesData.find(b => b.id === pair.from)?.color || '#fff';
                const toColor = allBoxesData.find(b => b.id === pair.to)?.color || '#fff';

                return { id: `${pair.from}-${pair.to}`, d, gradient: [fromColor, toColor] };
            }).filter(Boolean);
            setPaths(newPaths);
        };
        const timeoutId = setTimeout(computeAndUpdatePaths, 100); 
        const ro = new ResizeObserver(computeAndUpdatePaths);
        ro.observe(containerRef.current);
        return () => { clearTimeout(timeoutId); ro.disconnect(); };
    }, []);

    useLayoutEffect(() => {
        if (paths.length === 0) return;
        const ctx = gsap.context(() => {
            gsap.from(".product-node", { autoAlpha: 0, y: 20, scale: 0.9, duration: 0.8, stagger: 0.05, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: "top 60%", once: true } });

            paths.forEach(p => {
                const pathEl = document.getElementById(`path-line-${p.id}`);
                if (pathEl) {
                    const len = pathEl.getTotalLength();
                    gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: len, autoAlpha: 0 });
                }
            });

            const masterTimeline = gsap.timeline({ repeat: -1, paused: true, repeatDelay: 1.0, defaults: { ease: "power2.inOut" }});

            animationPairsData.forEach(pair => {
                const pathInfo = paths.find(p => p.id === `${pair.from}-${pair.to}`);
                if (!pathInfo) return;
                const pathEl = document.getElementById(`path-line-${pathInfo.id}`);
                const fromNode = boxRefs.current[pair.from];
                const toNode = boxRefs.current[pair.to];
                if (!pathEl || !fromNode || !toNode) return;
                
                masterTimeline
                    .add(() => {
                        Object.values(boxRefs.current).forEach(node => node.classList.remove('is-glowing'));
                        fromNode.classList.add('is-glowing');
                    })
                    .to(pathEl, { autoAlpha: 1, duration: 0.1 })
                    .to(pathEl, { strokeDashoffset: 0, duration: 1.2, ease: "sine.inOut" }, "<")
                    .add(() => {
                        fromNode.classList.remove('is-glowing');
                        toNode.classList.add('is-glowing');
                    }, "-=0.2")
                    .to(pathEl, { autoAlpha: 0, duration: 0.4 }, "+=0.5")
                    .set(pathEl, { strokeDashoffset: pathEl.getTotalLength() }); 
            });
            
            masterTimeline.add(() => Object.values(boxRefs.current).forEach(node => node.classList.remove('is-glowing')));
            
            ScrollTrigger.create({ trigger: containerRef.current, start: "top 50%", onEnter: () => masterTimeline.play(), onLeaveBack: () => masterTimeline.pause(0) });
        }, containerRef);
        return () => ctx.revert();
    }, [paths]);

    return (
        <div ref={containerRef} className="animation-stage">
            <svg className="svg-path-overlay" viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}>
                <defs>
                    {paths.map(p => (
                        <linearGradient key={`grad-${p.id}`} id={`grad-${p.id}`} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={p.gradient[0]} />
                            <stop offset="100%" stopColor={p.gradient[1]} />
                        </linearGradient>
                    ))}
                </defs>
                {paths.map(p => <path key={p.id} id={`path-line-${p.id}`} d={p.d} className="path-line" stroke={`url(#grad-${p.id})`} />)}
            </svg>
            {allBoxesData.map(box => (
                <ProductNode key={box.id} id={box.id} ref={el => boxRefs.current[box.id] = el} {...box}>{box.label}</ProductNode>
            ))}
        </div>
    );
};

const ProductSuiteScene = () => {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const [isClient, setIsClient] = useState(false);
    useEffect(() => { setIsClient(true); }, []);
    if (!isClient) return <div className="animation-placeholder" />;
    return isDesktop ? <DesktopAnimation /> : <MobileGrid />;
};

export default ProductSuiteScene;