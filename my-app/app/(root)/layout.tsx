import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            Root navbar
            {children}
        </div>
    )
}

export default layout
