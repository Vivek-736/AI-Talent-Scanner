'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Users, Clock, BarChart3, CheckCircle, ArrowRight } from "lucide-react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import Image from "next/image";

export default function HomePage() {
  const containerRef = useRef(null)
  const { scrollY } = useScroll({ container: containerRef })
  const y = useSpring(scrollY, { stiffness: 100, damping: 20 })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const cardHover = {
    hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
    rest: { scale: 1 }
  }

  return (
    <motion.div 
      className="min-h-screen bg-white"
      ref={containerRef}
      initial="hidden"
      animate="visible"
    >
      <motion.nav 
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4"
        variants={fadeIn}
      >
        <div className="bg-black/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <span className="font-semibold text-xl text-purple-600">Talq</span>
              <div className="hidden md:flex items-center space-x-6">
                <a 
                  href="#home" 
                  className="text-black hover:text-purple-600 transition-colors text-sm font-medium"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("home")
                  }}
                >
                  Home
                </a>
                <a 
                  href="#features" 
                  className="text-black hover:text-purple-600 transition-colors text-sm font-medium"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("features")
                  }}
                >
                  Features
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-black cursor-pointer rounded-full hover:text-purple-600 hover:bg-purple-50">
                Sign In
              </Button>
              <Button size="sm" className="bg-black text-white cursor-pointer rounded-full hover:bg-purple-600 transition-colors">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.section 
        id="home" 
        className="pt-32 pb-20 px-12"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.2 }}
            >
              <motion.div className="space-y-4" variants={fadeIn}>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm font-medium">
                  <Mic className="w-4 h-4 mr-2" />
                  AI-Powered Voice Interviews
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
                  Revolutionize Your <span className="text-purple-600">Hiring Process</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Conduct intelligent voice interviews with AI that understands context, evaluates candidates fairly,
                  and saves you hours of screening time.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeIn}
              >
                <Button size="lg" className="bg-black cursor-pointer text-white hover:bg-purple-600 transition-colors">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="border-black cursor-pointer text-black hover:bg-black hover:text-white">
                  Sign In
                </Button>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-8 pt-4"
                variants={fadeIn}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">10k+</div>
                  <div className="text-sm text-gray-600">Interviews Will Be Conducted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">95%</div>
                  <div className="text-sm text-gray-600">Time Will Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">500+</div>
                  <div className="text-sm text-gray-600">Companies Will Trust Us</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative hidden lg:block"
              variants={fadeIn}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
                <Image
                  src="/vercel.svg"
                  alt="Hero Image"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="features" 
        className="py-20 px-12 bg-gray-50"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center space-y-4 mb-16"
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-black">
              Why Choose <span className="text-purple-600">Talq</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform transforms the way you conduct interviews, making them more efficient, fair, and
              insightful.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Mic className="w-8 h-8 text-purple-600" />,
                title: "Natural Voice Conversations",
                description: "Conduct interviews that feel natural and engaging with our advanced AI voice technology powered by Vapi."
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
                title: "Intelligent Analysis",
                description: "Get detailed insights and scoring based on candidate responses, communication skills, and technical knowledge."
              },
              {
                icon: <Clock className="w-8 h-8 text-purple-600" />,
                title: "Save Time & Resources",
                description: "Automate initial screening rounds and focus your time on the most promising candidates."
              },
              {
                icon: <Users className="w-8 h-8 text-purple-600" />,
                title: "Scalable Hiring",
                description: "Interview hundreds of candidates simultaneously without compromising on quality or consistency."
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
                title: "Bias-Free Evaluation",
                description: "Ensure fair and objective candidate assessment with AI that focuses purely on skills and responses."
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
                title: "Real-time Insights",
                description: "Get instant feedback and recommendations during and after each interview session."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
              >
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-8 text-center space-y-4">
                    <motion.div 
                      className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-black">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.footer 
        className="py-8 px-4 bg-white border-t border-gray-200"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Made with 💗 by Vivek</p>
        </div>
      </motion.footer>
    </motion.div>
  )
}