function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function formatFee(fee) {
  if (fee == null) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(fee)
}

function truncateBio(bio, maxLength = 120) {
  if (!bio) return ''
  if (bio.length <= maxLength) return bio
  return `${bio.slice(0, maxLength).trimEnd()}…`
}

export default function ProfessionalCard({ professional }) {
  const name = professional.userId?.username ?? 'Unknown'
  const avatar = professional.profileImage || professional.userId?.avatar
  const profession = professional.profession ?? ''
  const experienceYears = professional.experienceYears ?? 0
  const fee = professional.consultationFee
  const bio = truncateBio(professional.bio)

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-neutral-200 p-6 transition-colors hover:border-neutral-400">
      <div className="flex items-start gap-4">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-600"
            aria-hidden="true"
          >
            {getInitials(name)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-medium tracking-tight text-black">
            {name}
          </h2>
          <p className="mt-1 text-base text-neutral-500">{profession}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600">
        <span>
          <span className="text-neutral-400">Experience</span>{' '}
          <span className="font-medium text-black">
            {experienceYears} {experienceYears === 1 ? 'year' : 'years'}
          </span>
        </span>
        <span>
          <span className="text-neutral-400">Fee</span>{' '}
          <span className="font-medium text-black">{formatFee(fee)}</span>
        </span>
      </div>

      {bio && (
        <p className="line-clamp-3 text-base leading-relaxed text-neutral-600">
          {bio}
        </p>
      )}
    </article>
  )
}
