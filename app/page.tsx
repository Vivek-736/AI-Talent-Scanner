"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mic, Users, Clock, BarChart3, CheckCircle } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useUser } from "@/app/Provider";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/services/supabaseClient";

/* eslint-disable @typescript-eslint/no-unused-vars */

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll({ container: containerRef });
  const y = useSpring(scrollY, { stiffness: 100, damping: 20 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const isAuthenticated = !!user?.name;

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        setIsDialogOpen(false);
        router.push("/dashboard");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      // console.log("Error: ", error.message);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardHover = {
    hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
    rest: { scale: 1 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
      ref={containerRef}
      initial="hidden"
      animate="visible"
    >
      <motion.nav
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4"
        variants={fadeIn}
      >
        <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-full px-6 py-3 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <span className="font-bold text-2xl text-purple-600">Talq</span>
              <div className="hidden md:flex items-center space-x-6">
                <a
                  href="#home"
                  className="text-slate-800 hover:text-purple-600 transition-colors text-sm font-medium relative group"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("home");
                  }}
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
                </a>
                <a
                  href="#features"
                  className="text-slate-800 hover:text-purple-600 transition-colors text-sm font-medium relative group"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("features");
                  }}
                >
                  Features
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button
                    size="sm"
                    className="bg-purple-600 cursor-pointer text-white rounded-lg hover:bg-purple-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-purple-600 cursor-pointer text-white rounded-lg hover:bg-purple-700 transition-all shadow-md hover:shadow-lg"
                    >
                      Log In
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        <div className="flex flex-row gap-4 items-center justify-center mb-4">
                          <Image
                            src="/favicon.png"
                            width={50}
                            height={50}
                            alt="Logo"
                            className="rounded-2xl bg-[#333333]"
                          />
                          <span className="text-4xl font-bold text-purple-500">Talq</span>
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center">
                      <Image
                        src="/auth.jpg"
                        width={400}
                        height={400}
                        alt="Auth"
                        className="rounded-2xl"
                      />
                      <h2 className="text-2xl font-bold text-center mt-5">Welcome to Talq</h2>
                      <p className="text-gray-500 text-center">Sign In with your Google Account</p>
                      <Button
                        className="mt-7 w-52 cursor-pointer"
                        onClick={signInWithGoogle}
                        variant="default"
                      >
                        <FcGoogle size={30} className="mr-2" />
                        <span>Sign In with Google</span>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.section
        id="home"
        className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-r from-purple-50/50 to-white"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto mt-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center justify-center">
            <motion.div
              className="space-y-8"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.2 }}
            >
              <motion.div className="space-y-4" variants={fadeIn}>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
                  <Mic className="w-5 h-5 mr-2" />
                  AI-Powered Voice Interviews
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                  Transform Your{" "}
                  <span className="text-purple-600">Hiring Experience</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Streamline recruitment with AI-driven voice interviews that
                  evaluate candidates fairly, saving you time and delivering
                  actionable insights.
                </p>
              </motion.div>
            </motion.div>

            <motion.div className="relative hidden lg:block">
              <div className="relative aspect-video flex items-center justify-center rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 rounded-lg border-4 border-purple-500">
                  <Image
                    src="/hero.gif"
                    alt="Hero Image"
                    width={600}
                    height={600}
                    className="object-cover w-full h-full relative z-10"
                    unoptimized
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="features"
        className="py-20 px-6 md:px-12 bg-gray-100"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center space-y-4 mb-16" variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Why Choose <span className="text-purple-600">Talq</span>?
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Our AI platform redefines hiring with efficiency, fairness, and
              deep insights, empowering you to find the best talent.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Mic className="w-8 h-8 text-purple-600" />,
                title: "Natural Voice Conversations",
                description:
                  "Conduct interviews that feel natural and engaging with our advanced AI voice technology powered by Vapi.",
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
                title: "Intelligent Analysis",
                description:
                  "Get detailed insights and scoring based on candidate responses, communication skills, and technical knowledge.",
              },
              {
                icon: <Clock className="w-8 h-8 text-purple-600" />,
                title: "Save Time & Resources",
                description:
                  "Automate initial screening rounds and focus your time on the most promising candidates.",
              },
              {
                icon: <Users className="w-8 h-8 text-purple-600" />,
                title: "Scalable Hiring",
                description:
                  "Interview hundreds of candidates simultaneously without compromising on quality or consistency.",
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
                title: "Bias-Free Evaluation",
                description:
                  "Ensure fair and objective candidate assessment with AI that focuses purely on skills and responses.",
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
                title: "Real-time Insights",
                description:
                  "Get instant feedback and recommendations during and after each interview session.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
              >
                <Card className="border-0 shadow-lg bg-white hover:bg-gradient-to-br hover:from-white hover:to-purple-50 transition-all">
                  <CardContent className="p-6 text-center space-y-4">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-black">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.footer
        className="py-6 px-4 bg-white border-t border-gray-200"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <p className="text-slate-600">
            Made with <span className="text-purple-600">💗</span> by Vivek
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
}