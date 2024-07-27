import { Show, createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import checkLogin from './helpers/checkLogin';
import Api from './helpers/api';
import { useSearchParams } from '@solidjs/router';
import Loader from './components/Loader';
import CreateItemDialog from './components/CreateItemDialog';
import createItem from './helpers/createItem';

function Category() {
    createEffect(() => {
        checkLogin();
    });

    const api = new Api('http://localhost:5024/api/Producto');

    const [ searchParams ] = useSearchParams();

    const [ edit, setEdit ] = createSignal(true);
    const [ category, setCategory ] = createSignal(null);

    createEffect(async () => {
        const data = await api.Get(`/ObtenerCategoriaPorId/${ searchParams.id }`);
        setCategory(data.data);
    });

    const [ response, setResponse ] = createSignal(null);

    const updateCategory = async () => {
        const api = new Api(`http://localhost:5024/api/Producto/ActualizarCategoria/${category()?.id}`);
        const res = await createItem(api, category, 'Put');
        console.log(category())
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


            <p>Categoría / { category()?.id }</p>
            
            <Show when={ category() } fallback={ <Loader /> }>
            <p>Información general</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.orderFolio }>
                    <img src='https://icons.veryicon.com/png/o/commerce-shopping/icon-of-lvshan-valley-mobile-terminal/home-category.png' />
                    <p>{ category().id }</p>
                </div>

                <div class={ styles.orderDescription }>
                    <div>
                        <p>ID</p>
                        <p>{ category().id }</p>
                    </div>
                    <div>
                        <p>Nombre</p>
                        <p>{ category().nombre }</p>
                    </div>
                    <div>
                        <p>Disponible Gastos</p>
                        <p>{ category().disponibleGastos ? 'Sí' : 'No' }</p>
                    </div>
                    <div>
                        <p>Disponible Producto</p>
                        <p>{ category().disponibleProd ? 'Sí' : 'No' }</p>
                    </div>
                    <div>
                        <p>Requiere receta</p>
                        <p>{ category().requiereReceta ? 'Sí' : 'No' }</p>
                    </div>
                    <div>
                        <p>Visible PV</p>
                        <p>{ category().visiblePV ? 'Sí' : 'No' }</p>
                    </div>
                </div>
            </div>

            <p>Detalles</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.editProductContainer }>
                    <div>
                        <label>Nombre de la categoría</label>
                        <input
                            type='text'
                            value={ category().nombre }
                            placeholder='Categoría'
                            onInput={(e) => setCategory({ ...category(), nombre: e.target.value })} 
                            disabled={ edit() }
                        />
                    </div>
                    <div>
                        <label>Disponible Gastos</label>
                            <div>
                                <p>
                                    ¿Está dispobile?
                                </p>
                                <input
                                    type='checkbox'
                                    value={ category().disponibleGastos  }
                                    onInput={(e) => setCategory({ ...category(), disponibleGastos: !category().disponibleGastos })} 
                                    disabled={ edit() }
                                />
                            </div>
                    </div>
                    <div>
                        <label>Disponible Producto</label>
                        <div>
                            <p>
                            ¿Está dispobile?
                            </p>
                            <input
                                type='checkbox'
                                value={ category().disponibleProd  }
                                onInput={(e) => setCategory({ ...category(), disponibleProd: !category().disponibleProd})} 
                                disabled={ edit() }
                            />
                        </div>
                    </div>
                    <div>
                        <label>Requiere receta</label>
                        <div>

                            <p>
                            ¿Requiere receta?
                            </p>
                            <input
                                type='checkbox'
                                value={ category().requiereReceta  }
                                onInput={(e) => setCategory({ ...category(), requiereReceta: !category().requiereReceta })} 
                                disabled={ edit() }
                            />
                        </div>
                    </div>
                    <div>
                        <label>Visible PV</label>
                        <div>
                            <p>
                            ¿Es visible?
                            </p>
                            <input
                                type='checkbox'
                                value={ category().visiblePV  }
                                onInput={(e) => setCategory({ ...category(), visiblePV: !category().visiblePV })} 
                                disabled={ edit() }
                            />
                        </div>
                    </div>
                </div>
                <div class={ styles.editProductButtons }>
                    <button class={ styles.secondaryButton } onClick={() => setEdit(false)}>Editar</button>
                    <button class={ styles.mainButton } onClick={ () => updateCategory() }>Guardar</button>
                </div>
            </div>
            </Show>
        </div>
    );
}

export default Category;