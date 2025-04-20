import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white text-black py-32 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          Find Trusted Cleaners Near You
        </h1>
        <div className="mt-12 flex justify-evenly">
          <Image
            src="/cleaner.png"
            alt="Cleaner Illustration"
            width={240}
            height={240}
            priority
          />

          <p className="text-lg max-w-2xl mt-18 mx-auto justify-end">
            Connect with professional, background-checked cleaners in just a few
            clicks. Safe, reliable, and affordable cleaning services at your
            fingertips.
          </p>
        </div>
        <Button size="lg" className="px-10">
          Get Started
        </Button>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Cleaners Hub?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow shadow-green-100">
            <CardContent>
              <CardTitle>Verified Professionals</CardTitle>
              <CardDescription>
                All cleaners are background-checked and highly rated by previous
                clients.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow shadow-green-100">
            <CardContent>
              <CardTitle>Easy Booking</CardTitle>
              <CardDescription>
                Schedule and manage cleaning appointments directly from your
                dashboard.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow shadow-green-100">
            <CardContent>
              <CardTitle>Affordable Plans</CardTitle>
              <CardDescription>
                Choose from flexible pricing plans that fit every budget and
                need.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-white text-black py-32 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          Our cleaners are ready to help you!
        </h1>
        <p className="text-lg mt-8 mb-8 max-w-2xl mx-auto">
          Professional cleaners in your fingertips.
        </p>
        <Button size="lg" className="px-10">
          Try it
        </Button>
        <div className="mt-4 flex justify-start">
          <Image
            src="/cleaner-cta.png"
            alt="Cleaner Illustration"
            width={240}
            height={240}
            priority
          />
        </div>
      </section>
    </div>
  );
}
