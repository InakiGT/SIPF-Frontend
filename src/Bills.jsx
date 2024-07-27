import { createEffect } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';

function Bills() {
    createEffect(() => {
        checkLogin();
      });

    return (
        <div class={ styles.productsBg }>
            <p>Facturas de proveedor</p>
            
            <div class={ styles.productsButtons }>
                <button class={ styles.mainButton }>Personalizar</button>
                <button class={ styles.mainButton }>Nuevo</button>
            </div>

            <div class={` ${ styles.simpleCard } ${ styles.productsCard } `}>
                <div class={ styles.productsFilters }>
                    <div>
                        <p>Filtrar: </p>
                        <select>
                            <option>Estado</option>
                        </select>
                    </div>
                    <input type='text' placeholder='Buscar' />
                </div>
                <div class={ styles.productsTitles }>
                    <p></p>
                    <p>Folio</p>
                    <p>Proveedor</p>
                    <p>Saldo</p>
                    <p>Importe total</p>
                    <p>Término de pago</p>
                    <p>Estado</p>
                    <p>Fecha de registro</p>
                    <p>Fecha de factura</p>
                    <p>Nombre de sucursal</p>
                </div>
                <div class={ styles.productsList }>
                    {
                        [1, 2, 3].map(() => (
                        <div class={ styles.productsProduct }>
                            <div>
                            <img src='https://cdn4.iconfinder.com/data/icons/banking-finance/32/shelf-menu-512.png' />
                            </div>
                            <p>ENT0001</p>
                            <p>GAR</p>
                            <p>$700.00</p>
                            <p>$13200.00</p>
                            <p>7 días</p>
                            <p>Por pagar</p>
                            <p>29/04/05 19:30</p>
                            <p>29/04/05 19:30</p>
                            <p>Sucursal Matríz</p>
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

export default Bills;