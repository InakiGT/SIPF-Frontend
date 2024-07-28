import { Show, createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import Loader from './components/Loader';
import Api from './helpers/api';
import { useSearchParams } from '@solidjs/router';
import checkLogin from './helpers/checkLogin';
import CreateItemDialog from './components/CreateItemDialog';
import createItem from './helpers/createItem';

function Product() {
    createEffect(() => {
        checkLogin();
    });

    const api = new Api('http://localhost:5024/api/Producto');

    const [ searchParams ] = useSearchParams();

    const [ edit, setEdit ] = createSignal(true);
    const [ img, setImg ] = createSignal('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1156px-Picture_icon_BLACK.svg.png');
    const [ product, setProduct ] = createSignal(null);
    const [ response, setResponse ] = createSignal(null);

    createEffect(async () => {
        const data = await api.Get(`/ObtenerProductoPorId/${ searchParams.id }`);
        setProduct(data.data);
        console.log(product())
    });

    const updateProduct = async () => {
        const api = new Api(`/ActualizarProducto/${product()?.id}`);
        setProduct({ ...product(), usuarioModifico: 'test' });
        const res = await createItem(api, product, 'Put');

        setResponse(res);
    }

    return (
        <div class={ styles.buyMainCard }>
            <CreateItemDialog
                setResponse={ setResponse }
                response={ response }
                route={ 'products' }
                type={ 'Producto' }
            />
            <p>Productos / { product()?.sku }</p>

            <Show when={ product() } fallback={ <Loader /> }>
            <p>Información general</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.orderFolio }>
                    <img src='https://cdn-icons-png.flaticon.com/512/1380/1380641.png' />
                    <p>{ product().sku }</p>
                </div>

                <div class={ styles.orderStatus }>
                    <p>Status: </p>
                    <select>
                        <option>Activo</option>
                        <option>Archivado</option>
                    </select>
                </div>

                <div class={ styles.orderDescription }>
                    <div>
                        <p>SKU</p>
                        <p>{ product().sku }</p>
                    </div>
                    <div>
                        <p>Modelo</p>
                        <p>{ product().modelo }</p>
                    </div>
                    <div>
                        <p>Tipo de producto</p>
                        <p>Medicamento</p>
                    </div>
                    <div>
                        <p>Nombre del producto</p>
                        <p>{ product().nombre }</p>
                    </div>
                    <div>
                        <p>Precio de venta</p>
                        <p>${ product().precioVenta }.00</p>
                    </div>
                    <div>
                        <p>Costo</p>
                        <p>${ product().costo }.00</p>
                    </div>
                </div>
            </div>

            <p>Detalles</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.editProductContainer }>
                    <div>
                        <label>SKU</label>
                        <input
                            type='text'
                            placeholder='SO7001' 
                            disabled={ edit() } 
                            value={ product().sku }
                            />
                    </div>
                    <div>
                        <label>Modelo</label>
                        <input 
                            type='text' 
                            placeholder='100mg' 
                            disabled={ edit() } 
                            value={ product().modelo }
                        />
                    </div>
                    <div>
                        <label>Código de barras</label>
                        <input
                            type='text' 
                            placeholder='123 921 319 203' 
                            disabled={ edit() } 
                            value={ product().codigoBarra }
                        />
                    </div>
                    <div>
                        <label>Tipo de producto</label>
                        <input 
                            type='text' 
                            placeholder='Medicamento' 
                            disabled={ edit() } 
                            value={ product().tipoProducto }
                        />
                    </div>
                    <div>
                        <label>Costo</label>
                        <input
                            type='number'
                            placeholder='$10.00' 
                            disabled={ edit() } 
                            value={ product().costo }
                        />
                    </div>
                    <div>
                        <label>Precio de venta</label>
                        <input 
                            type='number' 
                            placeholder='$100.00' 
                            disabled={ edit() } 
                            value={ product().precioVenta }
                        />
                    </div>
                    <div>
                        <label>Nombre del producto</label>
                        <input 
                            type='text' 
                            placeholder='Vicodin' 
                            disabled={ edit() } 
                            value={ product().nombre }
                        />
                    </div>
                    <div>
                        <label>Código SAT</label>
                        <input 
                            type='text' 
                            placeholder='111111' 
                            disabled={ edit() } 
                            value={ product().codigoSAT }
                        />
                    </div>
                    <div>
                        <label>Denominación generica</label>
                        <input 
                            type='text' 
                            placeholder='Vicodin' 
                            disabled={ edit() } 
                            value={ product().denominacionGenerica }
                        />
                    </div>
                    <div>
                        <label>Nombre de ingrediente activo</label>
                        <input 
                            type='text' 
                            placeholder='Azúcar' 
                            disabled={ edit() } 
                            value={ product().nombreIngredienteActivo }
                        />
                    </div>
                    <div>
                        <label>Tipo de coste</label>
                        <input 
                            type='text' 
                            placeholder='Coste' 
                            disabled={ edit() } 
                            value={ product().tipoCoste }
                        />
                    </div>
                </div>
                <div class={ styles.editProductButtons }>
                    <button class={ styles.secondaryButton } onClick={() => setEdit(false)}>Editar</button>
                    <button class={ styles.mainButton } onClick={ updateProduct }>Guardar</button>
                </div>
            </div>

            <p>Imagen del producto</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.productImgPreview }>
                    <img src={ img() } />
                    <input type='file' accept='image/*' />
                </div>
            </div>
            </Show>
        </div>
    );
}

export default Product;