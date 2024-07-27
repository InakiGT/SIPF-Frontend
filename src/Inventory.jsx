import { Show, createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';
import Api from './helpers/api';
import Loader from './components/Loader';
import { useNavigate } from '@solidjs/router';

function Inventory() {
    createEffect(() => {
        checkLogin();
    });

    const navigate = useNavigate();

    const api = new Api('http://localhost:5024/api/Inventario/ObtenerInventario');

    const [ inventory, setInventory ] = createSignal(null);
    const [ currentProducts, setCurrentProducts ] = createSignal(null);
    const [ position, setPosition ] = createSignal(0);

    createEffect(async () => {
        const data = await api.Get();
        setInventory(data.data);
        setCurrentProducts(inventory().slice(position() * 4, position() + 4));
    });

    createEffect(() => {
        if (inventory()) {
            setCurrentProducts(inventory().slice(position() * 4, position() * 4 + 4));
        }
    });

    const increment = () => {
        setPosition(inventory().length / 4 > position() + 1 ? position() + 1 : position());
    }

    const decrement = () => {
        setPosition(position() !== 0 ? position() - 1 : 0);
    }

    return (
        <div class={ styles.buyMainCard }>
            <p>Inventario</p>
            <div class={` ${ styles.simpleCard } `}>
                <div class={ styles.inventoryTitle }>
                    <img src='https://icons.veryicon.com/png/o/miscellaneous/tx/real-time-inventory-diagram.png' />
                    <p>Inventario</p>
                </div>

                <div class={ styles.inventoryOptions }>
                    <p>Exportar excel</p>
                    <p>Exportar excel con detalle</p>
                    <p>Exportar excel plano</p>
                    <p>Exportar pdf</p>
                    <p>Imprimir</p>
                    <p>Enviar excel por email</p>
                    <p>Enviar pdf por email</p>
                </div>

                <div class={ styles.inventoryFilters }>
                    <p>Buscar: </p>
                    <input type='text' placeholder='Buscar' />
                </div>

                <div class={ styles.productsList }>
                <Show when={ currentProducts() } fallback={ <Loader /> }>
                    <div class={ styles.productsTitles }>
                        <p></p>
                        <p>ID</p>
                        <p>Producto ID</p>
                        <p>Nombre del Producto</p>
                        <p>Categoria</p>
                        <p>Precio Unitario</p>
                        <p>Stock Actual</p>
                        <p>Stock Mínimo</p>
                        <p>Número de lote</p>
                        <p>Fecha Entrada</p>
                        <p>Fecha Salida</p>
                    </div>
                    <div class={ styles.productsList }>
                    <For each={ currentProducts() }>
                            {
                                (product) =>
                                <div class={ styles.productsProduct } onClick={ () => navigate(`/inventory-item?id=${ product.id }`) }>
                                    <div>
                                    <img src='https://cdn4.iconfinder.com/data/icons/banking-finance/32/shelf-menu-512.png' />
                                    </div>
                                    <p>{ product.id }</p>
                                    <p>{ product.productoId }</p>
                                    <p>{ product.producto }</p>
                                    <p>{ product.categoria }</p>
                                    <p>${ product.precioUnitario }</p>
                                    <p>{ product.stockActual }</p>
                                    <p>{ product.stockMinimo }</p>
                                    <p>{ product.numeroLote }</p>
                                    <p>{ product.fechaEntrada }</p>
                                    <p>{ product.fechaSalida }</p>
                                </div>
                            }
                    </For>
                    </div>
                </Show>
                </div>
            </div>

            <div class={ styles.productsBottomButtons }>
                <button 
                    class={ styles.secondaryButton }
                    onClick={ () => setPosition(0) }
                >Primero</button>
                <button 
                    class={ styles.secondaryButton }
                    onClick={() => decrement()}
                >Atrás</button>
                <p>{ position() + 1 }</p>
                <button 
                    class={ styles.secondaryButton }
                    onClick={() => increment()}
                >Siguiente</button>
                <button 
                    class={ styles.secondaryButton }
                    onClick={() => setPosition(Math.round(products().length / 4 - 1))}
                >Último</button>
            </div>
        </div>
    );
}

export default Inventory;