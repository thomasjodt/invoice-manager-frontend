interface Props extends React.ComponentProps<'svg'> {
  size?: number
  className?: string
}

export const VerticalDotsIcon: React.FC<Props> = function ({ size = 24, className = '' }) {
  return (
    <svg
      aria-hidden='true'
      fill='none'
      focusable='false'
      height={size}
      role='presentation'
      viewBox='0 0 24 24'
      width={size}
      className={className}
    >
      <path
        d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
        fill='currentColor'
      />
    </svg>
  )
}
