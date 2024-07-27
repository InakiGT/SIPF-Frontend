import { Show, createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';
import Api from './helpers/api';
import { useSearchParams } from '@solidjs/router';
import Loader from './components/Loader';
import CreateItemDialog from './components/CreateItemDialog';
import createItem from './helpers/createItem';

function SupplierType() {
    createEffect(() => {
        checkLogin();
    });

    const api = new Api('http://localhost:5024/api/Proveedor');

    const [ searchParams ] = useSearchParams();

    const [ edit, setEdit ] = createSignal(true);
    const [ category, setCategory ] = createSignal(null);

    createEffect(async () => {
        const data = await api.Get(`/ObtenerTipoProveedorPorId/${ searchParams.id }`);
        setCategory(data.data);
    });

    const [ response, setResponse ] = createSignal(null);

    const updateCategory = async () => {
        const api = new Api(`http://localhost:5024/api/Producto/ActualizarCategoria/${category()?.id}`);
        const res = await createItem(api, category, 'Put');
        console.log(category())
        setResponse(res);
    }

    return (
        <div class={ styles.buyMainCard }>
            <CreateItemDialog
                setResponse={ setResponse }
                response={ response }
                route={ 'supplier-types' }
                type={ 'Tipo de proveedor' }
            />


            <p>Tipo de proveedor / { category()?.id }</p>
            
            <Show when={ category() } fallback={ <Loader /> }>
            <p>Información general</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.orderFolio }>
                    <img src='https://icons.veryicon.com/png/o/commerce-shopping/icon-of-lvshan-valley-mobile-terminal/home-category.png' />
                    <p>{ category().id }</p>
                </div>

                <div class={ styles.orderDescription }>
                    <div>
                        <p>ID</p>
                        <p>{ category().id }</p>
                    </div>
                    <div>
                        <p>Nombre</p>
                        <p>{ category().nombre }</p>
                    </div>
                </div>
            </div>

            <p>Detalles</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.editProductContainer }>
                    <div>
                        <label>Nombre del tipo de proveedor</label>
                        <input
                            type='text'
                            value={ category().nombre }
                            placeholder='Tipo de proveedor'
                            onInput={(e) => setCategory({ ...category(), nombre: e.target.value })} 
                            disabled={ edit() }
                        />
                    </div>
                </div>
                <div class={ styles.editProductButtons }>
                    <button class={ styles.secondaryButton } onClick={() => setEdit(false)}>Editar</button>
                    <button class={ styles.mainButton } onClick={ () => updateCategory() }>Guardar</button>
                </div>
            </div>
            </Show>
        </div>
    );
}

export default SupplierType;