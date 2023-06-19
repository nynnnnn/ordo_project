import List from './components/post/List';
import Container from "@/app/components/Container";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from './actions/getCurrentUser';

export default async function Home() {
  const currentUser = await getCurrentUser();
  console.log('3000 start :::')

  return (
    <ClientOnly>
      <Container>
        <List currentUser={currentUser} />
      </Container>
    </ClientOnly>
  )
}
