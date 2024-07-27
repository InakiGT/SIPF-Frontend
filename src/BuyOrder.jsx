import { createSignal, createEffect } from "solid-js";
import styles from './App.module.css';
import Api from "./helpers/api";
import checkLogin from "./helpers/checkLogin";

function BuyOrder() {
    createEffect(() => {
        checkLogin();
    });

    const [ products, setProducts ] = createSignal([{}]);

    const api = new Api('http://localhost:5024/api/empresa/13');

    createEffect(async () => {
        const response = await  api.Get('');

        console.log(response)
    });

    return (
        <div class={ styles.buyMainCard }>
            <p>Ordenes de compra / Nueva orden de compra</p>

            <p>Información general</p>
            <div class={ styles.simpleCard }>
                <form class={ styles.orderInfoForm }>
                    <div>
                        <label>Sucursal</label>
                        <select name="" id="">
                            <option>Guadalajara</option>
                        </select>
                    </div>
                    <div>
                        <label>Término de pago</label>
                        <select name="" id="">
                            <option>Mucho dinero</option>
                        </select>
                    </div>
                    <div>
                        <label>Entrega en</label>
                        <select name="" id="">
                            <option>Almacen general</option>
                        </select>
                    </div>
                    <div>
                        <label>Proveedor</label>
                        <select name="" id="">
                            <option>Similares</option>
                        </select>
                    </div>
                </form>
            </div>

            <p>Productos en la orden</p>
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
            
            <p>Resumen</p>
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

export default BuyOrder;