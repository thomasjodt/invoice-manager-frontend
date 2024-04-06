import type { Vendor } from '@/types'

interface Props {
  vendor: Omit<Vendor, 'balance'>
}

export const VendorTag: React.FC<Props> = function ({ vendor, ...props }) {
  return (
    <div className='inline-flex flex-col items-start' {...props}>
      <p className='text-small text-inherit'>{vendor.name}</p>
      <p className='text-tiny text-foreground-400'>{vendor.fullName}</p>
    </div>
  )
}
