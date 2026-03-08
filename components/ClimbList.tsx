import { Climb } from '@/data/seed-climbs'
import { ClimbCard } from './ClimbCard'

interface ClimbListProps {
  climbs: Climb[]
}

export const ClimbList = ({ climbs }: ClimbListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {climbs.map((climb) => (
        <ClimbCard key={climb.id} climb={climb} />
      ))}
    </div>
  )
}
