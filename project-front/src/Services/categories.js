import { getProductsFromLocalStorage } from '../persistence/localStorage';
import { handleRenderList } from '../views/store';

export const renderCategories = () => {
    const ulList = document.getElementById('listFilter');
    ulList.innerHTML = `
    <li id="Todo">Todos los productos</li>
    <li id="Hamburguesas">Hamburguesas</li>
    <li id="Papas">Papas</li>
    <li id="Gaseosas">Gaseosas</li>
    <li id="MayorPrecio">Mayor precio</li>
    <li id="MenorPrecio">Menor precio</li>
    `;
    
    const liElements = document.querySelectorAll('#listFilter li');
    liElements.forEach(li => {
        li.style.cursor = 'pointer'; // Agregar cursor pointer
        li.addEventListener('click', () => {
            handleClick(li);
        });
    });

    const handleClick = (li) => {
        liElements.forEach((item) => {
            item.classList.remove('liActive');
        });
        li.classList.add('liActive');
        const category = li.innerText;
        filterProductsByCategory(category);
    };
};

export const filterProductsByCategory = (category) => {
    const products = getProductsFromLocalStorage();
    let filteredProducts = products;

    if (category === 'Mayor precio') {
        filteredProducts.sort((a, b) => b.precio - a.precio);
    } else if (category === 'Menor precio') {
        filteredProducts.sort((a, b) => a.precio - b.precio);
    } else if (category !== 'Todos los productos') {
        filteredProducts = products.filter(product => product.categoria.toLowerCase() === category.toLowerCase());
    }

    handleRenderList(filteredProducts);
};

export default renderCategories;
