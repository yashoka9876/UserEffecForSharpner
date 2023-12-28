import React ,{useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(()=>{
  //   const loginInformation=localStorage.getItem('itemName');
  //   if(loginInformation==='1'){
  //     setIsLoggedIn(true);
  //   }
  // },[])

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem('itemName','1');
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.setItem('itemName','0');
  //   setIsLoggedIn(false);
  // };

  const ctx=useContext(AuthContext)
  return (
      <>
        <MainHeader />
        <main>
          {!ctx.isLoggedIn && <Login />}
          {ctx.isLoggedIn && <Home  />}
        </main>
      </>
      
    
  );
}

export default App;
