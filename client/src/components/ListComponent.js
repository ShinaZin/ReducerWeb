import React, { Component } from 'react';
import autoBind from 'react-autobind';
import toastr from 'toastr';

import dataService from '../services/dataService';

class ListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            name: '',
            itemToEdit: null
        };

        autoBind(this);
    }

    componentDidMount() {
        this.getItemsList();
    }

    async getItemsList() {
        let items = await dataService.getItemsList();

        this.setState({
            items
        });
    }

    get anyItems() {
        let items = this.state.items;

        return items && items.length;
    }

    updateState(event) {
        this.setState({
            name: event.target.value
        });
    }

    async addNewItem() {
        let name = this.state.name.trim();

        if (!name) {
            toastr.warning('Item name is required.');
            return;
        }

        await dataService.addItem(name);

        toastr.success('Item was added.');

        this.setState({
            name: '',
            itemToEdit: null
        }, () => {
            this.getItemsList();
        });
    }

    async deleteItemAction(id) {
        let isDeleteConfirm = window.confirm('Are you sure?');

        if (isDeleteConfirm) {
            await dataService.deleteItem(id);

            toastr.success('Item was removed.');

            await this.getItemsList();
        }
    }

    async editItemAction(item) {
        this.setState({
            itemToEdit: Object.assign({}, item)
        });
    }

    updateItemState(event) {
        let item = this.state.itemToEdit;

        item.name = event.target.value;

        this.setState({
            itemToEdit: Object.assign({}, item)
        });
    }

    async saveItemAction() {
        let item = this.state.itemToEdit;

        if (!item && !item.name.trim()) {
            toastr.warning('Item name is required.');
            return;
        }

        let isSaveConfirm = window.confirm('Are you sure?');

        if (isSaveConfirm) {
            await dataService.editItem(item);

            toastr.success('Item was updated.');

            this.setState({
                itemToEdit: null
            }, () => {
                this.getItemsList();
            });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <span>New item: </span>

                    <input type="text" name="newItem" className="form-control name-input" placeholder="Enter new item"
                           value={this.state.name} onChange={this.updateState} />

                    <button className="link" onClick={this.addNewItem}>Add</button>
                </div>

                {this.anyItems ? (
                    <div>
                        <h4>Items</h4>

                        {this.state.items.map(item => this.renderItem(item))}
                    </div>
                ) : (
                    <h4>No items.</h4>
                )}
            </div>
        );
    }

    renderItem(item) {
        let editClick = () => {
            this.editItemAction(item);
        };

        let deleteClick = () => {
            this.deleteItemAction(item.id);
        };

        let cancelClick = () => {
            this.editItemAction(null);
        };

        let saveClick = () => {
            this.saveItemAction();
        };

        let isEditMode = this.state.itemToEdit && this.state.itemToEdit.id === item.id;

        return (
            <div key={item.id}>
                {isEditMode ? (
                    <div>
                        <input type="text" name="newItem" className="form-control item-name-input" placeholder="Enter item name"
                               value={this.state.itemToEdit.name} onChange={this.updateItemState} />

                        <button className="link item-btn" onClick={saveClick}>Save</button>

                        <button className="link item-btn" onClick={cancelClick}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        <span className="item-name">{item.name}</span>

                        <button className="link item-btn" onClick={editClick}>Edit</button>

                        <button className="link item-btn" onClick={deleteClick}>Delete</button>
                    </div>
                )}
            </div>
        );
    }
}

export default ListComponent;

