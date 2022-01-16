import './App.css';
import ClientTable from './components/clientTable/clientTable';
import logo from './imgs/ColorLogo.png';

function App() {
  return (
    <div>
      <img src={logo} alt="Atrato logo" className='logo'></img>
      <ClientTable/>
    </div>
  );
}

export default App;
