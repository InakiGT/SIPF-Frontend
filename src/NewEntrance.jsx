import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';
import Api from './helpers/api';
import { useNavigate } from '@solidjs/router';
import createItem from './helpers/createItem';

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
        Comentarios: '',
        EstatusId: 0,
        Detalles: [], 
    });
    const [ suppliers, setSuppliers ] = createSignal(null);
    const [ products, setProducts ] = createSignal(null);
    const [ response, setResponse ] = createSignal(null);

    const createBrand = async () => {
        const res = await createItem(api, brand);
        
        setResponse(res);
    }

    createEffect(async () => {
        let response = await api.Get('Proveedor/ObtenerProveedor');
        setSuppliers(response.data);
        setEntrance({...entrance(), ProveedorId: suppliers()[0].id});

        response = await api.Get('Producto/ObtenerProducto');
        setProducts(response.data);
        console.log(products())
    });

    return (
        <div class={ styles.buyMainCard }>
            <p>Ajustes inventario / Nueva entrada</p>

            <p>Agregar Información</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.editProductContainer }>
                    <div>
                        <label>Fecha de entrada</label>
                        <input
                            type='date'
                            placeholder='Generico'
                            onInput={(e) => setEntrance({ FechaEntrada: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Proveedor</label>
                        <select onInput={ e => setEntrance({ ...entrance(), ProveedorId: e.target.value }) } class={ styles.mainSelect }>
                            <Show when={ suppliers() } fallback={ <option>No hay categorias</option> }>
                                <For each={ suppliers() } fallback={ <option>No hay categorias</option> }>
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
                        <label>Comentarios</label>
                        <input
                            type='text'
                            placeholder='Comentario'
                            onInput={(e) => setEntrance({ Comentarios: e.target.value })} 
                        />
                    </div>
                </div>
            </div>

            <p>Detalle de inventario</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.tweakType }>
                    <p>Tipo de captura:</p>
                    <div>
                        <input type='checkbox' />
                        <label>Linea por producto</label>
                    </div>
                    <div>
                        <input type='checkbox' />
                        <label>Por código de barras</label>
                    </div>
                </div>
                <div class={ styles.tweakFilters }>
                    <input type='text' placeholder='Capturar código de barras o sku' />
                    <button class={ styles.mainButton }>Agregar</button>
                </div>

                <div class={ styles.tweakItems }>
                    <div class={ styles.tweakTitles }>
                        <p>Producto</p>
                        <p>Existencia</p>
                        <p>Cantidad</p>
                        <p>Costo Unitario</p>
                        <p>Lote</p>
                        <p></p>
                    </div>

                    <div class={ styles.tweakList }>
                        {
                            [1, 2].map(() => (
                            <div class={ styles.tweakItem }>
                                <select class={ styles.mainSelect }>
                                    <option>Vicodin</option>
                                </select>
                                <input type='number' placeholder='10' />
                                <input type='number' placeholder='10' />
                                <input type='number' placeholder='$10.00' />
                                <select class={ styles.mainSelect }>
                                    <option>Yes</option>
                                </select>
                                <div>
                                    <img src='https://static-00.iconduck.com/assets.00/trash-icon-462x512-njvey5nf.png' />
                                </div>
                            </div>
                            ))
                        }
                        <button class={ styles.secondaryButton }>Añadir fila</button>
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
                        <p>Comentarios</p>
                        <p>{ entrance().Comentarios }</p>
                    </div>
                </div>
            </div>

            <div class={ styles.newInventoryGButtons }>
                <button class={ styles.secondaryButton }>Cancelar</button>
                <button class={ styles.mainButton }>Guardar</button>
            </div>
        </div>
    );
}

export default NewEntrance;