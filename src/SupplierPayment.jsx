import { createEffect } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';

function SupplierPayment() {
    createEffect(() => {
        checkLogin();
    });

    return (
        <div class={ styles.buyMainCard }>
            <p>Facturas de proveedor / ENT0001 / Nuevo pago proveedor</p>

            <div class={ styles.simpleCard }>

                <div class={ styles.orderLabels }>
                    <p></p>
                    <p>Documento</p>
                    <p>Folio proveedor</p>
                    <p>Fecha factura</p>
                    <p>Moneda</p>
                    <p>Importe</p>
                    <p>Saldo</p>
                    <p>A pagar</p>
                </div>

                <div class={ `${styles.orderValues} ${ styles.paySelected }` }>
                    <div>
                        <input type='checkbox' />
                    </div>
                    <p>ENT0001</p>
                    <p>A0ASDA</p>
                    <p>26/05/2024 19:30</p>
                    <p>MXN</p>
                    <p>$16.00</p>
                    <p>$16.00</p>
                    <input type='number' placeholder='$100.00' />
                </div>

                <div class={ styles.supPaymentCheck }>
                    <label>Seleccionar todo</label>
                    <input type='checkbox' />
                </div>
            </div>

            <p>Información general</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.editProductContainer }>
                    <div>
                        <label>Nombre de sucursal</label>
                        <select class={ styles.mainSelect }>
                            <option value="">Sucursal Matríz</option>
                        </select>
                    </div>
                    <div>
                        <label>Forma de pago</label>
                        <select class={ styles.mainSelect }>
                            <option value="">Efectivo</option>
                        </select>
                    </div>
                    <div>
                        <label>Nota de débito</label>
                        <select class={ styles.mainSelect }>
                            <option value="">SI</option>
                        </select>
                    </div>
                    <div>
                        <label>Cuenta bancaria</label>
                        <select class={ styles.mainSelect }>
                            <option value="">Cuenta</option>
                        </select>
                    </div>
                    <div>
                        <label>Moneda</label>
                        <select class={ styles.mainSelect }>
                            <option value="">MXN</option>
                        </select>
                    </div>
                    <div>
                        <label>Fecha de pago</label>
                        <input 
                            readOnly={ true }
                            type='date'
                            placeholder='$10.00'
                            onInput={(e) => setProduct({ ...product(), cost: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Concepto</label>
                        <input 
                            readOnly={ true }
                            type='text' 
                            placeholder='Concepto' 
                            onInput={(e) => setProduct({ ...product(), name: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Referencia bancaria</label>
                        <input 
                            readOnly={ true }
                            type='text' 
                            placeholder='Referencia' 
                            onInput={(e) => setProduct({ ...product(), name: e.target.value })} 
                        />
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

export default SupplierPayment;