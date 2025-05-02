// import Image from "next/image"
// import { MainNav } from "@/components/main-nav"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent } from "@/components/ui/card"
// import { ArrowRight, Users, Target, Lightbulb, CheckCircle2 } from "lucide-react"

// export default function AboutPage() {
//   return (
//     <>
//       <MainNav />
//       <div className="min-h-screen bg-black text-white">
//         {/* Hero Section */}
//         <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
//           <div className="absolute inset-0 z-0">
//             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-20"></div>
//             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>
//           </div>

//           <div className="container mx-auto px-4 relative z-10">
//             <div className="text-center max-w-3xl mx-auto mb-16">
//               <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
//                 Our Story
//               </Badge>
//               <h1 className="text-4xl md:text-5xl font-bold mb-6">
//                 Revolutionizing Payments with{" "}
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//                   Blockchain Technology
//                 </span>
//               </h1>
//               <p className="text-gray-400 text-lg md:text-xl">
//                 We're on a mission to create a more accessible, efficient, and secure financial ecosystem for everyone.
//               </p>
//             </div>

//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div className="relative">
//                 <div className="relative z-10">
//                   <div className="relative w-full h-[400px]">
//                     <Image
//                       src="/placeholder.svg?height=400&width=500"
//                       alt="Team Collaboration"
//                       width={500}
//                       height={400}
//                       className="object-cover rounded-xl"
//                     />
//                   </div>
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
//               </div>

//               <div className="space-y-6">
//                 <h2 className="text-3xl font-bold">Our Vision</h2>
//                 <p className="text-gray-400">
//                   Founded in 2025, RaqamiX emerged from a simple yet powerful idea: financial transactions should be
//                   borderless, secure, and accessible to everyone. Our founders, experienced in both traditional finance
//                   and blockchain technology, recognized the potential for cryptocurrency to transform how we exchange
//                   value.
//                 </p>
//                 <p className="text-gray-400">
//                   Today, we're a team of over 50 passionate individuals across 12 countries, united by our commitment to
//                   building the future of decentralized finance. We believe that by removing intermediaries and leveraging
//                   the power of blockchain, we can create a more equitable financial system.
//                 </p>
//                 <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
//                   Meet Our Team <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Mission & Values Section */}
//         <section className="py-20 bg-gradient-to-b from-black to-blue-950/30">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-16">
//               <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
//                 What Drives Us
//               </Badge>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission & Values</h2>
//               <p className="text-gray-400 max-w-2xl mx-auto">
//                 The principles that guide our decisions and shape our company culture.
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8">
//               {[
//                 {
//                   title: "Mission",
//                   description:
//                     "To empower individuals and businesses with financial freedom through secure, efficient, and accessible decentralized payment solutions.",
//                   icon: Target,
//                   gradient: "from-blue-600 to-blue-400",
//                 },
//                 {
//                   title: "Vision",
//                   description:
//                     "A world where financial transactions are borderless, instantaneous, and controlled by individuals rather than institutions.",
//                   icon: Lightbulb,
//                   gradient: "from-purple-600 to-purple-400",
//                 },
//                 {
//                   title: "Values",
//                   description:
//                     "Transparency, security, innovation, inclusivity, and user empowerment guide everything we do.",
//                   icon: Users,
//                   gradient: "from-pink-600 to-pink-400",
//                 },
//               ].map((item, index) => (
//                 <Card
//                   key={index}
//                   className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm hover:bg-blue-900/20 transition-colors group"
//                 >
//                   <CardContent className="p-8">
//                     <div className="mb-6 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br border border-blue-800/50 shadow-lg">
//                       <div
//                         className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${item.gradient}`}
//                       >
//                         <item.icon className="w-5 h-5 text-white" />
//                       </div>
//                     </div>
//                     <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{item.title}</h3>
//                     <p className="text-gray-400">{item.description}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Roadmap Section */}
//         <section className="py-20 bg-black">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-16">
//               <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
//                 Our Journey
//               </Badge>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Roadmap</h2>
//               <p className="text-gray-400 max-w-2xl mx-auto">
//                 From our beginnings to our vision for the future, explore our development timeline.
//               </p>
//             </div>

//             <div className="relative">
//               {/* Timeline line */}
//               <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-900/50"></div>

//               {/* Timeline items */}
//               <div className="space-y-12">
//                 {[
//                   {
//                     date: "Q1 2021",
//                     title: "Company Founded",
//                     description:
//                       "RaqamiX was established with a vision to revolutionize digital payments using blockchain technology.",
//                     completed: true,
//                   },
//                   {
//                     date: "Q3 2021",
//                     title: "Beta Launch",
//                     description:
//                       "Released our first beta version supporting Bitcoin and Ethereum transactions with a focus on security and speed.",
//                     completed: true,
//                   },
//                   {
//                     date: "Q1 2022",
//                     title: "Multi-Currency Support",
//                     description:
//                       "Expanded our platform to support over 20 cryptocurrencies and introduced our mobile application.",
//                     completed: true,
//                   },
//                   {
//                     date: "Q4 2022",
//                     title: "Smart Contract Integration",
//                     description:
//                       "Launched programmable payment features with smart contract integration for automated transactions.",
//                     completed: true,
//                   },
//                   {
//                     date: "Q2 2023",
//                     title: "Enterprise Solutions",
//                     description:
//                       "Introduced enterprise-grade features for businesses including bulk payments and advanced analytics.",
//                     completed: false,
//                   },
//                   {
//                     date: "Q4 2023",
//                     title: "Global Expansion",
//                     description:
//                       "Expanding our services to new regions with localized support and compliance frameworks.",
//                     completed: false,
//                   },
//                   {
//                     date: "2024",
//                     title: "Decentralized Exchange",
//                     description:
//                       "Launching our own decentralized exchange to provide seamless currency swaps within our platform.",
//                     completed: false,
//                   },
//                 ].map((item, index) => (
//                   <div key={index} className="relative flex flex-col md:flex-row items-center">
//                     <div
//                       className={`flex-1 ${
//                         index % 2 === 0 ? "md:text-right md:pr-12" : "md:order-last md:text-left md:pl-12"
//                       }`}
//                     >
//                       <div
//                         className={`inline-block px-4 py-2 rounded-full mb-4 ${
//                           item.completed
//                             ? "bg-green-500/20 text-green-400"
//                             : "bg-blue-900/30 text-blue-400"
//                         }`}
//                       >
//                         {item.date}
//                       </div>
//                       <h3 className="text-xl font-bold mb-2">{item.title}</h3>
//                       <p className="text-gray-400">{item.description}</p>
//                     </div>

//                     <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
//                       <div
//                         className={`w-8 h-8 rounded-full border-4 ${
//                           item.completed
//                             ? "bg-green-500 border-green-500/30"
//                             : "bg-blue-900/50 border-blue-900/30"
//                         }`}
//                       >
//                         {item.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
//                       </div>
//                     </div>

//                     <div className={`flex-1 ${index % 2 === 0 ? "md:order-last md:text-left md:pl-12" : "md:pr-12"}`}>
//                       {/* Empty div for layout */}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Team Section */}
//         <section className="py-20 bg-gradient-to-b from-black to-blue-950/30">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-16">
//               <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
//                 Meet The Team
//               </Badge>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership</h2>
//               <p className="text-gray-400 max-w-2xl mx-auto">
//                 The talented individuals driving innovation and growth at RaqamiX.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols\
