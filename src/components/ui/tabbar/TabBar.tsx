import cx from "classnames";

import Icon from "../icon/Icon";
import { FC, useEffect, useState } from "react";

type ITab = { id: string; title: string; icon: FC; isDisabled?: boolean };
type ITabBar = {
  tabs: ITab[];
  defaultTab?: string;
  tabChangeHandler: (value: string) => void;
};

const TabBar: FC<ITabBar> = ({ tabs, defaultTab, tabChangeHandler }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  useEffect(() => setSelectedTab(defaultTab), [defaultTab]);

  const isSelected = (tab: ITab) => tab.id === selectedTab;

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          onChange={(e) => tabChangeHandler(e.target.value)}
          defaultValue={tabs.find((tab) => isSelected(tab))?.id}
          className="block w-full focus:ring-brand-500 focus:border-brand-500 border-gray-300 rounded-md"
        >
          {tabs.map((tab) => (
            <option disabled={tab.isDisabled} key={tab.id} value={tab.id}>
              {tab.title}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              return (
                <button
                  key={tab.title}
                  disabled={tab.isDisabled}
                  onClick={() => tabChangeHandler(tab.id)}
                  aria-current={isSelected(tab) ? "page" : undefined}
                  className={cx(
                    isSelected(tab)
                      ? "border-brand-500 text-brand-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    { "cursor-default": tab.isDisabled },
                    "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                  )}
                >
                  {tab.icon && (
                    <Icon
                      className={cx(
                        isSelected(tab) ? "text-brand-500" : "text-gray-400",
                        { "cursor-default": tab.isDisabled },
                        "-ml-0.5 mr-2 h-5 w-5 fill-current"
                      )}
                    >
                      <tab.icon />
                    </Icon>
                  )}
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TabBar;
