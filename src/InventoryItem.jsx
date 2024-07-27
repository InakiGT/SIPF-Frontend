import { Show, createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import Loader from './components/Loader';
import Api from './helpers/api';
import { useSearchParams } from '@solidjs/router';
import checkLogin from './helpers/checkLogin';

// TODO: Crear 
function InventoryItem() {
    createEffect(() => {
        checkLogin();
    });

    const api = new Api('http://localhost:5024/api/Inventario');

    const [ searchParams ] = useSearchParams();

    const [ edit, setEdit ] = createSignal(true);
    const [ img, setImg ] = createSignal('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1156px-Picture_icon_BLACK.svg.png');
    const [ product, setProduct ] = createSignal(null);

    createEffect(async () => {
        const data = await api.Get(`/ObtenerInventarioPorId/${ searchParams.id }`);
        setProduct(data.data);
        console.log(product())
    });

    return (
        <div class={ styles.buyMainCard }>
            <p>Inventario / { product()?.id }</p>

            <Show when={ product() } fallback={ <Loader /> }>
            <p>Información general</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.orderFolio }>
                    <img src='https://cdn-icons-png.flaticon.com/512/1380/1380641.png' />
                    <p>{ product().id }</p>
                </div>

                <div class={ styles.orderDescription }>
                    <div>
                        <p>ID</p>
                        <p>{ product().id }</p>
                    </div>
                    <div>
                        <p>Categoría</p>
                        <p>{ product().categoria }</p>
                    </div>
                    <div>
                        <p>Descripción del producto</p>
                        <p>{ product().descripcionProducto }</p>
                    </div>
                    <div>
                        <p>Nombre del producto</p>
                        <p>{ product().nombre }</p>
                    </div>
                    <div>
                        <p>Precio Unitario</p>
                        <p>${ product().precioUnitario }</p>
                    </div>
                    <div>
                        <p>Fecha de entrada</p>
                        <p>{ product().fechaEntrada }</p>
                    </div>
                    <div>
                        <p>Fecha de salida</p>
                        <p>{ product().fechaSalida }</p>
                    </div>
                    <div>
                        <p>Fecha de expiración</p>
                        <p>{ product().fechaExpiracion }</p>
                    </div>
                    <div>
                        <p>Stock actual</p>
                        <p>{ product().stockActual }</p>
                    </div>
                    <div>
                        <p>Stock mínimo</p>
                        <p>{ product().stockMinimo }</p>
                    </div>
                </div>
            </div>
            </Show>
        </div>
    );
}

export default InventoryItem;