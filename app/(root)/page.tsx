import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })

  return (
    <>

    
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Connect, Participate, Succeed: Revolutionizing Student Life</h1>
            <p className="p-regular-20 md:p-regular-24">Unlock Opportunities: Next Level Experiences in Centralizing Extracurriculars</p>
            <Button
        size="lg"
        asChild
        className="button w-full sm:w-fit bg-primary-500 hover:bg-primary-600 transition duration-300 ease-in-out transform hover:scale-105"
      >
        <Link href="http://127.0.0.1:5000/">Community</Link>
      </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>



      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Trust by <br /> Thousands of Events</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg border border-gray-200">
            <div className="mb-4">
              <p className="text-sm text-gray-500">April 30, 2024</p>
              <h3 className="font-bold text-lg">TEDXSFIT</h3>
            </div>
            <Image
              src="/assets/images/ted.png"
              alt="Event 1"
              width={300}
              height={200}
              className="object-cover h-48"
            />
            <p className="mt-4">TED is a nonprofit organization devoted to Ideas Worth Spreading. Started as a four-day conference in California 30 years ago, TED has grown to support its mission with multiple initiatives.</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg border border-gray-200">
            <div className="mb-4">
              <p className="text-sm text-gray-500">May 1, 2024</p>
              <h3 className="font-bold text-lg">COLLOQUIUM 2024</h3>
            </div>
            <Image
              src="/assets/images/it.png"
              alt="Event 2"
              width={300}
              height={200}
              className="object-cover h-48"
            />
            <p className="mt-4">A Colloquium I.T. FOR SOCIETY. Department of Information Technology in SFIT, every year in the month of January organizes a two-day colloquium on “IT for Society”.</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg border border-gray-200">
            <div className="mb-4">
              <p className="text-sm text-gray-500">May 2, 2024</p>
              <h3 className="font-bold text-lg">ZEPHYR 2024</h3>
            </div>
            <Image
              src="/assets/images/cd.png"
              alt="Event 3"
              width={300}
              height={200}
              className="object-cover h-48"
            />
            <p className="mt-4">It is time to show your technical knowledge and proceed to next level by cracking the quiz.#ZEPHYR14</p>
          </div>
          {/* Add more event cards as needed */}
        </div>

      </section>
    </>
  )


}

