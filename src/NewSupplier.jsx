import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';
import { getId } from './helpers/token';
import Api from './helpers/api';
import CreateItemDialog from './components/CreateItemDialog';
import createItem from './helpers/createItem';

function NewSupplier() {
    createEffect(() => {
        checkLogin();
    });

    const api = new Api('http://localhost:5024/api/');

    const [ product, setProduct ] = createSignal({
        UsuarioAsignadoId: getId(),
    });
    const [ supplierTypes, setSupplierTypes ] = createSignal([]);
    const [ billTypes, setBillTypes ] = createSignal([]);
    const [ states, setStates ] = createSignal([]);
    const [ paymentTerms, setPaymentTerms ] = createSignal([]);
    const [ response, setResponse ] = createSignal(null);

    createEffect(async () => {
        let response = await api.Get('Proveedor/ObtenerTipoProveedor');
        setSupplierTypes(response.data);
        setProduct({
            ...product(),
            TipoProveedorId: response.data[0].id,
        })
        
        response = await api.Get('Factura/ObtenerTipoFactura');
        setBillTypes(response.data);
        setProduct({
            ...product(),
            TipoFacturaId: response.data[0].id,
        })
        
        response = await api.Get('Proveedor/ObtenerEstado');
        setStates(response.data);
        setProduct({
            ...product(),
            EstadoId: response.data[0].id,
        })
        
        response = await api.Get('Proveedor/ObtenerTerminoPago');
        setPaymentTerms(response.data);
        setProduct({
            ...product(),
            TerminoPagoId: response.data[0].id,
        })
    });

    const createProduct = async () => {
        const api = new Api('http://localhost:5024/api/Proveedor/CrearProveedor');
        const res = await createItem(api, product);
        console.log(product())
        setResponse(res);
    }

    return (
        <div class={ styles.buyMainCard }>
        <CreateItemDialog
            setResponse={ setResponse }
            response={ response }
            route={ 'suppliers' }
            type={ 'Proveedor' }
        />
        <p>Proveedores / Nuevo proveedor</p>

        <p>Agregar Información</p>
        <div class={ styles.simpleCard }>
            <div class={ styles.editProductContainer }>
                <div>
                    <label>Nombre del proveedor</label>
                    <input
                        type='text'
                        placeholder='Proveedor'
                        onInput={(e) => setProduct({ ...product(), Nombre: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Tipo del proveedor</label>
                    <select onInput={ e => setProduct({ ...product(), TipoProveedorId: e.target.value }) } class={ styles.mainSelect }>
                        <Show when={ supplierTypes() } fallback={ <option>No hay tipos de proveedor</option> }>
                            <For each={ supplierTypes() } fallback={ <option>No hay tipos de proveedor</option> }>
                                {
                                    (supplierType) => (
                                        <option value={ supplierType.id }>{ supplierType.nombre }</option>
                                    )
                                }
                            </For>
                        </Show>
                    </select>
                </div>
                <div>
                    <label>Tipo de factura</label>
                    <select onInput={ e => setProduct({ ...product(), TipoFacturaId: e.target.value }) } class={ styles.mainSelect }>
                        <Show when={ billTypes() } fallback={ <option>No hay tipos de factura</option> }>
                            <For each={ billTypes() } fallback={ <option>No hay tipos de factura</option> }>
                                {
                                    (billType) => (
                                        <option value={ billType.id }>{ billType.nombre }</option>
                                    )
                                }
                            </For>
                        </Show>
                    </select>
                </div>
                <div>
                    <label>Teléfono</label>
                    <input
                        type='number'
                        placeholder='5500112233'
                        onInput={(e) => setProduct({ ...product(), Telefono: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Teléfono Ext</label>
                    <input
                        type='number'
                        placeholder='5500112233'
                        onInput={(e) => setProduct({ ...product(), TelefonoExt: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Celular</label>
                    <input
                        type='number'
                        placeholder='5511002233'
                        onInput={(e) => setProduct({ ...product(), Movil: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        type='email'
                        placeholder='proveedor@correo.com'
                        onInput={(e) => setProduct({ ...product(), Email: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Puesto</label>
                    <input 
                        type='text'
                        placeholder='Vendedor'
                        onInput={(e) => setProduct({ ...product(), Puesto: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Comentarios</label>
                    <input 
                        type='text'
                        placeholder='Un comentario'
                        onInput={(e) => setProduct({ ...product(), Comentarios: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Calle</label>
                    <input 
                        type='text'
                        placeholder='Norte 88'
                        onInput={(e) => setProduct({ ...product(), Calle: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Número exterior</label>
                    <input 
                        type='text'
                        placeholder='6009'
                        onInput={(e) => setProduct({ ...product(), NumeroExt: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Número interior</label>
                    <input 
                        type='text'
                        placeholder='1'
                        onInput={(e) => setProduct({ ...product(), NumeroInt: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Colonia</label>
                    <input 
                        type='text'
                        placeholder='San Pedro el Chico'
                        onInput={(e) => setProduct({ ...product(), Colonia: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Localidad</label>
                    <input 
                        type='text'
                        placeholder='GAM'
                        onInput={(e) => setProduct({ ...product(), Localidad: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Municipio</label>
                    <input 
                        type='text'
                        placeholder='GAM'
                        onInput={(e) => setProduct({ ...product(), Municipio: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Código Postal</label>
                    <input 
                        type='number'
                        placeholder='08080'
                        onInput={(e) => setProduct({ ...product(), CodigoPostal: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Estado</label>
                    <select onInput={ e => setProduct({ ...product(), EstadoId: e.target.value }) } class={ styles.mainSelect }>
                        <Show when={ states() } fallback={ <option>No hay estados</option> }>
                            <For each={ states() } fallback={ <option>No hay estados</option> }>
                                {
                                    (state) => (
                                        <option value={ state.id }>{ state.nombre }</option>
                                    )
                                }
                            </For>
                        </Show>
                    </select>
                </div>
                <div>
                    <label>Término de pago</label>
                    <select onInput={ e => setProduct({ ...product(), TerminoPagoId: e.target.value }) } class={ styles.mainSelect }>
                        <Show when={ paymentTerms() } fallback={ <option>No hay términos de pago</option> }>
                            <For each={ paymentTerms() } fallback={ <option>No hay términos de pago</option> }>
                                {
                                    (paymentTerm) => (
                                        <option value={ paymentTerm.id }>{ paymentTerm.nombre }</option>
                                    )
                                }
                            </For>
                        </Show>
                    </select>
                </div>
                <div>
                    <label>Importe máximo de crédito</label>
                    <input 
                        type='number'
                        placeholder='$7600.00'
                        onInput={(e) => setProduct({ ...product(), ImporteMaxCredito: e.target.value })} 
                    />
                </div>
            </div>
        </div>

        <div class={ styles.orderButtons }>
            <button class={ styles.mainButton }>Cancelar</button>
            <button class={ styles.mainButton } onClick={ createProduct }>Guardar</button>
        </div>
    </div>
    );
}

export default NewSupplier;