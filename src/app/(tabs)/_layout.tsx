import React from 'react';
import { TabBar } from './TabBar';
export default function TabLayout({ children }) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );}