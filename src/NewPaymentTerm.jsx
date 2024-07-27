import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import Api from './helpers/api';
import createItem from './helpers/createItem';
import { useNavigate } from '@solidjs/router';
import CreateItemDialog from './components/CreateItemDialog';
import checkLogin from './helpers/checkLogin';

function NewPaymentTerm() {
    createEffect(() => {
        checkLogin();
    });

    const api = new Api('http://localhost:5024/api/Proveedor/CrearTerminoPago');
    const navigate = useNavigate();

    const [ brand, setBrand ] = createSignal({
        Nombre: '', 
    });
    const [ response, setResponse ] = createSignal(null);

    const createBrand = async () => {
        const res = await createItem(api, brand);

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

            <p>Términos de pago / Nueva término de pago</p>

            <p>Agregar Información</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.editProductContainer }>
                    <div>
                        <label>Nombre</label>
                        <input
                            type='text'
                            placeholder='Término de pago'
                            onInput={(e) => setBrand({ Nombre: e.target.value })} 
                        />
                    </div>
                </div>
            </div>

            <div class={ styles.orderButtons }>
                <button 
                    class={ styles.mainButton }
                    onClick={() => navigate('/payment-terms')}
                >Cancelar</button>
                <button 
                    class={ styles.mainButton }
                    onClick={ () => createBrand() }
                >Guardar</button>
            </div>
        </div>
    );
}

export default NewPaymentTerm;