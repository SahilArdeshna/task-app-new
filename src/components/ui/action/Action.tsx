import { FC, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/solid'

import Icon from '../icon/Icon'
import { classNames } from '../../../utils/general'

export type IAction = { label: string; icon: FC }

type ActionProps = {
  data: any
  actions: IAction[]
  handleActionClick: (label: string, data: any) => void
}

const Action: FC<ActionProps> = ({ data, actions, handleActionClick }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
              <span className="sr-only">Open options</span>
              <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="z-40 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                {actions.map((action) => {
                  const ActionIcon = action.icon
                  return (
                    <Menu.Item key={action.label}>
                      {({ active }) => (
                        <span  onClick={() => handleActionClick(action.label, data)}
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'flex px-4 py-2 text-sm cursor-pointer'
                          )}
                        >
                          <Icon appendClass="mr-3">
                            <ActionIcon />
                          </Icon>
                          <span>{action.label}</span>
                        </span>
                      )}
                    </Menu.Item>
                  )
                })}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default Action
