import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import Comments from './components/Comments';
import checkLogin from './helpers/checkLogin';

function Bill() {
    createEffect(() => {
        checkLogin();
    });

    const [ placement, setPlacement ] = createSignal(0);

    return (
        <div class={ styles.buyMainCard }>
            <p>Facturas de proveedor / ENT0001</p>

            <p>Información general</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.orderFolio }>
                    <img src='https://cdn-icons-png.flaticon.com/512/2584/2584894.png' />
                    <p>ENT0001</p>
                </div>

                <div class={ styles.orderDescription }>
                    <div>
                        <p>Sucursal</p>
                        <p>Sucursal matriz</p>
                    </div>
                    <div>
                        <p>Fecha de factura</p>
                        <p>26/04/2024 19:30</p>
                    </div>
                    <div>
                        <p>Fecha de vencimiento</p>
                        <p>26/05/2024 19:30</p>
                    </div>
                    <div>
                        <p>Folio de proveedor</p>
                        <p>AV0012ASK</p>
                    </div>
                    <div>
                        <p>Importe total</p>
                        <p>$100.00</p>
                    </div>
                    <div>
                        <p>Saldo</p>
                        <p>$100.00</p>
                    </div>
                    <div>
                        <p>Fecha registro</p>
                        <p>26/04/2024 19:30</p>
                    </div>
                </div>
            </div>

            <div class={ styles.placementCard }>
                <p
                    class={ placement() === 0 ? styles.selectedPlacement : '' }
                    onClick={ () => setPlacement(0) }
                >Detalles</p>
                <p
                    class={ placement() === 1 ? styles.selectedPlacement : '' }
                    onClick={ () => setPlacement(1) }
                >Comentarios</p>
                <p
                    class={ placement() === 2 ? styles.selectedPlacement : '' }
                    onClick={ () => setPlacement(2) }
                >Documentos</p>
            </div>

            {
                placement() === 0 ? (
                    <>
                        <p>Productos en la orden</p>
                        <div class={ styles.simpleCard }>
                            <div class={ styles.orderLabels }>
                                <p>Producto</p>
                                <p>Descripción</p>
                                <p>Cantidad</p>
                                <p>Precio unitario</p>
                                <p>Tasas de impuestos</p>
                                <p>Importe de impuestos</p>
                                <p>Porcentaje de desc.</p>
                                <p>Subtotal</p>
                            </div>

                            <div class={ styles.orderValues }>
                                <p>Vicodín</p>
                                <p>La del Dr. House</p>
                                <p>30</p>
                                <p>$100.00</p>
                                <p>16%</p>
                                <p>$16.00</p>
                                <p>0%</p>
                                <p>$116.00</p>
                            </div>

                            <div class={ styles.orderSummary }>
                                <p>Resumen:</p>
                                <div>
                                    <p>Elementos: 1</p>
                                    <p>Unidades: 30</p>
                                </div>
                            </div>
                            <div class={ styles.orderResumeBottom }>
                                <div>
                                    <div>
                                        <p>Subtotal: </p>
                                        <p>$20.00</p>
                                    </div>
                                    <div>
                                        <p>Descuento: </p>
                                        <p>$0.00</p>
                                    </div>
                                    <div class={ styles.orderResumeFee }>
                                        <p>Impuesto: </p>
                                        <p>$10.00</p>
                                    </div>
                                    <div>
                                        <p>Total: </p>
                                        <p>$30.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>Detalles</p>
                        <div class={ styles.simpleCard }>
                        <div class={ styles.editProductContainer }>
                            <div>
                                <label>Nombre de sucursal</label>
                                <select class={ styles.mainSelect }>
                                    <option value="">Sucursal Matríz</option>
                                </select>
                            </div>
                            <div>
                                <label>Proveedor</label>
                                <select class={ styles.mainSelect }>
                                    <option value="">GAR</option>
                                </select>
                            </div>
                            <div>
                                <label>Almacén</label>
                                <select class={ styles.mainSelect }>
                                    <option value="">Almacén Matriz</option>
                                </select>
                            </div>
                            <div>
                                <label>Fecha de factura</label>
                                <input
                                    readOnly={ true }
                                    type='date'
                                    onInput={(e) => setProduct({ ...product(), type: e.target.value })} 
                                />
                            </div>
                            <div>
                                <label>Termino de pago</label>
                                <input 
                                    readOnly={ true }
                                    type='number'
                                    placeholder='$10.00'
                                    onInput={(e) => setProduct({ ...product(), cost: e.target.value })} 
                                />
                            </div>
                            <div>
                                <label>Tipo de moneda</label>
                                <select class={ styles.mainSelect }>
                                    <option>MXN</option>
                                </select>
                                </div>
                                <div>
                                    <label>Folio factura del proveedor</label>
                                    <input 
                                        readOnly={ true }
                                        type='text' 
                                        placeholder='A0120AVK' 
                                        onInput={(e) => setProduct({ ...product(), name: e.target.value })} 
                                    />
                                </div>
                            </div>
                        </div>

                        <p>Si es gasto, clasifícalo</p>
                        <div class={ styles.simpleCard }>
                            <div class={ styles.editProductContainer }>
                                <div>
                                    <label>Categoría del gasto</label>
                                    <select class={ styles.mainSelect }>
                                        <option value="">Categoría</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </>
                )
                : placement() === 1 ? (
                    <>
                        <p>Comentarios</p>
                        <Comments />
                    </>
                ) : (
                    <>
                        <p>Documentos</p>
                    </>
                )
            }
        </div>
    );
}

export default Bill;