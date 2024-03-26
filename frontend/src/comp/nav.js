import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navv() {

  const auth = localStorage.getItem('user');
  const navigate = useNavigate()
  const Logout = () => {
    localStorage.clear();
    navigate('/Login')
  }


  return (
    <div className='container-fluid'>
      <img className='logo' src={require('./img/logo.png')} />
      {auth ? <ul className='nav-ul'>
        <li></li>
        <li><Link to='/Home'>Home</Link></li>
        <li> <Link to='/List'>List</Link></li>
        <li><Link onClick={Logout} to='/Login'>Logout ( {JSON.parse(auth).name} )</Link></li>
      </ul>
        :
        <ul className='nav-ul  right-nav' >
          <li className='right-nav'><Link to='/Login'>Login</Link></li>
          <li className='right-nav'> <Link to='/'>Signup</Link></li>
        </ul>
      }
    </div>
  );
}

export default Navv;