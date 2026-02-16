"use client";

import { useState } from 'react';

export default function SplineRobot() {
    const [loading, setLoading] = useState(true);

    return (
        <div className="w-full h-full absolute inset-0 z-10 pointer-events-none">
            <div className="w-full h-full pointer-events-auto">
                <iframe
                    src='https://my.spline.design/3drobotheadtrackingmouse-Pqk15c0noOnsiFbmVBzLS8Ce/'
                    frameBorder='0'
                    width='100%'
                    height='100%'
                    className="w-full h-full"
                    onLoad={() => setLoading(false)}
                    allow="fullscreen; company-features" // Sometimes needed for interactions
                />
            </div>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background z-20">
                    <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}
