import React from 'react'
import Hello from '../components/hello'

const page = () => {
  console.log("hello")
  return (
    <div className='text-5xl'>
      hello server !!!!
      <Hello />
    </div>
  )
}

export default page
