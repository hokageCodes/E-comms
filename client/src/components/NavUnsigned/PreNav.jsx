import { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from '../../assets/Logo.png'

const PreNav = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        // Fetch the location details when the component mounts
            const fetchLocation = async () => {
            try {
                const response = await axios.get('https://api.ipregistry.co/?key=e8k7kc2jtqzi9nwe');
                setLocation(response.data);
            } catch (error) {
                console.error('Error fetching location:', error.message);
            }
        };
        fetchLocation();
    }, []);

    return (
        <nav>
            <div className="logo">
                <img src={Logo} alt='' />
            </div>
            <div className="search">
                <input type="search" placeholder='search' />
            </div>
            <div className="countryCode">
                {/* <img src={location?.location?.flag.emojitwo} alt='' /> */}
                <span> {location?.location?.city},</span>
                <span> {location?.location?.country.name}</span>
            </div>
            <div className="auth">
                <a href="">Login</a>
                <a href="">Sign Up</a>
            </div>
    </nav>
    );
};

export default PreNav;
