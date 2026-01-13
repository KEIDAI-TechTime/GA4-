import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { AuthProvider } from "./context/AuthContext";

// Determine basename dynamically based on current URL
const getBasename = () => {
  // If URL starts with /ga4-analytics, use it as basename
  if (window.location.pathname.startsWith('/ga4-analytics')) {
    return '/ga4-analytics';
  }
  // Otherwise, use root (for Vercel preview/default domains)
  return '';
};

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <BrowserRouter basename={getBasename()}>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;
