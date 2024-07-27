import { Show, createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';
import Api from './helpers/api';
import { useSearchParams } from '@solidjs/router';
import Loader from './components/Loader';
import CreateItemDialog from './components/CreateItemDialog';
import createItem from './helpers/createItem';

function PaymentTerm() {
    createEffect(() => {
        checkLogin();
    });

    const api = new Api('http://localhost:5024/api/Proveedor');

    const [ searchParams ] = useSearchParams();

    const [ edit, setEdit ] = createSignal(true);
    const [ category, setCategory ] = createSignal(null);

    createEffect(async () => {
        const data = await api.Get(`/ObtenerTerminoPagoPorId/${ searchParams.id }`);
        setCategory(data.data);
    });

    const [ response, setResponse ] = createSignal(null);

    const updateCategory = async () => {
        const api = new Api(`http://localhost:5024/api/Producto/ActualizarCategoria/${category()?.id}`);
        const res = await createItem(api, category, 'Put');
    
        setResponse(res);
    }

    return (
        <div class={ styles.buyMainCard }>
            <CreateItemDialog
                setResponse={ setResponse }
                response={ response }
                route={ 'payment-terms' }
                type={ 'Término de pago' }
            />


            <p>Categoría / { category()?.id }</p>
            
            <Show when={ category() } fallback={ <Loader /> }>
            <p>Información general</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.orderFolio }>
                    <img src='https://www.svgrepo.com/show/127349/cash.svg' />
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
                    <div>
                        <p>Activo</p>
                        <p>{ category().activo ? 'Sí' : 'No' }</p>
                    </div>
                </div>
            </div>

            <p>Detalles</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.editProductContainer }>
                    <div>
                        <label>Nombre del término de pago</label>
                        <input
                            type='text'
                            value={ category().nombre }
                            placeholder='Término de pago'
                            onInput={(e) => setCategory({ ...category(), nombre: e.target.value })} 
                            disabled={ edit() }
                        />
                    </div>
                    <div>
                        <label>Activo</label>
                            <div>
                                <p>
                                    ¿Está activo?
                                </p>
                                <input
                                    type='checkbox'
                                    value={ category().activo  }
                                    onInput={(e) => setCategory({ ...category(), activo: !category().activo })} 
                                    disabled={ edit() }
                                />
                            </div>
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

export default PaymentTerm;