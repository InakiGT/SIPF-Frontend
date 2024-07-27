import { For, Show, createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import Loader from './components/Loader';
import Api from './helpers/api';
import { A, useNavigate } from '@solidjs/router';
import searchItem from './helpers/searchItem';
import checkLogin from './helpers/checkLogin';

function Products() {
    createEffect(() => {
        checkLogin();
    });
    
    const api = new Api('http://localhost:5024/api/Producto');

    const navigate = useNavigate();

    const [ products, setProducts ] = createSignal(null);
    const [ currentProducts, setCurrentProducts ] = createSignal(null);
    const [ position, setPosition ] = createSignal(0);

    createEffect(async () => {
        const data = await api.Get('/ObtenerProducto');
        setProducts(data.data);
        setCurrentProducts(products().slice(position() * 4, position() + 4));
    });

    createEffect(() => {
        if (products()) {
            setCurrentProducts(products().slice(position() * 4, position() * 4 + 4));
        }
    });

    const increment = () => {
        setPosition(products().length / 4 > position() + 1 ? position() + 1 : position());
    }

    const decrement = () => {
        setPosition(position() !== 0 ? position() - 1 : 0);
    }

    return (
        <div class={ styles.productsBg }>
            <p>Productos</p>
            
            <div class={ styles.productsButtons }>
                <button class={ styles.mainButton }>Personalizar</button>
                <button class={ styles.mainButton }><A href='../new-product'>Nuevo</A></button>
            </div>

            <div class={` ${ styles.simpleCard } ${ styles.productsCard } `}>
                <div class={ styles.productsFilters }>
                    <div>
                        <p>Filtrar: </p>
                        <select>
                            <option>Categorías</option>
                        </select>
                    </div>
                    <input type='text' placeholder='Buscar' onInput={(e) => searchItem(e, products(), setPosition, setCurrentProducts)} />
                </div>

                <Show when={ currentProducts() } fallback={ <Loader /> }>
                    <div class={ styles.productsTitles }>
                        <p></p>
                        <p>SKU</p>
                        <p>Nombre del producto</p>
                        <p>Descripción</p>
                        <p>Modelo</p>
                        <p>Marca</p>
                        <p>Precio de venta</p>
                        <p>Costo</p>
                        <p>Tipo de producto</p>
                        <p>Unidad de medida</p>
                        <p>Código de barras</p>
                    </div>
                    <div class={ styles.productsList }>
                    <For each={ currentProducts() }>
                            {
                                (product) =>
                                <div class={ styles.productsProduct } onClick={ () => navigate(`/product?id=${ product.id }`) }>
                                    <div>
                                    <img src='https://cdn4.iconfinder.com/data/icons/banking-finance/32/shelf-menu-512.png' />
                                    </div>
                                    <p>{ product.sku }</p>
                                    <p>{ product.nombre }</p>
                                    <p>{ product.descripcion }</p>
                                    <p>{ product.modelo }</p>
                                    <p>Libre</p>
                                    <p>${ product.precioVenta }.00</p>
                                    <p>${ product.costo }.00</p>
                                    <p>Medicamento</p>
                                    <p>mg</p>
                                    <p>{ product.codigoBarra }</p>
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
                    onClick={() => setPosition(Math.round(products().length / 4 - 1))}
                >Último</button>
            </div>
        </div>
    );
}

export default Products;