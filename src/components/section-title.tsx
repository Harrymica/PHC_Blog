interface SectionTitleProps {
  title: string
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      <div className="flex-1 h-1 bg-accent rounded"></div>
    </div>
  )
}
