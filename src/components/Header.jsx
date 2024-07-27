import { A } from '@solidjs/router';
import styles from '../App.module.css';

function Header({ setShowMenu, showMenu }) {
    return (
        <header class={ styles.header }>
            <div class={ styles.headerInfo } >
                <img
                    class={ styles.headerHamburguer }
                    src='https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/menu-512.png'
                    onClick={() => setShowMenu(!showMenu())}
                />
                <A href='/'>
                    <img
                        src='https://th.bing.com/th/id/OIG2.Cpvv9ZqmkDzkaY181rLS?w=1024&h=1024&rs=1&pid=ImgDetMain'
                    />
                </A>
            </div>

            <div class={ styles.headerInfo }>
                <p>Julian Ramirez</p>
                    <img
                        class={ styles.headerUser }
                        src='https://static-00.iconduck.com/assets.00/profile-user-icon-2048x2048-m41rxkoe.png'
                    />
            </div>
        </header>
    );
}

export default Header;