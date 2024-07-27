import { createEffect } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';

function Order() {
    createEffect(() => {
        checkLogin();
    });

    return (
        <div class={ styles.buyMainCard }>
            <p>Ordenes de compra / Orden de compra</p>

            <p>Información general</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.orderFolio }>
                    <img src='https://cdn-icons-png.freepik.com/256/888/888034.png?semt=ais_hybrid' />
                    <p>PO001</p>
                </div>

                <div class={ styles.orderStatus }>
                    <p>Status: </p>
                    <select>
                        <option>Solicitud de presupuesto</option>
                        <option class={ styles.orderStatusCanceled }>Cancelado</option>
                    </select>
                </div>

                <div class={ styles.orderDescription }>
                    <div>
                        <p>Sucursal</p>
                        <p>Sucursal matriz</p>
                    </div>
                    <div>
                        <p>Importe total</p>
                        <p>$100.00</p>
                    </div>
                    <div>
                        <p>Importe total</p>
                        <p>$100.00</p>
                    </div>
                </div>
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

                <div class={ styles.orderValues }>
                    <p>Vicodín</p>
                    <p>La del Dr. House</p>
                    <p>19 Ago 2024</p>
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
        </div>
    );
}

export default Order;