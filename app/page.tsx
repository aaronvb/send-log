'use client'

import { useState } from 'react'
import { Climb, SEED_CLIMBS } from '@/data/seed-climbs'
import { ClimbForm } from '@/components/ClimbForm'
import { ClimbList } from '@/components/ClimbList'

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
      <h1 className="text-3xl font-bold mb-8 text-center">Send Log</h1>

      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <ClimbForm onAdd={addClimb} />
        </div>

        <ClimbList climbs={climbs} />
      </div>
    </main>
  )
}
