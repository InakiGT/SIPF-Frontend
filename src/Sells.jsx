import { For, Show, createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import Api from './helpers/api';
import Loader from './components/Loader';
import SellCard from './components/SellCard';
import SellItem from './components/SellItem';
import checkLogin from './helpers/checkLogin';

function Sells() {
    createEffect(() => {
        checkLogin();
    });
    
    const api = new Api('http://localhost:5024/api/Producto/BuscarProducto');

    let lastKeyTime = Date.now();
    let keys = '';
    let dialog;

    const [ selectedProduct, setSelectedProduct ] = createSignal(false);
    const [ isDialogOpen, setIsDialogOpen ] = createSignal(false);
    const [ search, setSearch ] = createSignal(null);
    const [ items, setItems ] = createSignal([]);
    const [ cart, setCart ] = createSignal([]);

    const searchItem = async () => {
        const data = await api.Get('', {
            searchTerm: search(),
        });

        setItems(data.data);
    };

    document.addEventListener('keydown', async (e) => {
        const currentTime = Date.now();

        if (currentTime - lastKeyTime > 50) {
            lastKeyTime = currentTime;
            return;
        }

        lastKeyTime = currentTime;
        keys += e.key;

        if (e.code === 'Enter') {
            keys = keys.slice(0, keys.length - 5);
            setSearch(keys);
            keys = '';

            await searchItem();
        }
    });

    const showProduct = (item) => {
        setSelectedProduct(item);
        setIsDialogOpen(true);

        dialog.showModal();
    };
    
    const closeDialog = () => {
        setIsDialogOpen(false);
        dialog.close();
    }

    return (
        <div class={ styles.sells }>
            <div class={ styles.dialogContainer }>
                <dialog class={ styles.mainDialog } ref={el => dialog = el} onClick={e => dialog.close()}>
                    <div>
                        <div class={ styles.closeDialog }>
                            <img
                                src='https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png' 
                                onClick={ () => closeDialog() }
                            />
                        </div>
                        <div class={ styles.dialogContent }>
                            <img src='https://s.wsj.net/public/resources/images/BN-IF460_MEDICA_M_20150503171927.jpg' />
                            <div>
                                <div>
                                    <p>SKU</p>
                                    <p>{ selectedProduct().sku }</p>
                                </div>
                                <div>
                                    <p>Modelo</p>
                                    <p>SI</p>
                                </div>
                                <div>
                                    <p>Tipo de producto</p>
                                    <p>{ selectedProduct().tipoProducto }</p>
                                </div>
                                <div>
                                    <p>Nombre del producto</p>
                                    <p>{ selectedProduct().nombre }</p>
                                </div>
                                <div>
                                    <p>Precio de venta</p>
                                    <p>${ selectedProduct().precioVenta }.00</p>
                                </div>
                                <div>
                                    <p>Costo</p>
                                    <p>${ selectedProduct().costo }.00</p>
                                </div>
                                </div>
                        </div>
                    </div>
                </dialog>
            </div>

            <div class={ styles.leftCard }>
                <p>Buscar producto</p>
                <div class={ styles.sellSearchBar }>
                    <input
                        type='text' 
                        placeholder='Busca por nombre, código de producto, etc' 
                        value={ search() } 
                        onInput={ (e) => setSearch(e.target.value) }
                    />
                    <button onClick={ () => searchItem() }  class={ styles.secondaryButton }>Buscar</button>
                </div>

                <Show when={ items() } fallback={ <Loader /> }>
                    <div class={ styles.sellCards }>
                        <For each={ items() } fallback={ <p>No hay productos</p> } >
                            {
                                (item) => (
                                    <SellCard
                                        item={ item }
                                        setCart={ setCart }
                                        cart={ cart }
                                        showProduct={ showProduct }
                                    />
                                )
                            }
                        </For>
                    </div>
                </Show>
            </div>

            <div class={ styles.rightCard }>
                <div class={ styles.shoppingOptions }>
                    <select>
                        <option>Publico en general</option>
                    </select>
                </div>
                <div class={ styles.shopCard }>
                    <For each={ cart() } fallback={
                        <div class={ styles.shoppingCar }>                        
                            <img src='https://th.bing.com/th/id/OIG3.kFKrH.Gz3S8RpIOiN.O1?w=1024&h=1024&rs=1&pid=ImgDetMain' />
                            <p>Comienza a agregar productos a esta ventana</p>
                        </div>
                    }>
                        {
                            (item) =>
                            <SellItem 
                                item={ item }
                                cart={ cart }
                                setCart={ setCart }
                            />
                        }
                    </For>
                </div>
                {
                    cart().length &&
                    <div class={ styles.sellsSum }>
                        <p>Cantidad de productos: 20</p>
                        <p>Total: $100.00</p>
                        <p>Pagará con: <input type='number' placeholder='$10.00' /></p>
                        <p>Cambio: </p>
                    </div>
                }
            </div>
        </div>
    );
}

export default Sells;