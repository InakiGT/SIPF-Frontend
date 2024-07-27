import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';

function NewBill() {
    createEffect(() => {
        checkLogin();
    });
    const [ products, setProducts ] = createSignal([{}]);

    return (
        <div class={ styles.buyMainCard }>
            <p>Facturas de proveedor / Nueva factura</p>

            <p>Desde una orden de compra</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.editProductContainer }>
                    <div>
                        <label>Orden</label>
                        <select class={ styles.mainSelect }>
                            <option>Orden de compra</option>
                        </select>
                    </div>
                </div>
            </div>

            <p>Agregar Información General</p>
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
                            type='date'
                            onInput={(e) => setProduct({ ...product(), type: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Termino de pago</label>
                        <input 
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

            <p>Productos en la compra</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.orderLabels }>
                    <p>Producto</p>
                    <p>Descripción</p>
                    <p>Fecha prevista</p>
                    <p>Cantidad</p>
                    <p>Precio unitario</p>
                    <p>Tasas de impuestos</p>
                    <p>Importe de impuestos</p>
                    <p>Porcentaje de desc.</p>
                    <p>Subtotal</p>
                </div>

                {
                    products().map(() => (
                    <form class={ styles.orderInputs }>
                        <select>
                            <option>Vicodín</option>
                        </select>
                        <textarea name="" id=""></textarea>
                        <input type="date" />
                        <input type="number" placeholder="0" />
                        <input type="number" placeholder="$100.00" />
                        <input type="number" placeholder="16%" />
                        <input type="number" placeholder="$10.00" />
                        <input type="number" placeholder="10%" />
                        <input type="number" placeholder="$110.00" />
                    </form>
                    ))
                }

                <button class={ styles.secondaryButton } onClick={() => setProducts([ ...products(), {} ])}>Añadir fila</button>
            </div>

            <p>Resumen de los Productos</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.orderResumeUpper }>
                    <p>Elementos: 1</p>
                    <p>Unidades: 20</p>
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

            <div class={ styles.orderButtons }>
                <button class={ styles.mainButton }>Cancelar</button>
                <button class={ styles.mainButton }>Guardar</button>
            </div>
        </div>
    );
}

export default NewBill;