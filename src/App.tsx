import './theme/theme.pages.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import { LoginPage } from "./pages/Login/Page.Login"
import { ToastProvider } from "./context/Context.Toast";
import { AxiosInterceptor } from "./interceptors/axios.inteceptor";
import { BarNavigation } from "./components/Component.BarNavigation";
// import { FinancesPage } from "./pages/Finances/Page.Finances";
import { HomePage } from './pages/Home/Page.SongList';
import { SongListPage } from './pages/SongList/Page.SongList';
import { List } from './pages/Lists/Page.List';

AxiosInterceptor();

export const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
      <BarNavigation/>
        <Routes>
          {/* <Route path="/" element={<LoginPage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/songList" element={<SongListPage />} />
          <Route path="/lists" element={<List />} />
          {/* <Route path="/finances" element={<FinancesPage />} /> */}
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

