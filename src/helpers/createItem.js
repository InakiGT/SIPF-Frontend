import isEmpty from "./isEmpty";

const createItem = async (api, item, type = 'Post') => {
    const result = {};
    
    console.log(item())
    for (const key in item()) {
        if (item().hasOwnProperty(key)) {
            if ( isEmpty(item()[key]) ) {
                result[key] = isEmpty(item()[key]);
                return false;
            }
        }
    }

    const response = await api[type](item());
    if (response.status === 201 || response.status === 204 || response.status === 200) {
        return true;
    }

    return false;
}

export default createItem;