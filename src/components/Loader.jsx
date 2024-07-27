import styles from '../App.module.css';

function Loader() {
    return (
        <div class={ styles.loaderContainer }>
            <svg class={ styles.loader } width="771" height="108" viewBox="0 0 771 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <rect class={ styles.loader4 } x="663" width="108" height="108" fill="#003950"/>
                    <rect class={ styles.loader3 } x="442" width="108" height="108" fill="#003950"/>
                    <rect class={ styles.loader2 } x="221" width="108" height="108" fill="#003950"/>
                    <rect class={ styles.loader1 } width="108" height="108" fill="#003950"/>
                </g>
            </svg>
        </div>
    );
}

export default Loader;