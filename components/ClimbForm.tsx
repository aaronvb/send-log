import { useState } from 'react'
import { Climb } from '@/data/seed-climbs'

interface ClimbFormProps {
  onAdd: (climb: Omit<Climb, 'id'>) => void
}

const GRADES = ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10']

const todayString = () => new Date().toISOString().split('T')[0]

export const ClimbForm = ({ onAdd }: ClimbFormProps) => {
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('V0')
  const [attempts, setAttempts] = useState(1)
  const [sent, setSent] = useState(false)
  const [date, setDate] = useState(todayString)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({ name, grade, attempts, sent, date })
    setName('')
    setGrade('V0')
    setAttempts(1)
    setSent(false)
    setDate(todayString())
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-4 flex flex-wrap items-end gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="climb-name" className="text-sm text-gray-400">Name</label>
        <input
          id="climb-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:border-blue-500"
          placeholder="Problem name"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="climb-grade" className="text-sm text-gray-400">Grade</label>
        <select
          id="climb-grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:border-blue-500"
        >
          {GRADES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="climb-attempts" className="text-sm text-gray-400">Attempts</label>
        <input
          id="climb-attempts"
          type="number"
          min={1}
          required
          value={attempts}
          onChange={(e) => setAttempts(Number(e.target.value))}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-100 w-24 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="climb-date" className="text-sm text-gray-400">Date</label>
        <input
          id="climb-date"
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:border-blue-500"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer self-center">
        <input
          type="checkbox"
          checked={sent}
          onChange={(e) => setSent(e.target.checked)}
          className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-green-500 focus:ring-0"
        />
        <span className="text-sm text-gray-300">Sent</span>
      </label>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition-colors"
      >
        Add Climb
      </button>
    </form>
  )
}
