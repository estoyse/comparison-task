import { Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { Home } from "./pages/Home";
import { Compare } from "./pages/Compare";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/compare' element={<Compare />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
