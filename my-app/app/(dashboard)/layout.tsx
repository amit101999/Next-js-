import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            Dashboard page
            {children}
        </div>
    )
}

export default layout
