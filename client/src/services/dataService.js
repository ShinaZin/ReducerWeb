import httpHelper from '../helpers/httpHelper';

export default {
    getMessage,
    getItemsList,
    addItem,
    deleteItem,
    editItem
};

function getMessage() {
    return httpHelper.get(`/api/message`);
}

function getItemsList() {
    return httpHelper.get('/api/items');
}

function addItem(name) {
    return httpHelper.post('/api/items', {name});
}

function deleteItem(id) {
    return httpHelper.delete(`/api/items/${id}`);
}

function editItem(item) {
    let data = {
        id: item.id,
        name: item.name
    };

    return httpHelper.put('/api/items', data);
}