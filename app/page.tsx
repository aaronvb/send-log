'use client'

import { useState } from 'react'
import { Climb, SEED_CLIMBS } from '@/data/seed-climbs'

const sortByDateDesc = (climbs: Climb[]) =>
  [...climbs].sort((a, b) => b.date.localeCompare(a.date))

export default function Home() {
  const [climbs, setClimbs] = useState<Climb[]>(() => sortByDateDesc(SEED_CLIMBS))

  const addClimb = (climbData: Omit<Climb, 'id'>) => {
    const newClimb: Climb = {
      ...climbData,
      id: crypto.randomUUID(),
    }
    setClimbs((prev) => sortByDateDesc([...prev, newClimb]))
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Send Log</h1>

      {/* ClimbForm will be wired here */}
      <div className="mb-8" />

      {/* ClimbList will be wired here */}
      <div>
        <p className="text-gray-400">{climbs.length} climbs loaded</p>
      </div>
    </main>
  )
}
