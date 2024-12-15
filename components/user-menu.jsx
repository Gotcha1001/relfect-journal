// FOR THE SETUP WITH THE CLERK MENU OPTIONS ADDING A LINK AND ICON
"use client"
import { UserButton } from '@clerk/nextjs'
import { Monitor } from 'lucide-react'
import React from 'react'

const UserMenu = () => {
    return (
        <UserButton appearance={{
            elements: {
                avatarBox: "w-10 h-10",
            }
        }}>

            <UserButton.MenuItems>
                <UserButton.Link
                    label="Dashbaord"
                    labelIcon={<Monitor size={15} />}
                    href='/dashboard'
                />
                <UserButton.Action label='manageAccount' />
            </UserButton.MenuItems>


        </UserButton>
    )
}

export default UserMenu