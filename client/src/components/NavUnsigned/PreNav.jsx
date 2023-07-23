import { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from '../../assets/Logo.png'
import './prenav.css'

const PreNav = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        // Fetch the location details when the component mounts
            const fetchLocation = async () => {
            try {
                const response = await axios.get('https://api.ipregistry.co/?key=e8k7kc2jtqzi9nwe');
                console.log(response)
                setLocation(response.data);
            } catch (error) {
                console.error('Error fetching location:', error.message);
            }
        };
        fetchLocation();
    }, []);

    return (
        <nav className='nav-container'>
            <div className="logo">
                <img src={Logo} alt='' />
            </div>
            <div className="search">
                <span></span>
                <input type="search" placeholder='search' />
            </div>
            <div className="countryCode">
                <img src={location?.location?.country?.flag.emojitwo} alt='' />
                <span> {location?.location?.city}, {location?.location?.country.name}</span>
                <span> </span>
            </div>
            <div className="auth">
                <a className='login' href="">Login</a>
                <a className='signup' href="/signup">Sign Up</a>
            </div>
        </nav>
    );
};

export default PreNav;
