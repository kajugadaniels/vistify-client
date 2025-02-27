import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Navbar = () => {
    return (
        <div
            className="fixed top-0 left-0 z-50 w-full shadow-xl"
            style={{ height: `52px` }}
        >
            <div className="flex items-center justify-between w-full px-8 py-3 text-white bg-primary-700">
                <div className="flex items-center gap-4 md:gap-6">
                    <Link
                        href="/"
                        className="cursor-pointer hover:!text-primary-300"
                        scroll={false}
                    >
                        <div className="flex items-center gap-3">
                            <Image
                                src="/logo.svg"
                                alt="Rentiful Logo"
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="text-xl font-bold">
                                RENT
                                <span className="text-secondary-500 font-light hover:!text-primary-300">
                                IFUL
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
                <p className="hidden text-primary-200 md:block">
                    Experience the best experience in finding the gem places in this Region with our AI and advanced search
                </p>
                <div className="flex items-center gap-5">
                    <Link href='/'>
                        <Button
                            variant="outline"
                            className="text-white bg-transparent border-white rounded-lg hover:bg-white hover:text-primary-700"
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Link href='/'>
                        <Button
                            variant="secondary"
                            className="text-white border-transparent rounded-lg bg-secondary-600 hover:bg-white hover:text-primary-700"
                        >
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar