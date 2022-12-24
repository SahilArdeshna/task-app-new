import { FC } from 'react'
import Icon from '../icon/Icon'
import { ReactComponent as DatabaseIcon } from '../../../icons/database.svg'

type IEmpty = { title: string; showIcon?: boolean; onClick?: () => void; icon?: FC }

const Empty: FC<IEmpty> = ({ title, icon, showIcon = true, onClick }) => {
  const EmptyIcon = icon || DatabaseIcon

  return (
    <button
      type="button"
      className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
      onClick={onClick}
    >
      {showIcon && (
        <Icon className="mx-auto h-12 w-12 text-gray-400">
          <EmptyIcon />
        </Icon>
      )}
      <span className="mt-2 block text-sm font-medium text-gray-900">{title}</span>
    </button>
  )
}

export default Empty
