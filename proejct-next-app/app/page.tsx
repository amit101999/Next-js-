import React from 'react'
import Explorebtn from './components/Explorebtn'
import EventCard from './components/EventCard'
import { events } from '@/lib/constants'


const page = () => {
  return (
    <section>
      <h1 className='text-center mt-7'> The Hub For Every Dev <br />Event you can Miss  </h1>
      <p className='text-center mt-5'>Hackthons, Meetups  and Conferences , ALL in one place</p>
      <Explorebtn />
      <div className='mt-20  space-y-7'>
        <h1>Fetured Events</h1>
        <ul className='events'>
          {events.map((item, key) => (
            <li key={key}>
              <EventCard {...item} />
            </li>
          ))}
        </ul>

      </div>
    </section>

  )
}

export default page
