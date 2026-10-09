import React, { useState } from 'react';
import { Toaster } from '@alcspower/ui';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardView } from './views/DashboardView';
import { ExpedientesView } from './views/ExpedientesView';
import { ViewType } from './types';

export function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <AppLayout currentView={currentView} onSelectView={setCurrentView}>
        {currentView === 'dashboard' ? <DashboardView /> : <ExpedientesView />}
      </AppLayout>
    </>
  );
}

export default App;
