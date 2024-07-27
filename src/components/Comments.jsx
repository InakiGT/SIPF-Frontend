import styles from '../App.module.css';

function Comments() {
    return (
        <div class={ styles.simpleCard }>
            <div class={ styles.comments }>
                <p>Comentarios</p>
                <div class={ styles.comment }>
                    <div>
                        <img src='https://static-00.iconduck.com/assets.00/profile-user-icon-2048x2048-m41rxkoe.png' />
                        <p>Julian</p>
                    </div>
                    <p>Esto es un comentario hecho por mi</p>
                </div>
            </div>
            
            <div class={ styles.commentsAdd }>
                <label for='search'>
                    <img src='https://static-00.iconduck.com/assets.00/profile-user-icon-2048x2048-m41rxkoe.png' />
                    <p>Agregar un comentario</p>
                </label>
                <div>
                    <input id='search' type='text' placeholder='Agregar un comentario' />
                    <button class={ styles.mainButton }>Agregar</button>
                </div>
            </div>
        </div>
    );
}

export default Comments;