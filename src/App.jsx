import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import MemoryGame from './pages/MemoryGame';

// המשחק לא דורש התחברות, ולכן אין כאן AuthProvider
// (הוא ניסה לפנות ל-/api של Base44, שלא קיים ב-GitHub Pages)
function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      {/* BASE_URL = '/Memory-shield-game/' ב-GitHub Pages, כדי שהנתיב הראשי יזוהה נכון */}
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MemoryGame />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
