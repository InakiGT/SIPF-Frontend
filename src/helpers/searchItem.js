const searchItem = (e, items, setPosition, setCurrentItems) => {
    if (!e.target.value) {
        setPosition(0);
        setCurrentItems(items.slice(0, 4));
        return;
    }

    const rx = new RegExp(e.target.value, 'i')
    setCurrentItems(items.filter((item) => {
        if (rx.test(item.nombre)) return item;
    }));
}

export default searchItem;