import { createEffect } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';

function InventoryTweaks() {
    createEffect(() => {
        checkLogin();
    });

    return (
        <div class={ styles.productsBg }>
            <p>Ajustes de inventario</p>
            
            <div class={ styles.productsButtons }>
                <button class={ styles.mainButton }>Personalizar</button>
                <button class={ styles.mainButton }>Nuevo</button>
            </div>

            <div class={` ${ styles.simpleCard } ${ styles.productsCard } `}>
                <div class={ styles.productsFilters }>
                    <div>
                        <p>Filtrar: </p>
                        <select>
                            <option>Tipo de ajuste</option>
                        </select>
                    </div>
                </div>
                <div class={ styles.productsTitles }>
                    <p></p>
                    <p>Folio</p>
                    <p>Ubicación</p>
                    <p>Tipo de ajuste</p>
                    <p>Referencia</p>
                    <p>Estado</p>
                    <p>Fecha de registro</p>
                    <p>Usuario que canceló</p>
                </div>
                <div class={ styles.productsList }>
                    {
                        [1, 2, 3].map(() => (
                        <div class={ styles.productsProduct }>
                            <div>
                                <img src='https://cdn4.iconfinder.com/data/icons/banking-finance/32/shelf-menu-512.png' />
                            </div>
                            <p>AJU0001</p>
                            <p>Almacen Matriz</p>
                            <p>Ajuste de entrada</p>
                            <p>Compra</p>
                            <p>En proceso</p>
                            <p>29/04/24 19:25</p>
                            <p></p>
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

export default InventoryTweaks;