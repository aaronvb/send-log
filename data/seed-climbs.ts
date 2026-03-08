export interface Climb {
  id: string
  name: string
  grade: string
  attempts: number
  sent: boolean
  date: string
}

export const SEED_CLIMBS: Climb[] = [
  {
    id: '1',
    name: 'Midnight Lightning',
    grade: 'V8',
    attempts: 12,
    sent: false,
    date: '2026-03-07',
  },
  {
    id: '2',
    name: 'The Mandala',
    grade: 'V10',
    attempts: 15,
    sent: false,
    date: '2026-03-06',
  },
  {
    id: '3',
    name: 'Sleepy Hollow',
    grade: 'V4',
    attempts: 3,
    sent: true,
    date: '2026-03-05',
  },
  {
    id: '4',
    name: 'Iron Man Traverse',
    grade: 'V7',
    attempts: 8,
    sent: true,
    date: '2026-03-03',
  },
  {
    id: '5',
    name: 'Warm Up Slab',
    grade: 'V1',
    attempts: 1,
    sent: true,
    date: '2026-03-02',
  },
  {
    id: '6',
    name: 'Pinch Overhang',
    grade: 'V5',
    attempts: 6,
    sent: true,
    date: '2026-02-28',
  },
  {
    id: '7',
    name: 'Crimpy Arete',
    grade: 'V6',
    attempts: 10,
    sent: false,
    date: '2026-02-26',
  },
  {
    id: '8',
    name: 'Dyno King',
    grade: 'V3',
    attempts: 2,
    sent: true,
    date: '2026-02-24',
  },
  {
    id: '9',
    name: 'Pocket Rocket',
    grade: 'V2',
    attempts: 1,
    sent: true,
    date: '2026-02-22',
  },
  {
    id: '10',
    name: 'The Nose Boulder',
    grade: 'V9',
    attempts: 14,
    sent: false,
    date: '2026-02-20',
  },
]
