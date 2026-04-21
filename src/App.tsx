import { useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { withAuthInfo, useRedirectFunctions, useLogoutFunction } from '@propelauth/react';
import { useSiteConfigStore } from './store/useSiteConfigStore';
import { useBranchStore } from './store/useBranchStore';
import { Editor } from './components/Editor';
import { BranchesView } from './components/BranchesView';
import SiteTemplate from './template/SiteTemplate';
import './App.css';

// ---------------------------------------------------------------------------
// Branch preview route — public, no auth required
// ---------------------------------------------------------------------------
function BranchPreview() {
  const { subdomain } = useParams<{ subdomain: string }>();
  const { branches } = useBranchStore();

  const branch = branches.find((b) => b.subdomain === subdomain);

  if (!branch) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <div className="text-center">
          <p className="text-2xl font-semibold mb-2">Branch not found</p>
          <p className="text-sm">No branch with subdomain "{subdomain}" exists.</p>
        </div>
      </div>
    );
  }

  const config = branch.publishedConfig ?? branch.config;
  return <SiteTemplate config={config} />;
}

// ---------------------------------------------------------------------------
// App — protected via withAuthInfo HOC
// ---------------------------------------------------------------------------
type AppProps = {
  isLoggedIn: boolean;
};

function AppContent({ isLoggedIn }: AppProps) {
  const { i18n } = useTranslation();
  const { config } = useSiteConfigStore();
  const { redirectToLoginPage } = useRedirectFunctions();
  const logout = useLogoutFunction();
  const hasAutoLoginAttempted = useRef(false);

  const onLogin = useCallback(() => {
    redirectToLoginPage({ postLoginRedirectUrl: window.location.href });
  }, [redirectToLoginPage]);

  useEffect(() => {
    if (!isLoggedIn && !hasAutoLoginAttempted.current) {
      hasAutoLoginAttempted.current = true;
      onLogin();
    }
  }, [isLoggedIn, onLogin]);

  useEffect(() => {
    if (config.settings.primaryLanguage !== i18n.language) {
      i18n.changeLanguage(config.settings.primaryLanguage);
    }
  }, [config.settings.primaryLanguage, i18n]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Router>
      <Routes>
        {/* Branch management dashboard */}
        <Route path="/" element={<BranchesView />} />

        {/* Editor for the active branch */}
        <Route path="/editor" element={<Editor />} />

        {/* Branch preview by subdomain — public */}
        <Route path="/preview/:subdomain" element={<BranchPreview />} />

        {/* Legacy full preview (uses active branch config) */}
        <Route path="/preview" element={<SiteTemplate config={config} />} />

        {/* Privacy Policy Page */}
        <Route
          path="/privacy"
          element={
            <div className="max-w-4xl mx-auto py-12 px-6">
              <h1 className="text-4xl font-bold mb-6">{config.pages.privacyPolicy.title}</h1>
              {config.pages.privacyPolicy.source === 'typed' ? (
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: config.pages.privacyPolicy.content,
                  }}
                />
              ) : (
                <div className="bg-gray-100 p-6 rounded-lg">
                  <p className="text-gray-600">PDF Document</p>
                </div>
              )}
            </div>
          }
        />

        {/* Terms & Conditions Page */}
        <Route
          path="/terms"
          element={
            <div className="max-w-4xl mx-auto py-12 px-6">
              <h1 className="text-4xl font-bold mb-6">{config.pages.termsConditions.title}</h1>
              {config.pages.termsConditions.source === 'typed' ? (
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: config.pages.termsConditions.content,
                  }}
                />
              ) : (
                <div className="bg-gray-100 p-6 rounded-lg">
                  <p className="text-gray-600">PDF Document</p>
                </div>
              )}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export const App = withAuthInfo(AppContent);

export default App;
