import MembersPage from '@/app/members/page';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <main className="py-16 h-full relative ml-[18vw]">
      <div className="my-10 mx-10 h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <MembersPage />
        </Suspense>
      </div>
    </main>
  );
}
