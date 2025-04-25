import React from 'react'

export default function CountdownOverlay({ count }: { count: number }) {
    if (count <= 0) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 pointer-events-none">
            <span className="text-8xl font-bold text-white drop-shadow-lg">{count}</span>
        </div>
    )
}