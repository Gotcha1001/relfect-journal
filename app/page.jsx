import MotionWrapperDelay from "@/components/MotionWrapperDelay";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  ChevronRightIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  SparklesIcon,
  LockClosedIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import { Card, CardContent } from "@/components/ui/card";
import FeatureMotionWrapper from "@/components/FeatureMotionWrapper";
import { BarChart2, FileTextIcon } from "lucide-react";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import faqs from "@/data/faqs"
import { getDailyPrompt } from "@/actions/public";


export const metadata = {
  title: "Home Reflections",
};

const features = [
  {
    icon: BookOpenIcon,
    title: "Rich Text Editor",
    description:
      "Express yourself with a powerful editor supporting markdown, formatting, and more.",
  },
  {
    icon: SparklesIcon,
    title: "Daily Inspiration",
    description:
      "Get inspired with daily prompts and mood-based imagery to spark your creativity.",
  },
  {
    icon: LockClosedIcon,
    title: "Secure & Private",
    description:
      "Your thoughts are safe with enterprise-grade security and privacy features.",
  },
];

export default async function Home() {

  const advice = await getDailyPrompt();
  return (
    <div className="relative container mx-auto px-4 pt-16 pb-16">
      {/* Header Section */}
      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl gradient-title mb-6">
            Your Space to Reflect ...
            <br />
            Your Story To Tell
          </h1>
          <p className="text-lg md:text-xl text-indigo-800 mb-8">
            Capture your thoughts, track your moods, and reflect on your journey
            in a beautiful, secure space.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="journal"
                className="px-8 py-6 rounded-full flex items-center gap-2"
              >
                Start Writing <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                variant="outline"
                className="px-8 py-6 rounded-full border-indigo-900 text-indigo-900 hover:bg-indigo-600 hover:text-white"
              >
                Learn More <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </MotionWrapperDelay>

      {/* Today's Entry Section */}
      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-500 via-transparent to-transparent pointer-events-none z-10 " />
          <div className="bg-white rounded-2xl p-4 max-full mx-auto">
            <div className="border-b border-indigo-200 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="h-5 w-5 text-indigo-600" />
                <span className="text-indigo-900 font-medium">
                  Today&rsquo;s Entry
                </span>
              </div>
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-indigo-300" />
                <div className="h-3 w-3 rounded-full bg-indigo-400" />
                <div className="h-3 w-3 rounded-full bg-indigo-500" />
              </div>
            </div>
            <div className="space-y-4 p-4">
              <h3 className="text-xl font-semibold text-indigo-900 text-center">
                {advice ? advice : "My thoughts today"}
              </h3>
              <Skeleton className="h-4 bg-indigo-200 rounded w-3/4" />
              <Skeleton className="h-4 bg-indigo-200 rounded w-full" />
              <Skeleton className="h-4 bg-indigo-200 rounded w-2/4" />
            </div>
          </div>
        </div>
      </MotionWrapperDelay>
      {/* Features section */}
      <section
        id="features"
        className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <FeatureMotionWrapper key={feature.title} index={index}>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-indigo-200 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-xl text-indigo-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-indigo-700">{feature.description}</p>
              </CardContent>
            </Card>
          </FeatureMotionWrapper>
        ))}
      </section>
      {/*FEATURES Rich text editor and Mood analytics */}

      <div className="space-y-24 mt-24">
        <div className="grid md:grid-cols-2 gap-12">
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="space-y-6">
              <div className="h-12 w-12 bg-indigo-200 rounded-full flex items-center justify-center">
                <FileTextIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-indigo-900">
                Rich Text Editor
              </h3>
              <p className="text-lg text-indigo-700">
                Express yourself fully with our powerful editor featuring:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-400" />
                  <span className="">Format text with ease</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-400" />
                  <span className="">Embeded Links</span>
                </li>
              </ul>
            </div>
          </MotionWrapperDelay>
          {/* right side */}

          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="space-y-4 bg-white rounded-2xl shadow-xl p-4 border border-indigo-100">
              <div className="flex gap-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-indigo-300" />
                <div className="h-8 w-8 rounded-full bg-indigo-400" />
                <div className="h-8 w-8 rounded-full bg-indigo-500" />
              </div>
              <div className="h-4 bg-indigo-200 rounded w-3/4" />
              <div className="h-4 bg-indigo-300 rounded w-full" />
              <div className="h-4 bg-indigo-400 rounded w-2/3" />
              <div className="h-4 bg-indigo-500 rounded w-1/4" />
            </div>
          </MotionWrapperDelay>
        </div>

        {/* second section for the features */}

        <div className="grid md:grid-cols-2 gap-12">
          {/* left side */}
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="space-y-4 bg-white rounded-2xl shadow-xl p-4 border border-indigo-100">
              <div className="h-40 bg-gradient-to-t from-indigo-200 to-indigo-50 rounded-lg"></div>
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-indigo-200 rounded" />
                <div className="h-4 w-16 bg-indigo-200 rounded" />
                <div className="h-4 w-16 bg-indigo-200 rounded" />
              </div>
            </div>
          </MotionWrapperDelay>
          {/* right side */}
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="space-y-6">
              <div className="h-12 w-12 bg-indigo-200 rounded-full flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-indigo-900">
                Mood Analytics
              </h3>
              <p className="text-lg text-indigo-700">
                Track your emotional journey with powerful analytics:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-400" />
                  <span className="">Visual Mood Trends</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-400" />
                  <span className="">Pattern Recognition</span>
                </li>
              </ul>
            </div>
          </MotionWrapperDelay>
        </div>
      </div>
      {/* Carousel Testimonial server component */}
      <TestimonialCarousel />

      {/* Questions section  */}

      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full mx-auto">
            {faqs.map((faq, index) => {
              return <AccordionItem key={faq.q} value={`item=${index}`}>
                <AccordionTrigger className="text-indigo-900 text-lg">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-indigo-700">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            })}

          </Accordion>
        </div>
      </MotionWrapperDelay>
      {/*Last section  */}

      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <div className="mt-24">
          <Card className="bg-gradient-to-r from-indigo-200 to-purple-500">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-indigo-900 mb-6">
                Start Reflecting On Your Journey Today
              </h2>
              <p className="text-lg text-indigo-700 mb-8 max-w-2xl mx-auto">
                Join thousands of writers who have already discovered the power of digital journaling.
              </p>
              <Link href="/dashboard">
                <Button size="lg" variant="journal" className="animate-bounce">Get Started For Free<ChevronDoubleRightIcon className="ml-2 h-4 w-4" /></Button>
              </Link>

            </CardContent>
          </Card>
        </div>
      </MotionWrapperDelay>

    </div>



  );
}
