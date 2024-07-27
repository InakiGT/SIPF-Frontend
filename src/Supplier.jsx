import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';
import Api from './helpers/api';
import { useSearchParams } from '@solidjs/router';
import createItem from './helpers/createItem';
import Loader from './components/Loader';

function Supplier() {
    createEffect(() => {
        checkLogin();
    });

    const api = new Api('http://localhost:5024/api/Proveedor');

    const [ searchParams ] = useSearchParams();

    const [ edit, setEdit ] = createSignal(true);
    const [ img, setImg ] = createSignal('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1156px-Picture_icon_BLACK.svg.png');
    const [ product, setProduct ] = createSignal(null);
    const [ response, setResponse ] = createSignal(null);

    createEffect(async () => {
        const data = await api.Get(`/ObtenerProveedorPorId/${ searchParams.id }`);
        setProduct(data.data);
        console.log(product())
    });

    const updateProduct = async () => {
        const api = new Api(`/ActualizarProducto/${product()?.id}`);
        const res = await createItem(api, product, 'Put');

        setResponse(res);
    }
    
    return (
        <div class={ styles.buyMainCard }>
            <p>Proveedor / {product()?.id}</p>

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
                        <p>Nombre</p>
                        <p>{ product().nombre }</p>
                    </div>
                    <div>
                        <p>Dirección</p>
                        <p>{ `${product().calle}, ${ product().numeroExt }, ${ product().colonia }, ${ product().localidad}, ${ product().estado } ` }</p>
                    </div>
                    <div>
                        <p>Teléfonos</p>
                        <p>{ product().telefono }, { product().telefonoExt }</p>
                    </div>
                    <div>
                        <p>Email</p>
                        <p>{ product().email }</p>
                    </div>
                    <div>
                        <p>Celular</p>
                        <p>{ product().movil }</p>
                    </div>
                    <div>
                        <p>Puesto</p>
                        <p>{ product().puesto }</p>
                    </div>
                    <div>
                        <p>Término de pago</p>
                        <p>{ product().terminoPago }</p>
                    </div>
                    <div>
                        <p>Tipo de proveedor</p>
                        <p>{ product().tipoProveedor }</p>
                    </div>
                    <div>
                        <p>Tipo de factura</p>
                        <p>{ product().tipoFactura }</p>
                    </div>
                    <div>
                        <p>Importe máximo de crédito</p>
                        <p>{ product().importeMaxCredito }</p>
                    </div>
                    <div>
                        <p>Comentarios</p>
                        <p>{ product().comentarios }</p>
                    </div>
                </div>
            </div>

            {/* <p>Detalles</p>
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
            </div> */}
            </Show>
        </div>
    );
}

export default Supplier;