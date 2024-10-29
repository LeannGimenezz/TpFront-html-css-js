import { handleGetProductLocalStorage, handleSaveInLocalStorage, getProductsFromLocalStorage } from "../persistence/localStorage.js";

export const handleGetProductsToStore = (searchTerm = '') => {
    const products = getProductsFromLocalStorage(searchTerm);
    if (!Array.isArray(products)) {
        products = [];
    }
    handleRenderList(products);
};

export const handleRenderList = (products) => {
    const appContainer = document.getElementById('storeContainer');
    appContainer.innerHTML = '';

    const renderProductGroup = (products, title) => {
        if (products.length > 0) {
            const productosHTML = products.map((product, index) => {
                return `<div class='containerTargetItem pointer' id="product-${product.id}" data-id="${product.id}">
                            <div>
                                <img src='${product.img}' alt="${product.nombre}">
                                <div>
                                    <h1>${product.nombre}</h1>
                                </div>
                                <div class='targetProps'>
                                    <p>Precio: $${product.precio}</p>
                                </div>
                            </div>
                        </div>`;
            });
            return `
            <section class='sectionStore'>
                <div class='containerTitleSection'>
                    <h2>${title}</h2>
                </div>
                <div class='containerProductStore'>
                    ${productosHTML.join('')}
                </div>
            </section>`;
        } else {
            return "";
        }
    };

    appContainer.innerHTML += `
        ${renderProductGroup(products.filter(product => product.categoria.toLowerCase() === "hamburguesas"), "Hamburguesas")}
        ${renderProductGroup(products.filter(product => product.categoria.toLowerCase() === "papas"), "Papas")}
        ${renderProductGroup(products.filter(product => product.categoria.toLowerCase() === "gaseosas"), "Gaseosas")}
    `;

    // Eventos para cada producto
    products.forEach(product => {
        const productElement = document.getElementById(`product-${product.id}`);
        if (productElement) {
            productElement.addEventListener('click', () => openEditModal(product));
        }
    });
};

const openEditModal = (product) => {
    const modal = document.getElementById('modalPopUp');
    modal.style.display = 'flex';

    // Cargar los datos del producto en el modal
    document.getElementById('nombre').value = product.nombre;
    document.getElementById('nombre').dataset.id = product.id; // Guardar el ID del producto en el campo de nombre
    document.getElementById('img').value = product.img;
    document.getElementById('precio').value = product.precio;
    document.getElementById('categoria').value = product.categoria;

    // Configurar el botón de eliminación
    const deleteButton = document.getElementById('deleteButton');
    deleteButton.onclick = () => {
        handleDeleteProduct(product.id);
        modal.style.display = 'none';
        handleGetProductsToStore();
    };

    // Configurar el botón de actualización
    const acceptButton = document.getElementById('acceptButton');
    acceptButton.onclick = () => {
        const updatedProduct = {
            id: product.id, // Usar el ID existente para actualizar
            nombre: document.getElementById('nombre').value,
            img: document.getElementById('img').value,
            precio: document.getElementById('precio').value,
            categoria: document.getElementById('categoria').value,
        };
        handleSaveInLocalStorage(updatedProduct);
        modal.style.display = 'none';
        handleGetProductsToStore();
    };
};

const handleDeleteProduct = (id) => {
    const products = handleGetProductLocalStorage();
    const updatedProducts = products.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
};
