import React from 'react'
import DashboardProvider from './Provider'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='bg-gray-200'>
            <DashboardProvider>
                <div className='p-10'>
                    {children}
                </div>
            </DashboardProvider>
        </div>
    )
}

export default DashboardLayout
