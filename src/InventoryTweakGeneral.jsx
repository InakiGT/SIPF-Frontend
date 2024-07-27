import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';

function InventoryTweakGeneral() {
    createEffect(() => {
        checkLogin();
    });

    const [ tweak, setTweak ] = createSignal({
        type: '',
        location: '',
        ref: '',
        comment: ''
    });

    return (
        <div class={ styles.buyMainCard }>
            <p>Ajustes de inventario / Nuevo ajuste</p>

            <p>Agregar Información general</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.editProductContainer }>
                    <div>
                        <label>Tipo de ajuste</label>
                        <select class={ styles.mainSelect }>
                            <option value="entrance">Ajuste de entrada</option>
                        </select>
                    </div>
                    <div>
                        <label>Ubicación</label>
                        <select class={ styles.mainSelect }>
                            <option value="matrix">Almacen Matriz</option>
                        </select>
                    </div>
                    <div>
                        <label>Referencia</label>
                        <input 
                            type='text' 
                            placeholder='123 921 319 203' 
                            onInput={(e) => setTweak({ ...tweak(), ref: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Comentario</label>
                        <input
                            type='text'
                            placeholder='Medicamento' 
                            onInput={(e) => setTweak({ ...tweak(), comment: e.target.value })} 
                        />
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

export default InventoryTweakGeneral;