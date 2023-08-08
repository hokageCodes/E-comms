import Logo from '../../assets/Logo.png'
import './mainnav.css'

export default function MainNav() {
    return (
        <nav className='mainnav-container'>
            <div className="logo">
                <img src={Logo} />
            </div>
            <div className="ul">
                <li>Shop</li>
                <li>Men</li>
                <li>Women</li>
                <li>Combos</li>
                <li>Joggers</li>
            </div>
            <div className="search">
                <span></span>
                <input type="search" placeholder='search' />
            </div>
            <div className="profile-options">
                <div className="love">
                    <i class="fa-regular fa-heart"></i>
                </div>
                <div className="account">
                    <i class="fa-regular fa-user"></i>
                </div>
                <div className="cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
            </div>
        </nav>
    )
}
