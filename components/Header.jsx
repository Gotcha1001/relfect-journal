
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SignedOut, SignedIn, SignInButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import { FolderOpen, PenBox } from 'lucide-react';
import UserMenu from './user-menu';
import MotionWrapperDelay from './MotionWrapperDelay';
import { checkUser } from '@/lib/checkUser';



const Header = async () => {

    await checkUser()

    return (
        <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
            }}
        >
            <header className='mx-auto gradient-background2'>
                <nav className='py-6 px-4 flex justify-between items-center'>
                    <Link href={"/"}>
                        <Image
                            src={"/logo.png"}
                            alt='Reflect Logo'
                            width={200}
                            height={60}
                            className='h-10 w-auto object-contain horizontal-rotate'
                        />
                    </Link>
                    <div className='flex items-center gap-4'>
                        {/* LOGIN and other things */}
                        <SignedIn>
                            <Link href="/dashboard#collections">
                                <Button variant="ghost" className="flex items-center gap-2 group">
                                    <span className="text-white group-hover:text-black transition-colors duration-200">
                                        <FolderOpen size={18} />
                                    </span>
                                    <span className="hidden md:inline text-white group-hover:text-black">Collections</span>
                                </Button>
                            </Link>
                        </SignedIn>






                        <Link href="/journal/write">
                            <Button variant="journal" className="flex items-center gap-2">
                                <PenBox size={18} />
                                <span className='hidden md:inline'>Write New</span>
                            </Button>
                        </Link>

                        <SignedOut>
                            <SignInButton forceRedirectUrl='/dashboard'>
                                <Button variant="outline">Login</Button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <UserMenu />
                        </SignedIn>
                    </div>
                </nav>
            </header>
        </MotionWrapperDelay>
    );
};

export default Header;
