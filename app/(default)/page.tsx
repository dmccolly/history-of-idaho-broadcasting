import React from "react";
import DefaultLayout from "./layout";
import HeroHome from "../../components/hero-home";
import FeaturesHome from "../../components/features-home";
import VoxProPlayer from "../../components/broadcasting/voxpro-player";
import KeyAssignments from "../../components/broadcasting/key-assignments";


export default function HomePage() {
  return (
    <DefaultLayout>
      <main className="container mx-auto px-4">
        <HeroHome />
        <FeaturesHome />
        <section className="professional-broadcasting-tools">
          <h2>Professional Broadcasting Tools</h2>
          <VoxProPlayer />
          <KeyAssignments />
        </section>
      </main>
    </DefaultLayout>
  )
}

