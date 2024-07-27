
const loadImg = (e, item, setItem) => {
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            setItem({ ...item(), ProdImagen: e.target.result });
        };
        
        reader.readAsDataURL(file);
    } else {
        setItem({ ...item() });
    }
}

export default loadImg;