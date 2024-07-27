import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import Api from './helpers/api';
import createItem from './helpers/createItem';
import { useNavigate } from '@solidjs/router';
import CreateItemDialog from './components/CreateItemDialog';
import checkLogin from './helpers/checkLogin';

function NewCategory() {
    createEffect(() => {
        checkLogin();
    });

    const api = new Api('http://localhost:5024/api/Producto/CrearCategoria');
    const navigate = useNavigate();

    const [ category, setCategory ] = createSignal({
        nombre: '', 
        disponibleGastos: false,
        disponibleProd: false,
        requiereReceta: false,
        visiblePV: false,

    });
    const [ response, setResponse ] = createSignal(null);

    const createCategory = async () => {
        const res = await createItem(api, category);

        setResponse(res);
    }

    return (
        <div class={ styles.buyMainCard }>
            <CreateItemDialog
                setResponse={ setResponse }
                response={ response }
                route={ 'categories' }
                type={ 'Categoría' }
            />

            <p>Marcas / Nueva marca</p>

            <p>Agregar Información</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.editProductContainer }>
                    <div>
                        <label>Nombre</label>
                        <input
                            type='text'
                            placeholder='Opioides'
                            onInput={(e) => setCategory({ nombre: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Disponible Gastos</label>
                        <div>
                            <p>¿Está dispobile?</p>
                            <input
                                type='checkbox'
                                value={ category().disponibleGastos  }
                                onInput={(e) => setCategory({ ...category(), disponibleGastos: e.target.value })} 
                            />
                        </div>
                    </div>
                    <div>
                        <label>Disponible Producto</label>
                        <div>
                        <p>¿Está dispobile?</p>
                            <input
                                type='checkbox'
                                value={ category().disponibleProd  }
                                onInput={(e) => setCategory({ ...category(), disponibleProd: e.target.value })} 
                            />
                        </div>
                    </div>
                    <div>
                        <label>Requiere receta</label>
                        <div>
                        <p>¿Requiere receta?</p>
                        <input
                            type='checkbox'
                            value={ category().requiereReceta  }
                            onInput={(e) => setCategory({ ...category(), requiereReceta: e.target.value })} 
                            />
                        </div>
                    </div>
                    <div>
                        <label>Visible PV</label>
                        <div>
                            <p>¿Es visible?</p>
                            <input
                                type='checkbox'
                                // value={ category().visiblePV  }
                                // value={ true }
                                onInput={(e) => console.log(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class={ styles.orderButtons }>
                <button 
                    class={ styles.mainButton }
                    onClick={() => navigate('/categories')}
                >Cancelar</button>
                <button 
                    class={ styles.mainButton }
                    onClick={ () => createCategory() }
                >Guardar</button>
            </div>
        </div>
    );
}

export default NewCategory;