import './App.css';
import NavBar from './components/NavBar';
import Lines from './AppRoutes';
import { useMediaQuery } from 'react-responsive';
import MenuOption from './components/MenuOption'


function App() {

  const isDesktop = useMediaQuery({minWidth: 768})
  return (
    <>
    {isDesktop
    ? <NavBar />
    : <MenuOption />}
    <Lines />
    </>
  );
}

export default App;
