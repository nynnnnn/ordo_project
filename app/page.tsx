import { redirect } from 'next/navigation';

export default function Home() {
  console.log('3000 start :::')
  return redirect(`${process.env.NEXT_PUBLIC_CONSOLE_DOMAIN}/login`);
}
