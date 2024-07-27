import { A, useNavigate } from '@solidjs/router';
import styles from '../App.module.css';

function SideMenu({ setShowMenu, showMenu }) {
    const navigate = useNavigate();

    const redirect = (url) => {
        setShowMenu(false);
        navigate(url);
    }

    return (
        <aside class={ styles.sideMenu } style={ `display: ${showMenu() ? 'block' : 'none'}`  }>
            <nav>
                <ul>
                    <li>
                        <label htmlFor="menu-sales"><img src='https://i.pinimg.com/originals/63/29/3a/63293a3fa5fed5f620b4113b722063c5.png' />Ventas</label>
                        <input id="menu-sales" type='checkbox' />
                        <ul class={ styles.subMenu }>
                            <li onClick={() => redirect('/sells')}>Punto de venta</li>
                        </ul>
                    </li>
                    <li>
                        <label htmlFor="menu-buys"> <img src='https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/buy-512.png' /> Compras</label>
                        <input id="menu-buys" type='checkbox' />
                        <ul class={ styles.subMenu } > 
                            <li onClick={() => redirect('/products')}>Productos</li>
                            <li onClick={() => redirect('/suppliers')}>Proveedores</li>
                            <li onClick={() => redirect('/order')}>Ordenes de compra</li>
                            <li onClick={() => redirect('/bills')}>Facturas de proveedor</li>
                            <li>Pagos de proveedor</li>
                        </ul>
                    </li>
                    <li>
                        <label htmlFor="menu-inventory"> <img src='https://cdn-icons-png.freepik.com/512/1253/1253980.png' /> Inventario</label>
                        <input id="menu-inventory" type='checkbox' />
                        <ul class={ styles.subMenu }>
                            <li onClick={() => redirect('/inventory')}>Inventario de productos</li>
                            <li onClick={() => redirect('/products')}>Productos</li>
                            <li onClick={() => redirect('/new-inventory-entrance')}>Nueva entrada de inventario</li>
                        </ul>
                    </li>
                    <li>
                        <label htmlFor="menu-suppliers"> <img src='https://cdn-icons-png.flaticon.com/512/7570/7570228.png' /> Proveedores</label>
                        <input id="menu-suppliers" type='checkbox' />
                        <ul class={ styles.subMenu }>
                            <li onClick={() => redirect('/suppliers')}>Proveedores</li>
                            <li onClick={() => redirect('/supplier-types')}>Tipo de proveedor</li>
                            <li onClick={() => redirect('/payment-terms')}>Términos de pago</li>
                        </ul>
                    </li>
                    <li>
                        <label htmlFor="menu-products"> <img src='https://cdn-icons-png.flaticon.com/512/1311/1311095.png' /> Productos</label>
                        <input id="menu-products" type='checkbox' />
                        <ul class={ styles.subMenu }>
                            <li onClick={() => redirect('/products')}>Productos</li>
                            <li onClick={() => redirect('/brands')}>Marcas</li>
                            <li onClick={() => redirect('/categories')}>Categorías</li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default SideMenu;