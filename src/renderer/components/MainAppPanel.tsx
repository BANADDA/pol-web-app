import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PolarisStudio from './Studio/PolarisStudio';
import PolarisWelcome from './Welcome/PolarisWelcome';

interface MainAppPanelProps {
  themeSetter: (theme: string) => void;
}

function MainAppPanel({ themeSetter }: MainAppPanelProps) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleGetStarted = () => {
    navigate('/studio');
  };

  return (
    <Routes>
      <Route
        path="/welcome"
        element={
          <PolarisWelcome
            themeSetter={themeSetter}
            onGetStarted={handleGetStarted}
          />
        }
      />
      <Route
        path="/"
        element={
          <PolarisWelcome
            themeSetter={themeSetter}
            onGetStarted={handleGetStarted}
          />
        }
      />
      <Route
        path="/studio"
        element={
          <PolarisStudio darkMode={darkMode} themeSetter={themeSetter} />
        }
      />
      <Route
        path="/*"
        element={
          <PolarisStudio darkMode={darkMode} themeSetter={themeSetter} />
        }
      />
    </Routes>
  );
}

export default MainAppPanel;
