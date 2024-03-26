import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navv from './comp/nav';
import Signup from './comp/signup';
import Login from './comp/Login';
import Appointment from './comp/Home';
import List from './comp/List';
import Edit from './comp/Edit';
import Footer from './comp/Footer';
import PrivateComponent from './comp/privateComponent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navv />
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path='/Home' element={<Appointment />} />
            <Route path='/List' element={<List />} />
            <Route path='/Edit/:id' element={<Edit />} />
          </Route>

          <Route path='/' element={<Signup />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
