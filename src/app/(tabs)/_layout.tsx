import React from 'react';
import { TabBar } from './TabBar';

export const TabsLayout = ({ children }) => {
  return (
    <>
      {children}
      <TabBar />
    </>
  );
};