import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className='w-full'>
                {children}
            </div>
        </SidebarProvider>
    )
}

export default DashboardProvider
