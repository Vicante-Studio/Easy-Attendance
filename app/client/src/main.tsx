import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import CounterPage from './pages/counter/CounterPage.tsx';
import AdminPage from './pages/admin/AdminPage.tsx';
import NotFoundPage from './pages/404/NotFoundPage.tsx';
import CreateSectionPage from './pages/admin/forms/CreateSection.tsx';
import CreateServicePage from './pages/admin/forms/CreateService.tsx';
import EditSectionForm from './components/features/churchSection/EditSectionForm.tsx';
import EditServiceForm from './components/features/churchService/EditServiceForm.tsx';
import AdminHistory from './pages/history/AdminHistory.tsx';
import CounterHistory from './pages/history/CounterHistory.tsx';

const router = createHashRouter([
  {
    path: '/',
    element: <CounterPage />
  },
  {
    path: '/adminPage',
    element: <AdminPage />
  },
  {
    path: '/createSection',
    element: <CreateSectionPage />,
  },
  {
    path: '/createSection/:section_id/edit',
    element: <EditSectionForm />
  },
  {
    path: '/createService',
    element: <CreateServicePage />,
  },
  {
    path: '/createService/:service_id/edit',
    element: <EditServiceForm />
  },
  {
    path: '/history/admin',
    element: <AdminHistory />
  },
  {
    path: '/history/counter',
    element: <CounterHistory />
  },
  {
    path: '*',
    element: <NotFoundPage />,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
