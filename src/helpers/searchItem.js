const searchItem = (e, items, setPosition, setCurrentItems, types = ['nombre']) => {
    if (!e.target.value) {
        setPosition(0);
        setCurrentItems(items.slice(0, 4));
        return;
    }

    const rx = new RegExp(e.target.value, 'i');
    setCurrentItems(items.filter((item) => {
        return types.some((type) => rx.test(item[type]));
    }));
}

export default searchItem;
