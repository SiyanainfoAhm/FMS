import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { AppSessionProvider } from "./context/AppSessionContext";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AppSessionProvider>
        <BrowserRouter basename={__BASE_PATH__}>
          <AppRoutes />
        </BrowserRouter>
      </AppSessionProvider>
    </I18nextProvider>
  );
}

export default App;