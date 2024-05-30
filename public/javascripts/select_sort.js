document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const logoGrid = document.getElementById('logo-grid');
    let logoItems = Array.from(document.querySelectorAll('.logo-item'));

    // 오름차순 정렬
    const sortLogos = () => {
        logoItems.sort((a, b) => {
            const nameA = a.querySelector('p').textContent.trim();
            const nameB = b.querySelector('p').textContent.trim();
            return nameA.localeCompare(nameB);
        });

        logoItems.forEach(item => logoGrid.appendChild(item));
    };

    sortLogos(); // 처음 로드할 때 정렬

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        logoItems.forEach(item => {
            const logoName = item.querySelector('p').textContent.toLowerCase();
            if (logoName.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Category filter functionality
    const categoryList = document.querySelectorAll('.category-list li');
    categoryList.forEach(category => {
        category.addEventListener('click', () => {
            const selectedCategory = category.textContent.toLowerCase();
            logoItems.forEach(item => {
                const logoCategory = item.dataset.category.toLowerCase();
                if (selectedCategory === 'all' || logoCategory.includes(selectedCategory)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});