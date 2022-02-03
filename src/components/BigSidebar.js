import Wrapper from '../assets/wrappers/BigSidebar';
import Logo from './Logo';
import NavLinks from './NavLinks';
import { useAppContext } from '../context/appContext';

const BigSidebar = () => {
  const { showSidebar } = useAppContext();
  //mozemy przekazac toggleSidebar zeby po kliknieciu w Navlink chowala Nam sie zawarosc calego Bigsidebara!!!
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
