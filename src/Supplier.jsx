import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';

function Supplier() {
    createEffect(() => {
        checkLogin();
    });

    const [ edit, setEdit ] = createSignal(true);
    
    return (
        <div class={ styles.buyMainCard }>
            <p>Proveedor / POV0001</p>

            <p>Información general</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.orderFolio }>
                    <img src='https://png.pngtree.com/png-clipart/20230504/original/pngtree-supplier-line-icon-png-image_9138990.png' />
                    <p>POV0001</p>
                </div>

                <div class={ styles.orderDescription }>
                    <div>
                        <p>ID</p>
                        <p>POV0001</p>
                    </div>
                    <div>
                        <p>RFC</p>
                        <p>UNRFC001</p>
                    </div>
                    <div>
                        <p>Teléfono</p>
                        <p>5510121012</p>
                    </div>
                    <div>
                        <p>Móvil</p>
                        <p>5510121012</p>
                    </div>
                    <div>
                        <p>Email</p>
                        <p>proveedor@correo.com</p>
                    </div>
                    <div>
                        <p>Término de pago</p>
                        <p>7 días</p>
                    </div>
                </div>
            </div>

            <p>Detalles</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.editProductContainer }>
                    <div>
                        <label>ID</label>
                        <input type='text' placeholder='POV0001' disabled={ edit() } />
                    </div>
                    <div>
                        <label>RFC</label>
                        <input type='text' placeholder='UNRFC001' disabled={ edit() } />
                    </div>
                    <div>
                        <label>Teléfono</label>
                        <input type='text' placeholder='5500110011' disabled={ edit() } />
                    </div>
                    <div>
                        <label>Móvil</label>
                        <input type='text' placeholder='5500110011' disabled={ edit() } />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type='number' placeholder='proveedor@correo.com' disabled={ edit() } />
                    </div>
                    <div>
                        <label>Término de pago</label>
                        <input type='number' placeholder='7 días' disabled={ edit() } />
                    </div>
                    <div>
                        <label>Importe máximo de crédito</label>
                        <input type='number' placeholder='$4000.00' disabled={ edit() } />
                    </div>
                    <div>
                        <label>Es compañía</label>
                        <select class={ styles.mainSelect }>
                            <option>Sí</option>
                            <option>No</option>
                        </select>
                    </div>
                </div>
                <div class={ styles.editProductButtons }>
                    <button class={ styles.secondaryButton } onClick={() => setEdit(false)}>Editar</button>
                    <button class={ styles.mainButton }>Guardar</button>
                </div>
            </div>
        </div>
    );
}

export default Supplier;