import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { currentUser } = useRestaurant();

  if (!currentUser) {
    return <LoginPage />;
  }

  return <Dashboard />;
}

export default function App() {
  return (
    <RestaurantProvider>
      <AppContent />
      <Toaster position="top-right" />
    </RestaurantProvider>
  );
}
