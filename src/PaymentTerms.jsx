import { For, Show, createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import Loader from './components/Loader';
import Api from './helpers/api';
import { A, useNavigate } from '@solidjs/router';
import searchItem from './helpers/searchItem';
import checkLogin from './helpers/checkLogin';

function PaymentTerms() {
    createEffect(() => {
        checkLogin();
    });
    
    const api = new Api('http://localhost:5024/api/Proveedor');

    const navigate = useNavigate();

    const [ categories, setCategories ] = createSignal(null);
    const [ currentCategories, setCurrentCategories ] = createSignal(null);
    const [ position, setPosition ] = createSignal(0);

    createEffect(async () => {
        const data = await api.Get('/ObtenerTerminoPago');
        setCategories(data.data);
        setCurrentCategories(categories().slice(position() * 4, position() + 4));
    });

    createEffect(() => {
        if (categories()) {
            setCurrentCategories(categories().slice(position() * 4, position() * 4 + 4));
        }
    });

    const increment = () => {
        setPosition(categories().length / 4 > position() + 1 ? position() + 1 : position());
    }

    const decrement = () => {
        setPosition(position() !== 0 ? position() - 1 : 0);
    }

    return (
        <div class={ styles.productsBg }>
            <p>Términos de pago</p>
            
            <div class={ styles.productsButtons }>
                <button class={ styles.mainButton }>Personalizar</button>
                <button class={ styles.mainButton }><A href='../new-payment-term'>Nuevo</A></button>
            </div>

            <div class={` ${ styles.simpleCard } ${ styles.productsCard } `}>

                <Show when={ currentCategories() } fallback={ <Loader /> }>
                    <div class={ styles.productsTitles }>
                        <p></p>
                        <p>ID</p>
                        <p>Nombre del término de pago</p>
                        <p>¿Está Activo?</p>
                    </div>
                    <div class={ styles.productsList }>
                    <For each={ currentCategories() }>
                            {
                                (category) =>
                                <div class={ styles.productsProduct } onClick={ () => navigate(`/payment-term?id=${ category.id }`) }>
                                    <div>
                                    <img src='https://cdn4.iconfinder.com/data/icons/banking-finance/32/shelf-menu-512.png' />
                                    </div>
                                    <p>{ category.id }</p>
                                    <p>{ category.nombre }</p>
                                    <p>{ category.activo ? 'Si' : 'No' }</p>
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
                    onClick={() => setPosition(Math.round(categories().length / 4 - 1))}
                >Último</button>
            </div>
        </div>
    );
}

export default PaymentTerms;