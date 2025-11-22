import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    return (
        <div>
            user deatails for : #{id}
        </div>
    )
}

export default page
