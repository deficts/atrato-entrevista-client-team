import { useMediaQuery } from 'react-responsive';
import './App.css';
import ClientTable from './components/clientTable/clientTable';
import logo from './imgs/ColorLogo.png';
import icon from './imgs/ColorIcon.png';

function App() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div>
      {isMobile ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={icon} alt="Atrato logo" className="icon"></img>
        </div>
      ) : (
        <img src={logo} alt="Atrato logo" className="logo"></img>
      )}
      <ClientTable />
    </div>
  );
}

export default App;
