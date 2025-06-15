import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className='w-full'>
            <SidebarTrigger className='md:hidden p-4' />
                {children}
            </div>
        </SidebarProvider>
    )
}

export default DashboardProvider
