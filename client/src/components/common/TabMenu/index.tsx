import React, { useState } from 'react';
import { StyledTabMenuButtonGroup, StyledTabMenuButton } from './styles';

type TabMenuPropType = {
  list: {
    tabName: string;
    children: JSX.Element;
  }[];
};

const TabMenu = ({ list }: TabMenuPropType): JSX.Element => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const clickHandler = (selectedTabIndex: number) => setActiveTabIndex(selectedTabIndex);
  return (
    <>
      <StyledTabMenuButtonGroup>
        {list.map(({ tabName }, idx) => (
          <StyledTabMenuButton
            type="button"
            key={`tab_${tabName}`}
            onClick={() => clickHandler(idx)}
          >
            {tabName}
          </StyledTabMenuButton>
        ))}
      </StyledTabMenuButtonGroup>
      <div>{list[activeTabIndex].children}</div>
    </>
  );
};

export default TabMenu;
