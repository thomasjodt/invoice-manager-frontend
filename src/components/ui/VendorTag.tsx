import type { Vendor } from '@/types'

interface Props {
  vendor: Pick<Vendor, 'name' | 'fullName'>
  classNames?: Partial<Record<'name' | 'fullName' | 'container', string>>
}

export const VendorTag: React.FC<Props> = function ({ vendor, classNames }) {
  return (
    <div className={`inline-flex flex-col items-start ${classNames?.container}`}>
      <p className={`text-small text-inherit text-start ${classNames?.name}`}>{vendor.name}</p>
      <p className={`text-tiny text-foreground-400 text-start ${classNames?.fullName}`}>{vendor.fullName}</p>
    </div>
  )
}
