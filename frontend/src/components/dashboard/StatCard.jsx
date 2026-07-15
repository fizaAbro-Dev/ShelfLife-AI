function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBoxClass = "bg-green-100 text-green-700",
}) {
  return (
    <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <h3 className="mt-3 text-3xl font-bold text-gray-900">
            {value}
          </h3>

          <p className="mt-2 text-xs font-medium text-gray-500">
            {subtitle}
          </p>
        </div>

        {Icon && (
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBoxClass}`}
          >
            <Icon size={24} />
          </div>
        )}
      </div>
    </article>
  );
}

export default StatCard;