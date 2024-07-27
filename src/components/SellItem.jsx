import styles from '../App.module.css';

function SellItem({ item, setCart, cart }) {
    const deleteItem = () => {
        setCart(cart().filter(i => i.id !== item.id));
    }

    return (
        <div class={ styles.sellItem }>
            <p>{ item.nombre }</p>
            <div>
                <p>Precio: ${ item.precioVenta }</p>
                <div>
                    <label>Cantidad: </label>
                    <input
                        type='number' placeholder='10'
                        value={ item.cantidad }
                    />
                </div>
                <img
                    onClick={() => deleteItem()}
                    src='https://static-00.iconduck.com/assets.00/delete-icon-1864x2048-bp2i0gor.png'
                />
            </div>
        </div>
    );
}

export default SellItem;