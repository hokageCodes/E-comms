import Logo from '../../assets/Logo.png'

export default function PreNav({country}) {
    console.log(country);
    return (
        <nav>
            <div className="logo">
                <img src={Logo} alt='' />
            </div>
            <div className="search">
                <input type="search" placeholder='search' />
            </div>
            <div className="countryCode">
                <img src={country?.flag} alt='' />
                <span>{country?.name}</span>
            </div>
        </nav>
    )
}

