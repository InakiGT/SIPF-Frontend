import { For, Show, createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import Api from './helpers/api';
import checkLogin from './helpers/checkLogin';
import loadImg from './helpers/loadImg';
import createItem from './helpers/createItem';
import CreateItemDialog from './components/CreateItemDialog';

function NewProduct() {
    createEffect(() => {
        checkLogin();
    });

    const api = new Api('http://localhost:5024/api/');

    const [ product, setProduct ] = createSignal({
        SKU: '',
        CodigoBarra: '',
        Modelo: '',
        TipoProductoId: null,
        Descripcion: '',
        Nombre: '',
        CategoriaId: null,
        MarcaId: null,
        ProveedorId: null,
        DepartamentoId: null,
        UnidadMedidaId: null,
        EstatusId: 1,
        PrecioVenta: null,
        Costo: null,
        TasaImpuestoId: null,
        CodigoSAT: '',
        ProdImagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1156px-Picture_icon_BLACK.svg.png',
        NombreIngredienteActivo: '',
        DenominacionGenerica: '',
        DenominacionProd: '',
        FormaFarmaceuticaId: null,
        TipoCoste: '',
    });
    const [ brands, setBrands ] = createSignal([]);
    const [ categories, setCategories ] = createSignal([]);
    const [ suppliers, setSuppliers ] = createSignal([]);
    const [ productTypes, setProductTypes ] = createSignal([]);
    const [ shapes, setShapes ] = createSignal([]);
    const [ departments, setDepartments ] = createSignal([]);
    const [ response, setResponse ] = createSignal(null);

    createEffect(async () => {
        let response = await api.Get('Producto/ObtenerMarcas');
        setBrands(response.data);

        response = await api.Get('Producto/ObtenerCategoria');
        setCategories(response.data);

        response = await api.Get('Proveedor/ObtenerProveedor');
        setSuppliers(response.data);

        response = await api.Get('Producto/ObtenerTipoProducto');
        setProductTypes(response.data);

        response = await api.Get('Producto/ObtenerFormaFarmaceutica');
        setShapes(response.data);

        response = await api.Get('Producto/ObtenerDepartamento');
        setDepartments(response.data);
    });

    const createProduct = async () => {
        const api = new Api('http://localhost:5024/api/Producto/CrearProducto');
        const res = await createItem(api, product);
        console.log(product())
        setResponse(res);
    }

    return (
        <div class={ styles.buyMainCard }>
            <CreateItemDialog
                setResponse={ setResponse }
                response={ response }
                route={ 'products' }
                type={ 'Producto' }
            />
            <p>Productos / Nuevo producto</p>

            <p>Agregar Información</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.editProductContainer }>
                    <div>
                        <label>SKU</label>
                        <input 
                            type='text' 
                            placeholder='SO7001' 
                            onInput={(e) => setProduct({ ...product(), SKU: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Modelo</label>
                        <input 
                            type='text' 
                            placeholder='100mg' 
                            onInput={(e) => setProduct({ ...product(), Modelo: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Código de barras</label>
                        <input 
                            type='text' 
                            placeholder='123 921 319 203' 
                            onInput={(e) => setProduct({ ...product(), CodigoBarra: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Tipo de producto</label>
                        <select onInput={ e => setProduct({ ...product(), TipoProductoId: e.target.value }) } class={ styles.mainSelect }>
                            <Show when={ productTypes() } fallback={ <option>No hay tipos de productos</option> }>
                                <For each={ productTypes() } fallback={ <option>No hay tipos de productos</option> }>
                                    {
                                        (productType) => (
                                            <option value={ productType.id }>{ productType.nombre }</option>
                                        )
                                    }
                                </For>
                            </Show>
                        </select>
                    </div>
                    <div>
                        <label>Costo</label>
                        <input 
                            type='number'
                            placeholder='$10.00'
                            onInput={(e) => setProduct({ ...product(), Costo: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Precio de venta</label>
                        <input 
                            type='number'
                            placeholder='$100.00' 
                            onInput={(e) => setProduct({ ...product(), PrecioVenta: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Nombre del producto</label>
                        <input 
                            type='text' 
                            placeholder='Vicodin' 
                            onInput={(e) => setProduct({ ...product(), Nombre: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Categoría del producto</label>
                        <select onInput={ e => setProduct({ ...product(), CategoriaId: e.target.value }) } class={ styles.mainSelect }>
                            <Show when={ categories() } fallback={ <option>No hay categorias</option> }>
                                <For each={ categories() } fallback={ <option>No hay categorias</option> }>
                                    {
                                        (category) => (
                                            <option value={ category.id }>{ category.nombre }</option>
                                        )
                                    }
                                </For>
                            </Show>
                        </select>
                    </div>
                    <div>
                        <label>Marca del producto</label>
                        <select onInput={ e => setProduct({ ...product(), MarcaId: e.target.value }) } class={ styles.mainSelect }>
                            <Show when={ brands() } fallback={ <option>No hay marcas</option> }>
                                <For each={ brands() } fallback={ <option>No hay marcas</option> }>
                                    {
                                        (brand) => (
                                            <option value={ brand.id }>{ brand.nombre }</option>
                                        )
                                    }
                                </For>
                            </Show>
                        </select>
                    </div>
                    <div>
                        <label>Proveedor del producto</label>
                        <select onInput={ e => setProduct({ ...product(), ProveedorId: e.target.value }) } class={ styles.mainSelect }>
                            <Show when={ suppliers() } fallback={ <option>No hay proveedores</option> }>
                                <For each={ suppliers() } fallback={ <option>No hay proveedores</option> }>
                                    {
                                        (supplier) => (
                                            <option value={ supplier.id }>{ supplier.nombre }</option>
                                        )
                                    }
                                </For>
                            </Show>
                        </select>
                    </div>
                    <div>
                        <label>Departamento</label>
                        <select onInput={ e => setProduct({ ...product(), DepartamentoId: e.target.value }) } class={ styles.mainSelect }>
                            <Show when={ departments() } fallback={ <option>No hay departamentos</option> }>
                                <For each={ departments() } fallback={ <option>No hay departamentos</option> }>
                                    {
                                        (department) => (
                                            <option value={ department.id }>{ department.nombre }</option>
                                        )
                                    }
                                </For>
                            </Show>
                        </select>
                    </div>
                    <div>
                        <label>Unidad de medida</label>
                        <input 
                            type='number' 
                            placeholder='Vicodin' 
                            onInput={(e) => setProduct({ ...product(), UnidadMedidaId: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Tasa de impuesto</label>
                        <input 
                            type='number' 
                            placeholder='Vicodin' 
                            onInput={(e) => setProduct({ ...product(), TasaImpuestoId: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Código SAT</label>
                        <input 
                            type='text' 
                            placeholder='1234' 
                            onInput={(e) => setProduct({ ...product(), CodigoSAT: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Nombre Ingrediente Activo</label>
                        <input 
                            type='text' 
                            placeholder='Medicamento' 
                            onInput={(e) => setProduct({ ...product(), NombreIngredienteActivo: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Denominación generica</label>
                        <input 
                            type='text' 
                            placeholder='Medicamento' 
                            onInput={(e) => setProduct({ ...product(), DenominacionGenerica: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Denominación del producto</label>
                        <input 
                            type='text' 
                            placeholder='Medicamento' 
                            onInput={(e) => setProduct({ ...product(), DenominacionProd: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Forma Farmaceutica</label>
                        <select onInput={ e => setProduct({ ...product(), FormaFarmaceuticaId: e.target.value }) } class={ styles.mainSelect }>
                            <Show when={ shapes() } fallback={ <option>No hay formas farmaceuticas</option> }>
                                <For each={ shapes() } fallback={ <option>No hay formas farmaceuticas</option> }>
                                    {
                                        (shape) => (
                                            <option value={ shape.id }>{ shape.nombre }</option>
                                        )
                                    }
                                </For>
                            </Show>
                        </select>
                    </div>
                    <div>
                        <label>Tipo de coste</label>
                        <input 
                            type='text' 
                            placeholder='Medicamento' 
                            onInput={(e) => setProduct({ ...product(), TipoCoste: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label>Descripción</label>
                        <input 
                            type='text' 
                            placeholder='Descripcion' 
                            onInput={(e) => setProduct({ ...product(), Descripcion: e.target.value })} 
                        />
                    </div>
                </div>
            </div>

            <p>Imagen del producto</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.productImgPreview }>
                    <img src={ product().ProdImagen } />
                    <input type='file' accept='image/*' onInput={(e) => loadImg(e, product, setProduct)} />
                </div>
            </div>

            <p>Resumen del producto agregado</p>
            <div class={ styles.simpleCard }>
                <div class={ styles.orderFolio }>
                    <img src='https://cdn-icons-png.flaticon.com/512/1380/1380641.png' />
                    <p>{ product().SKU }</p>
                </div>

                <div class={ styles.orderStatus }>
                    <p>Status: </p>
                    <select onChange={ (e) => setProduct({...product(), EstatusId: parseInt(e.target.selectedIndex + 1)}) }>
                        <option selected value={ 1 }>Activo</option>
                        <option value={ 2 }>Inactivo</option>
                        <option value={ 3 }>Eliminado</option>
                    </select>
                </div>

                <div class={ styles.orderDescription }>
                    <div>
                        <p>SKU</p>
                        <p>{ product().SKU }</p>
                    </div>
                    <div>
                        <p>Modelo</p>
                        <p>{ product().Modelo }</p>
                    </div>
                    <div>
                        <p>Tipo de producto</p>
                        <p>{ product().TipoProductoId }</p>
                    </div>
                    <div>
                        <p>Nombre del producto</p>
                        <p>{ product().Nombre }</p>
                    </div>
                    <div>
                        <p>Precio de venta</p>
                        <p>{ product().PrecioVenta }</p>
                    </div>
                    <div>
                        <p>Costo</p>
                        <p>{ product().Costo }</p>
                    </div>
                </div>
                <div class={ styles.editProductButtons }>
                    <button 
                        class={ styles.mainButton }
                        onClick={() => createProduct()}
                    >Guardar</button>
                </div>
            </div>
        </div>
    );
}

export default NewProduct;