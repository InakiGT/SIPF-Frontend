import { createEffect } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';

function Suppliers() {
    createEffect(() => {
        checkLogin();
    });

    return (
        <div class={ styles.productsBg }>
            <p>Proveedores</p>
            
            <div class={ styles.productsButtons }>
                <button class={ styles.mainButton }>Personalizar</button>
                <button class={ styles.mainButton }>Nuevo</button>
            </div>

            <div class={` ${ styles.simpleCard } ${ styles.productsCard } `}>
                <div class={ styles.productsFilters }>
                    <div></div>
                    <input type='text' placeholder='Buscar' />
                </div>
                <div class={ styles.productsTitles }>
                    <p></p>
                    <p>Nombre</p>
                    <p>RFC</p>
                    <p>Teléfono</p>
                    <p>Móvil</p>
                    <p>Email</p>
                    <p>Término de pago</p>
                    <p>Importe máximo de crédito</p>
                    <p>Es compañía</p>
                </div>
                <div class={ styles.productsList }>
                    {
                        [1, 2, 3].map(() => (
                        <div class={ styles.productsProduct }>
                            <div>
                            <img src='https://cdn4.iconfinder.com/data/icons/banking-finance/32/shelf-menu-512.png' />
                            </div>
                            <p>Similares</p>
                            <p>UNRFC01</p>
                            <p>5500112200</p>
                            <p>5511223344</p>
                            <p>proveedor@correo.com</p>
                            <p>7 días</p>
                            <p>$4000.00</p>
                            <p>Sí</p>
                        </div>
                        ))
                    }
                </div>
            </div>

            <div class={ styles.productsBottomButtons }>
                <button class={ styles.secondaryButton }>Primero</button>
                <button class={ styles.secondaryButton }>Atrás</button>
                <p>1</p>
                <button class={ styles.secondaryButton }>Siguiente</button>
                <button class={ styles.secondaryButton }>Último</button>
            </div>
        </div>
    );
}

export default Suppliers;