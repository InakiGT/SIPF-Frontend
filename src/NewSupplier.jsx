import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';

function NewSupplier() {
    createEffect(() => {
        checkLogin();
    });

    const [ products, setProducts ] = createSignal([{}]);

    return (
        <div class={ styles.buyMainCard }>
        <p>Proveedores / Nuevo proveedor</p>

        <p>Agregar Información</p>
        <div class={ styles.simpleCard }>
            <div class={ styles.editProductContainer }>
                <div>
                    <label>Nombre del proveedor</label>
                    <input
                        type='text'
                        placeholder='Proveedor'
                        onInput={(e) => setProduct({ ...product(), type: e.target.value })} 
                    />
                </div>
                <div>
                    <label>RFC</label>
                    <input
                        type='text'
                        placeholder='UNRFC010'
                        onInput={(e) => setProduct({ ...product(), type: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Teléfono</label>
                    <input
                        type='text'
                        placeholder='5511002233'
                        onInput={(e) => setProduct({ ...product(), type: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Móvil</label>
                    <input
                        type='text'
                        placeholder='5511002233'
                        onInput={(e) => setProduct({ ...product(), type: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        type='email'
                        placeholder='proveedor@correo.com'
                        onInput={(e) => setProduct({ ...product(), cost: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Término de pago</label>
                    <select class={ styles.mainSelect }>
                        <option>7 días</option>
                    </select>
                </div>
                <div>
                <label>Es compañía</label>
                    <select class={ styles.mainSelect }>
                        <option>Sí</option>
                        <option>No</option>
                    </select>
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

export default NewSupplier;