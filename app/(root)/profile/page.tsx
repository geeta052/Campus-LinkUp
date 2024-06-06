import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage })

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="http://127.0.0.1:8080/">
              Have Questions ?
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="http://127.0.0.1:5500/calendar/index.html">
              View All Events
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="Events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
        <a href="http://localhost:3000/#events" className="block p-4 bg-white shadow-md rounded-lg hover:shadow-lg border border-gray-200">
          <div className="mb-4">
            <p className="text-sm text-gray-500">May 2, 2024</p>
            <h3 className="font-bold text-lg">ZEPHYR 2024</h3>
          </div>
          <p className="mt-4">It is time to show your technical knowledge and proceed to the next level by cracking the quiz. #ZEPHYR14</p>
        </a>
        <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg border border-gray-200">
            <div className="mb-4">
              <p className="text-sm text-gray-500">May 1, 2024</p>
              <h3 className="font-bold text-lg">COLLOQUIUM 2024</h3>
            </div>
            <p className="mt-4">A Colloquium I.T. FOR SOCIETY. Department of Information Technology in SFIT, every year in the month of January organizes a two-day colloquium on “IT for Society”.</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg border border-gray-200">
            <div className="mb-4">
              <p className="text-sm text-gray-500">April 30, 2024</p>
              <h3 className="font-bold text-lg">TEDXSFIT</h3>
            </div>
            
            <p className="mt-4">TED is a nonprofit organization devoted to Ideas Worth Spreading. Started as a four-day conference in California 30 years ago, TED has grown to support its mission with multiple initiatives.</p>
          </div>
      </section>
    </>
  )
}

export default ProfilePage