import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';

function NewInvenroryTweak() {
    createEffect(() => {
        checkLogin();
    });

    return (
        <div class={ styles.buyMainCard }>
            <p>Ajustes inventario / Nuevo ajuste / AJU0001</p>

            <p>Resumen del ajuste</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.orderFolio }>
                    <img src='https://cdn-icons-png.freepik.com/512/8053/8053573.png' />
                    <p>AJU0001</p>
                </div>

                <div class={ styles.orderDescription }>
                    <div>
                        <p>Folio</p>
                        <p>AJU0001</p>
                    </div>
                    <div>
                        <p>Tipo de ajuste</p>
                        <p>Ajuste de entrada</p>
                    </div>
                    <div>
                        <p>Ubicación</p>
                        <p>Almacén Matriz</p>
                    </div>
                    <div>
                        <p>Referencia</p>
                        <p>Compra</p>
                    </div>
                    <div>
                        <p>Fecha de registro</p>
                        <p>29/04/24 19:25</p>
                    </div>
                    <div>
                        <p></p>
                        <p></p>
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
            <div class={ styles.newInventoryGButtons }>
                <button class={ styles.secondaryButton }>Cancelar</button>
                <button class={ styles.mainButton }>Guardar</button>
            </div>
            </div>
        </div>
    );
}

export default NewInvenroryTweak;