import styles from '../App.module.css';

function PositionItems({ items, position, setPosition }) {

    const increment = () => {
        setPosition(items().length / 4 > position() + 1 ? position() + 1 : position());
    }
    
    const decrement = () => {
        setPosition(position() !== 0 ? position() - 1 : 0);
    }

    return (
    <div class={ styles.productsBottomButtons }>
        <button 
            class={ styles.secondaryButton }
            onClick={ () => setPosition(0) }
        >Primero</button>
        <button 
            class={ styles.secondaryButton }
            onClick={() => decrement()}
        >Atrás</button>
        <p>{ position() + 1 }</p>
        <button 
            class={ styles.secondaryButton }
            onClick={() => increment()}
        >Siguiente</button>
        <button 
            class={ styles.secondaryButton }
            onClick={() => setPosition(Math.round(items().length / 4 - 1))}
        >Último</button>
    </div>
    );
}

export default PositionItems;