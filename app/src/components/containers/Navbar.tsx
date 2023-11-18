import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const iconHome: any = "fa-solid fa-house"
    const iconClipboard: any = "fa-solid fa-clipboard"
    const iconUsers: any = "fa-solid fa-user"
    const iconLogout: any = "fa-solid fa-lock"
    
    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.removeItem('token')
        navigate('/')
    }
    const gotTo: any = (route: string) => {
        navigate(route)
    }

    return (
        <header>
            <nav className='navbar navbar-expand-lg navbar-llight bg-light'>
                <div className='container-fluid'>
                    <span className='btn btn-info float-start nav-item' onClick={() => gotTo('/dashboard')}>
                        <FontAwesomeIcon icon={iconHome} />
                    </span>
                    <span className='btn btn-secondary float-start nav-item' onClick={() => gotTo('/ordenes')}>
                        <FontAwesomeIcon icon={iconClipboard} />
                    </span>
                    <span className='btn btn-warning float-start nav-item' onClick={() => gotTo('/usuarios')}>
                        <FontAwesomeIcon icon={iconUsers} />
                    </span>
                    <span className='btn btn-danger float-end' onClick={logout}>
                        <FontAwesomeIcon icon={iconLogout} />
                    </span>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
