import { Climb } from '@/data/seed-climbs'

interface ClimbCardProps {
  climb: Climb
}

const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-')
  return `${month}/${day}/${year}`
}

export const ClimbCard = ({ climb }: ClimbCardProps) => {
  return (
    <div className={`bg-gray-800 rounded-lg p-4 flex items-center justify-between gap-4 border-l-4 ${
      climb.sent ? 'border-green-500' : 'border-yellow-500'
    }`}>
      <div className="min-w-0 flex-1">
        <h3 className={`text-lg font-semibold truncate ${
          climb.sent ? 'text-green-50' : 'text-yellow-50'
        }`}>{climb.name}</h3>
        <p className="text-sm text-gray-400 mt-1">
          {formatDate(climb.date)} &middot; {climb.attempts} {climb.attempts === 1 ? 'attempt' : 'attempts'}
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-sm font-mono font-bold text-gray-200">{climb.grade}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded inline-flex items-center gap-1 ${
          climb.sent
            ? 'bg-green-900/50 text-green-400'
            : 'bg-yellow-900/50 text-yellow-400'
        }`}>
          {climb.sent ? '\u2713 Sent' : 'Project'}
        </span>
      </div>
    </div>
  )
}
