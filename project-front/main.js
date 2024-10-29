import { renderCategories, filterProductsByCategory } from './src/Services/categories';
import { handleSaveInLocalStorage, handleDeleteProductFromLocalStorage, getProductsFromLocalStorage } from './src/persistence/localStorage';
import { handleGetProductsToStore } from './src/views/store';
import "./style.css";

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente cargado y analizado");
    renderCategories();
    handleGetProductsToStore();
    
    const buttonAdd = document.getElementById('buttonAddElement');
    if(buttonAdd) {
        buttonAdd.addEventListener('click', () => {
            openModal();
        });
    }
    
    const buttonCancel = document.getElementById('cancelButton');
    if(buttonCancel) {
        buttonCancel.addEventListener('click', () => {
            closeModal();
        });
    }

    const openModal = () => {
        const modal = document.getElementById('modalPopUp');
        modal.style.display = 'flex';
        clearModalFields();
    };

    const closeModal = () => {
        const modal = document.getElementById('modalPopUp');
        modal.style.display = 'none';
    };

    const clearModalFields = () => {
        document.getElementById('nombre').value = '';
        document.getElementById('img').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('categoria').value = 'Seleccione una categoria';
    };

    const acceptButton = document.getElementById('acceptButton');
    if(acceptButton) {
        acceptButton.addEventListener('click', () => {
            handleSaveOrModifyElements();
        });
    }

    const handleSaveOrModifyElements = () => {
        const nombre = document.getElementById('nombre').value,
              img = document.getElementById('img').value,
              precio = document.getElementById('precio').value,
              categoria = document.getElementById('categoria').value,
              id = document.getElementById('nombre').dataset.id || new Date().toISOString(); // Usar ID existente o generar uno nuevo
        
        let object = {
            id,
            nombre,
            img,
            precio,
            categoria
        };

        handleSaveInLocalStorage(object);
        closeModal();
        handleGetProductsToStore(); // Actualiza la lista de productos
    };

    // Barra de búsqueda
    const searchButton = document.querySelector('.buttonSearch');
    const searchInput = document.querySelector('.inputHeader');
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.toLowerCase();
            handleGetProductsToStore(searchTerm);
        });
    }

    // Filtrar por categorías
    const categoryFilter = document.getElementById('listFilter');
    categoryFilter.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const category = e.target.innerText;
            filterProductsByCategory(category);
        }
    });

    // Manejo de eliminación
    const deleteButton = document.getElementById('deleteButton');
    if(deleteButton) {
        deleteButton.addEventListener('click', () => {
            const productId = document.getElementById('nombre').dataset.id;
            if (productId) {
                handleDeleteProductFromLocalStorage(productId);
                closeModal();
                handleGetProductsToStore();
            }
        });
    }
});
