import { For, Show, createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';
import Api from './helpers/api';
import { useNavigate } from '@solidjs/router';
import createItem from './helpers/createItem';
import CreateItemDialog from './components/CreateItemDialog';
import Loader from './components/Loader';
import { getId } from './helpers/token';

function NewEntrance() {
    createEffect(() => {
        checkLogin();
    });

    const api = new Api('http://localhost:5024/api/');
    const navigate = useNavigate();

    const [ entrance, setEntrance ] = createSignal({
        FechaEntrada: '',
        ProveedorId: 0,
        CantidadTotal: 0,
        CostoTotal: 0,
        UsuarioId: getId(),
        Comentarios: '',
        AutorizoId: 1,
        EstatusId: 1,
        Detalles: [], 
    });
    const [ search, setSearch ] = createSignal('');
    const [ details, setDetails ] = createSignal([]);
    const [ suppliers, setSuppliers ] = createSignal(null);
    const [ products, setProducts ] = createSignal(null);
    const [ stores, setStores ] = createSignal(null);
    const [ store, setStore ] = createSignal(null);
    const [ response, setResponse ] = createSignal(null);

    const createEntrance = async () => {
        const api = new Api('http://localhost:5024/api/Inventario/Entrada');

        setEntrance({ ...entrance(), Detalles: details() });

        const res = await createItem(api, entrance);
        
        setResponse(res);
    }

    const calculateQuantity = () => {
        setEntrance({
            ...entrance(),
            CantidadTotal: details().reduce((accumulator, cV) => accumulator + parseInt(cV.cantidad), 0),
            CostoTotal: details().reduce((accumulator, cV) => accumulator + parseInt(cV.cantidad) * parseFloat(cV.precioUnitario), 0),
        });
    }

    const searchItem = () => {
        const product = products().find(i => i.codigoBarra === search() || i.sku === search());
        const p = {
            productoId: product.id,
            productoNombre: product.nombre,
            precioUnitario: product.costo,
        }
        if ( product ) setDetails([ ...details(), p ]);
    }

    const deleteProduct = (id) => {
        setDetails(details().filter(i => i.productoId !== id));
    }

    const updateCurrentProduct = (product, target) => {
        const updatedDetails = details().map(p => {
            if (p.productoId === product.productoId) {
                const currentP = {
                    ...product,
                    [target.id]: target.value,
                }
                
                if (target.id === 'productoId') {
                    const item = products().find(i => i.id === parseInt(currentP.productoId));

                    currentP.productoNombre = item.nombre;
                    currentP.precioUnitario = item.costo;
                }

                return currentP;
            }
            return p;
        })
    
        setDetails(updatedDetails);
        calculateQuantity();
    }

    createEffect(async () => {
        let response = await api.Get('Proveedor/ObtenerProveedor');
        setSuppliers(response.data);
        setEntrance({...entrance(), ProveedorId: suppliers()[0].id});

        response = await api.Get('Almacen/ObtenerAlmacen');
        setStores(response.data);
        setStore(response.data[0].id);

        response = await api.Get('Producto/ObtenerProducto');
        setProducts(response.data);
        const p = response.data[0];
        setDetails([{
            productoId: p.id,
            productoNombre: p.nombre,
            cantidad: 0,
            precioUnitario: p.costo,
            fechaExpiracion: '',
            numeroLote: '',
            almacenId: store(),
        }]);
    });

    return (
        <div class={ styles.buyMainCard }>
            <CreateItemDialog
                setResponse={ setResponse }
                response={ response }
                route={ 'inventory' }
                type={ 'Entrada de inventario' }
            />
            <p>Ajustes inventario / Nueva entrada</p>

            <p>Agregar Información</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.editProductContainer }>
                    <div>
                        <label>Fecha de entrada</label>
                        <input
                            type='date'
                            placeholder='Generico'
                            onInput={(e) => setEntrance({ ...entrance(), FechaEntrada: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Proveedor</label>
                        <select onInput={ e => setEntrance({ ...entrance(), ProveedorId: e.target.value }) } class={ styles.mainSelect }>
                            <Show when={ suppliers() } fallback={ <option>No hay proveedores</option> }>
                                <For each={ suppliers() } fallback={ <option>No hay proveedores</option> }>
                                    {
                                        (supplier) => (
                                            <option value={ supplier.id }>{ supplier.nombre }</option>
                                        )
                                    }
                                </For>
                            </Show>
                        </select>
                    </div>
                    <div>
                        <label>Almacen</label>
                        <select value={ store() } onInput={ e => setStore( e.target.value ) } class={ styles.mainSelect }>
                            <Show when={ stores() } fallback={ <option>No hay almacenes</option> }>
                                <For each={ stores() } fallback={ <option>No hay almacenes</option> }>
                                    {
                                        (store) => (
                                            <option value={ store.id }>{ store.nombre }</option>
                                        )
                                    }
                                </For>
                            </Show>
                        </select>
                    </div>
                    <div>
                        <label>Comentarios</label>
                        <input
                            type='text'
                            placeholder='Comentario'
                            onInput={(e) => setEntrance({ ...entrance(), Comentarios: e.target.value })} 
                        />
                    </div>
                </div>
            </div>

            <p>Detalle de inventario</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.tweakFilters }>
                    <input
                        type='text'
                        placeholder='Capturar código de barras o sku para búscar el producto'
                        onChange={ (e) => setSearch(e.target.value) }
                    />
                    <button onClick={ searchItem } class={ styles.mainButton }>Agregar</button>
                </div>

                <div class={ styles.tweakItems }>
                    <div class={ styles.tweakTitles }>
                        <p>Producto</p>
                        <p>Fecha Expiración</p>
                        <p>Cantidad</p>
                        <p>Precio Unitario</p>
                        <p>Lote</p>
                        <p></p>
                    </div>

                    <div class={ styles.tweakList }>
                        <Show when={ products() } fallback={ <Loader /> }>
                            <For each={ details() }>
                                    {
                                        (item) =>
                                        <div class={ styles.tweakItem }>
                                        <select
                                            id='productoId'
                                            value={ item.productoId }
                                            class={ styles.mainSelect }
                                            onInput={ (e) => updateCurrentProduct(item, e.target)} 
                                        >
                                            <For each={ products() } >
                                                {
                                                    (product) =>
                                                    <option value={ product.id }>{ product.nombre }</option>
                                                }
                                            </For>
                                        </select>
                                        <input
                                            id='fechaExpiracion'
                                            type='date' 
                                            value={ item.fechaExpiracion }
                                            onInput={ (e) =>  updateCurrentProduct(item, e.target) } 
                                        />
                                        <input
                                            id='cantidad'
                                            type='number'
                                            placeholder='10'
                                            value={ item.cantidad }
                                            onChange={ (e) =>  updateCurrentProduct(item, e.target) } 
                                        />
                                        <input
                                            id='precioUnitario'
                                            value={ item.precioUnitario } 
                                            type='number' 
                                            placeholder='$10.00' 
                                            onChange={ (e) =>  updateCurrentProduct(item, e.target) } 
                                        />
                                        <input
                                            id='numeroLote'
                                            type='text'
                                            value={ item.numeroLote ? item.numeroLote : '' }
                                            placeholder='Número lote'
                                            onChange={ (e) =>  updateCurrentProduct(item, e.target) } 
                                        />
                                        <div>
                                            <img
                                                src='https://static-00.iconduck.com/assets.00/trash-icon-462x512-njvey5nf.png'
                                                onClick={ () => deleteProduct(item.productoId)}
                                            />
                                        </div>
                                        </div>
                                    }
                            </For>
                        </Show>
                        <button
                            class={ styles.secondaryButton }
                            onClick={ () => setDetails([ ...details(), { productoId: -1, cantidad: 0, almacenId: store() } ]) }
                        >Añadir fila</button>
                    </div>
                </div>
            </div>
            <div>
            </div>

            <p>Resumen de la entrada</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.orderFolio }>
                    <img src='https://cdn-icons-png.freepik.com/512/8053/8053573.png' />
                    <p>Entrada</p>
                </div>

                <div class={ styles.orderDescription }>
                    <div>
                        <p>Fecha de entrada</p>
                        <p>{ entrance().FechaEntrada }</p>
                    </div>
                    <div>
                        <p>Proveedor Id</p>
                        <p>{ entrance().ProveedorId }</p>
                    </div>
                    <div>
                        <p>Almacen Id</p>
                        <p>{ entrance().Almacen }</p>
                    </div>
                    <div>
                        <p>Comentarios</p>
                        <p>{ entrance().Comentarios }</p>
                    </div>
                    <div>
                        <p>Cantidad total de productos:</p>
                        <p>{ entrance().CantidadTotal }</p>
                    </div>
                    <div>
                        <p>Costo total:</p>
                        <p>{ entrance().CostoTotal }</p>
                    </div>
                    <div>
                    </div>
                </div>
            </div>

            <div class={ styles.newInventoryGButtons }>
                <button class={ styles.secondaryButton }>Cancelar</button>
                <button 
                        class={ styles.mainButton }
                        onClick={() => createEntrance()}
                >Guardar</button>
            </div>
        </div>
    );
}

export default NewEntrance;