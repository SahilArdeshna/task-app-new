import { NavLink } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, MutableRefObject, useEffect, useState } from "react";

import Icon from "../icon/Icon";
import { ReactComponent as UserIcon } from "../../../icons/user.svg";
import { ROUTE_TASKS, ROUTE_PROFILE } from "../../../utils/constants";
import { ReactComponent as TasksIcon } from "../../../icons/tasks.svg";
import { ReactComponent as TimesIcon } from "../../../icons/times.svg";

const navigation = [
  {
    name: "Tasks",
    href: `${ROUTE_TASKS}?type=all`,
    icon: TasksIcon,
    current: true,
  },
  {
    name: "Profile",
    href: ROUTE_PROFILE,
    icon: UserIcon,
    current: false,
  },
];

type ISidebar = {
  buttonRef: MutableRefObject<any>;
};

const Sidebar: FC<ISidebar> = ({ buttonRef }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!buttonRef.current) return;

    buttonRef.current.onclick = () => setSidebarOpen(true);
  }, [buttonRef]);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 lg:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-brand-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <Icon appendClass="flex-shrink-0 text-white">
                      <TimesIcon aria-hidden="true" />
                    </Icon>
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                {/* <div className="flex items-center flex-shrink-0 px-4"> */}
                <img
                  alt="Logo"
                  src="/images/logo_512.png"
                  className="mx-auto h-14 w-auto"
                />
                {/* </div> */}
              </div>
              <nav
                className="mt-5 flex-shrink-1 h-full divide-y divide-brand-800 overflow-y-auto"
                aria-label="Sidebar"
              >
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `text-brand-100 hover:text-white hover:bg-brand-600 group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md ${
                          isActive ? "bg-brand-800 text-white" : ""
                        }`
                      }
                      aria-current={item.current ? "page" : undefined}
                    >
                      <Icon
                        appendClass="mr-4 flex-shrink-0"
                        removeClass="text-gray-400"
                      >
                        <item.icon aria-hidden="true" />
                      </Icon>
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </nav>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-brand-700 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                alt="Logo"
                src="/images/logo_512.png"
                className="mx-auto h-14 w-auto"
              />
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-brand-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `text-brand-100 hover:text-white hover:bg-brand-600 group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md ${
                        isActive ? "bg-brand-800 text-white" : ""
                      }`
                    }
                    aria-current={item.current ? "page" : undefined}
                  >
                    <Icon
                      appendClass="mr-4 flex-shrink-0"
                      removeClass="text-gray-400"
                    >
                      <item.icon aria-hidden="true" />
                    </Icon>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
