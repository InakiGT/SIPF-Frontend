import styles from '../App.module.css';

function SellCard({ item, setCart, cart, showProduct }) {
    const addItem = () => {
        let tmp = false;

        const updatedCart = cart().map(i => {
            if (i.id === item.id) {
                tmp = true;
                return { ...i, cantidad: i.cantidad + 1 };
            }
            return i;
        });
    
        if (tmp) {
            setCart(updatedCart);
        } else {
            setCart([...cart(), { ...item, cantidad: 1 }]);
        }
    }

    return (
        <div class={ styles.sellCard }>
            <img src='https://s.wsj.net/public/resources/images/BN-IF460_MEDICA_M_20150503171927.jpg' />

            <div>
                <p class={ styles.sellCardTitle }>{ item.nombre }</p>
                <p class={ styles.sellCardDesc }>Modelo: { item.modelo }</p>
                <div class={ styles.sellCardMore }>
                    <p>${ item.precioVenta }.00</p>
                    <p>Disp: 40</p>
                </div>
                <div class={ styles.sellCardButtons }>
                    <button 
                        class={ styles.secondaryButton }
                        onClick={ () => showProduct(item) }
                    >Más</button>
                    <button class={ styles.mainButton } onClick={() => addItem()}> Agregar</button>
                </div>
            </div>
        </div>
    );
}

export default SellCard;