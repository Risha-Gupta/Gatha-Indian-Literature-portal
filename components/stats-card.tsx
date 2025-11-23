interface StatsCardProps {
  label: string
  value: string | number
  change?: string
  icon: string
}

export function StatsCard({ label, value, change, icon }: StatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      {change && (
        <p className={`text-xs ${change.includes("+") ? "text-green-600" : "text-red-600"}`}>
          {change} from last month
        </p>
      )}
    </div>
  )
}
