import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';
import Api from './helpers/api';
import { A, useNavigate } from '@solidjs/router';
import Loader from './components/Loader';

function Suppliers() {
    createEffect(() => {
        checkLogin();
    });

    const api = new Api('http://localhost:5024/api/Proveedor');

    const navigate = useNavigate();

    const [ suppliers, setSuppliers ] = createSignal(null);
    const [ currentProducts, setCurrentProducts ] = createSignal(null);
    const [ position, setPosition ] = createSignal(0);

    createEffect(async () => {
        const data = await api.Get('/ObtenerProveedor');
        setSuppliers(data.data);
        setCurrentProducts(suppliers().slice(position() * 4, position() + 4));
    });

    createEffect(() => {
        if (suppliers()) {
            setCurrentProducts(suppliers().slice(position() * 4, position() * 4 + 4));
        }
    });

    const increment = () => {
        setPosition(suppliers().length / 4 > position() + 1 ? position() + 1 : position());
    }

    const decrement = () => {
        setPosition(position() !== 0 ? position() - 1 : 0);
    }

    return (
        <div class={ styles.productsBg }>
            <p>Proveedores</p>
            
            <div class={ styles.productsButtons }>
                <button class={ styles.mainButton }>Personalizar</button>
                <button class={ styles.mainButton }><A href='../new-supplier'>Nuevo</A></button>
            </div>

            <div class={` ${ styles.simpleCard } ${ styles.productsCard } `}>
                <div class={ styles.productsFilters }>
                    <div></div>
                    <input type='text' placeholder='Buscar' />
                </div>

                <Show when={ currentProducts() } fallback={ <Loader /> }>
                    <div class={ styles.productsTitles }>
                        <p></p>
                        <p>ID</p>
                        <p>Nombre del proveedor</p>
                        <p>Tipo de proveedor</p>
                        <p>Teléfono</p>
                        <p>Email</p>
                        <p>Tipo de factura</p>
                        <p>Localidad</p>
                        <p>Término de pago</p>
                        <p>Importe máximo de crédito</p>
                    </div>
                    <div class={ styles.productsList }>
                    <For each={ currentProducts() }>
                            {
                                (product) =>
                                <div class={ styles.productsProduct } onClick={ () => navigate(`/supplier?id=${ product.id }`) }>
                                    <div>
                                    <img src='https://cdn4.iconfinder.com/data/icons/banking-finance/32/shelf-menu-512.png' />
                                    </div>
                                    <p>{ product.id }</p>
                                    <p>{ product.nombre }</p>
                                    <p>{ product.tipoProveedor }</p>
                                    <p>{ product.telefono }</p>
                                    <p>{ product.email }</p>
                                    <p>{ product.tipoFactura }</p>
                                    <p>{ product.localidad }</p>
                                    <p>{ product.terminoPago }</p>
                                    <p>{ product.importeMaxCredito }</p>
                                </div>
                            }
                    </For>
                    </div>
                </Show>
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
                    onClick={() => setPosition(Math.round(suppliers().length / 4 - 1))}
                >Último</button>
            </div>
        </div>
    );
}

export default Suppliers;