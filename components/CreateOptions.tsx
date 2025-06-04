import React from 'react'
import { Phone, Video } from 'lucide-react'

const CreateOptions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <Video className="p-2 bg-purple-100 text-purple-600 rounded-lg w-12 h-12 mb-4" />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Conduct AI Interviews</h2>
        <p className="text-gray-600">Effortlessly set up AI-driven interview sessions</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <Phone className="p-2 bg-purple-100 text-purple-600 rounded-lg w-12 h-12 mb-4" />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Schedule Phone Screens</h2>
        <p className="text-gray-600">Arrange direct calls with top candidates</p>
      </div>
    </div>
  )
}

export default CreateOptions
