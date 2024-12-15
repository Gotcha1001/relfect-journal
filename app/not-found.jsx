import MotionWrapperDelay from '@/components/MotionWrapperDelay';
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export const metadata = {
    title: "Not Found",
};

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
            {/* Use mask-image with a linear gradient to create opacity fade */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=600')",
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                    opacity: 0.7
                }}
            ></div>
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: { opacity: 1, y: 0 },
                }}
            >
                <div className="relative text-center p-6 gradient-background2 bg-opacity-80 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-6xl font-bold text-indigo-500">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-500 mt-4">Page Not Found</h2>
                    <p className="text-lg text-gray-600 mt-2 mb-4">
                        Oops! The page you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <Link href="/">
                        <Button variant="journal" className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 transform hover:scale-105">
                            Return Home
                        </Button>
                    </Link>
                </div>
            </MotionWrapperDelay>
        </div>
    )
}

export default NotFound