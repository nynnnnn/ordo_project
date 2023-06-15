import { redirect } from 'next/navigation';

import Container from "@/app/components/Container";
import ClientOnly from "./components/ClientOnly";
// import ListingCard from "@/app/components/listings/ListingCard";
// import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/actions/getCurrentUser";

// import getListings, { 
//   IListingsParams
// } from "@/app/actions/getListings";

// interface HomeProps {
//   searchParams: IListingsParams
// };

// export default async function Home ({ searchParams }: HomeProps) {
export default async function Home () {

  // const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // if (listings.length === 0) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState showReset />
  //     </ClientOnly>
  //   );
  // }

  console.log('3000 start :::')
  // return redirect(`${process.env.NEXT_PUBLIC_CONSOLE_DOMAIN}/login`);

  return (
    <ClientOnly>
      <Container>
        <div 
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        > body
          {/* <ListingCard
              currentUser={currentUser}
              key={1}
              data={""}
            /> */}
          {/* {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))} */}
        </div>
      </Container>
    </ClientOnly>
  )

}
