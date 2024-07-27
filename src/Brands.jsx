import { For, Show, createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import Api from './helpers/api';
import Loader from './components/Loader';
import { A, useNavigate } from '@solidjs/router';
import searchItem from './helpers/searchItem';
import PositionItems from './components/PositionItems';
import checkLogin from './helpers/checkLogin';

function Brands() {
    createEffect(() => {
        checkLogin();
    });

    const api = new Api('http://localhost:5024/api/Producto/ObtenerMarcas');

    const navigate = useNavigate();

    const [ brands, setBrands ] = createSignal(null);
    const [ currentBrands, setCurrentBrands ] = createSignal(null);
    const [ position, setPosition ] = createSignal(0); 

    createEffect(async () => {
        const data = await api.Get();
        setBrands(data.data);
        setCurrentBrands(brands().slice(position() * 4, position() + 4));
    });
    
    createEffect(() => {
        if (brands()) {
            setCurrentBrands(brands().slice(position() * 4, position() * 4 + 4));
        }
    });

    return (
        <div class={ styles.productsBg }>
            <p>Marcas</p>
            
            <div class={ styles.productsButtons }>
                <button class={ styles.mainButton }>Personalizar</button>
                <button class={ styles.mainButton }><A href='../new-brand'>Nuevo</A></button>
            </div>

            <div class={` ${ styles.simpleCard } ${ styles.productsCard } `}>
                <div class={ styles.productsFilters }>
                    <div></div>
                    <input type='text' placeholder='Buscar' onInput={(e) => searchItem(e, brands(), setPosition, setCurrentBrands)} />
                </div>
                <Show when={ currentBrands() } fallback={ <Loader /> }>
                    <div class={ styles.productsTitles }>
                        <p></p>
                        <p>ID</p>
                        <p>Nombre</p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                    <For each={ currentBrands() } >
                        {
                        (brand) => 
                        <div class={ styles.productsProduct } onClick={ () => navigate(`/brand?id=${ brand.id }`) }>
                            <div>
                                <img src='https://cdn4.iconfinder.com/data/icons/banking-finance/32/shelf-menu-512.png' />
                            </div>
                            <p>{ brand.id }</p>
                            <p>{ brand.nombre }</p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                        }
                    </For>
                </Show>
            </div>
            
            <PositionItems
              items={ brands }
              setPosition={ setPosition }
              position={ position }
            />
        </div>
    );
}

export default Brands;