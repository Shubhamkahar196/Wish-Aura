// "use client";

// import React from 'react';
// import { Button } from './ui/button';
// import { signIn, signOut, useSession } from "next-auth/react";

// const Navbar = () => {
//   const session = useSession();

//   return (
   
//     // <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b  bg-background/95 backdrop-blur-lg px-4 sm:px-8 py-4">
//     <nav className="fixed top-0 left-0 right-0 z-50 w-full border-t  bg-black/95 backdrop-blur px-4 sm:px-8 py-4 supports-backdrop-filter:bg-background/70">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <div className="text-xl font-extrabold tracking-wider bg-linear-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
//           WishAura
//         </div>

//         {/* Buttons */}
//         <div>
//           {session.data?.user ? (
//             <Button onClick={() => signOut()} variant="destructive" className="font-medium px-5">
//               Logout
//             </Button>
//           ) : (
//             <Button onClick={() => signIn()} className="bg-white text-black hover:bg-zinc-200 font-medium px-5">
//               Login
//             </Button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


"use client";

import React from 'react';
import { Button } from './ui/button';
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();

  return (
 
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-zinc-800/50 bg-black/10 backdrop-blur-md px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        {/* <div className="text-xl font-extrabold tracking-wider bg-linear-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent"> */}
        <div className="text-xl font-extrabold tracking-wider bg-linear-to-r from-black via-blue-900 bg-clip-text text-transparent">
          WishAura
        </div>

        {/* Buttons */}
        <div>
          {session.data?.user ? (
            <Button onClick={() => signOut()} variant="destructive" className="font-medium px-5">
              Logout
            </Button>
          ) : (
            <Button onClick={() => signIn()} className="bg-black text-white cursor-pointer font-medium px-5">
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;