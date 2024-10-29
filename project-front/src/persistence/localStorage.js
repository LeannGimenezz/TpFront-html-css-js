export const handleGetProductLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem('products'));
    return products || [];
};

export const handleSaveInLocalStorage = (product) => {
    let productsInLocalStorage = handleGetProductLocalStorage();
    const existingIndex = productsInLocalStorage.findIndex(p => p.id === product.id);

    if (existingIndex !== -1) {
        // Actualizar producto existente
        productsInLocalStorage[existingIndex] = product;
    } else {
        // Agregar nuevo producto
        productsInLocalStorage.push(product);
    }

    localStorage.setItem('products', JSON.stringify(productsInLocalStorage));
};

export const handleDeleteProductFromLocalStorage = (productId) => {
    let productsInLocalStorage = handleGetProductLocalStorage();
    productsInLocalStorage = productsInLocalStorage.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(productsInLocalStorage));
};

export const getProductsFromLocalStorage = (searchTerm = '') => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    if (typeof searchTerm === 'string' && searchTerm.trim() !== '') {
        products = products.filter(product => product.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return products;
};
