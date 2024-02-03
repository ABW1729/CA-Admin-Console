import Image from 'next/image';
import { useRouter } from "next/navigation"; 
import { useState } from "react";
import UsersPage from './components/Form';
export default function HomePage() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
<UsersPage></UsersPage>

    </main>
  );
}

