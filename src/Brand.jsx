import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';

function Brand() {
    createEffect(() => {
        checkLogin();
    });

    const [ edit, setEdit ] = createSignal(true);

    return (
        <div class={ styles.buyMainCard }>
            <p>Marca / BR001</p>

            <p>Información general</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.orderFolio }>
                    <img src='https://cdn-icons-png.freepik.com/512/5278/5278603.png' />
                    <p>BR001</p>
                </div>

                <div class={ styles.orderDescription }>
                    <div>
                        <p>ID</p>
                        <p>BR001</p>
                    </div>
                    <div>
                        <p>Nombre</p>
                        <p>Generico</p>
                    </div>
                    <div>
                        <p>Tipo de producto</p>
                        <p>Farmacia</p>
                    </div>
                </div>
            </div>

            <p>Detalles</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.editProductContainer }>
                    <div>
                        <label>Nombre del proveedor</label>
                        <input
                            type='text'
                            placeholder='Proveedor'
                            onInput={(e) => setProduct({ ...product(), type: e.target.value })} 
                            disabled={ edit() }
                            />
                    </div>
                    <div>
                        <label>RFC</label>
                        <input
                            type='text'
                            placeholder='UNRFC010'
                            onInput={(e) => setProduct({ ...product(), type: e.target.value })} 
                            disabled={ edit() }
                            />
                    </div>
                    <div>
                        <label>Teléfono</label>
                        <input
                            type='text'
                            placeholder='5511002233'
                            onInput={(e) => setProduct({ ...product(), type: e.target.value })} 
                            disabled={ edit() }
                            />
                    </div>
                    <div>
                        <label>Móvil</label>
                        <input
                            type='text'
                            placeholder='5511002233'
                            onInput={(e) => setProduct({ ...product(), type: e.target.value })} 
                            disabled={ edit() }
                            />
                    </div>
                    <div>
                        <label>Email</label>
                        <input 
                            type='email'
                            placeholder='proveedor@correo.com'
                            onInput={(e) => setProduct({ ...product(), cost: e.target.value })} 
                            disabled={ edit() }
                        />
                    </div>
                    <div>
                        <label>Término de pago</label>
                        <select class={ styles.mainSelect } disabled={ edit() }>
                            <option>7 días</option>
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

export default Brand;