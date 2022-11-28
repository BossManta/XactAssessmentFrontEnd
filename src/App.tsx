import Navbar from './Components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DebtorsMaster from './Components/PageSpecific/Debtor/DebtorsMaster';
import StockMaster from './Components/PageSpecific/Stock/StockMaster';
import Invoice from './Components/PageSpecific/Invoice/Invoice';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1 className='text-4xl py-20 w-full text-center'>Timothy Bosman ERP</h1>}/>
          <Route path="/debtorsmaster" element={<DebtorsMaster/>}/>
          <Route path="/stockmaster" element={<StockMaster/>}/>
          <Route path="/invoice" element={<Invoice/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
