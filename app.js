import logo from "./logo.svg";
import "./App.css";
import i18n from "./i18n";
import UserMenu from "./components/navbar/UserMenu";
import { Header } from "next/dist/lib/load-custom-routes";
import { Suspense } from "react";
import LocaleContext from "./LocaleContext";

function Loading() {
  return <>Loading....</>;
}
function App() {
  const [locale, setLocale] = useState(i18n.language);
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value); //en or fr or sp
  };
  return (
    <>
      <div className="App">
        <header className="App-header">
          <LocaleContext.Provider value={{ locale, setLocale }}>
            <Suspense fallback={<Loading />}>
              <div>
                <label>Locale Change</label>
                <select value={locale} onChange={handleChange}>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="sp">Spanish</option>
                </select>
              </div>
              <UserMenu />
            </Suspense>
          </LocaleContext.Provider>
        </header>
      </div>
    </>
  );
}
export default App;