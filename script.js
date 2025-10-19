// Simple cart functionality
let cart = [];

// Add to cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;

            // Add to cart array
            cart.push({
                name: productName,
                price: productPrice
            });

            // Update cart count
            updateCartCount();

            // Simple feedback
            this.textContent = 'Added!';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
            }, 1000);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

function performSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        return;
    }

    const productCards = document.querySelectorAll('.product-card');
    let hasResults = false;

    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const section = card.closest('.category-section');

        if (productName.includes(searchTerm)) {
            card.style.display = 'flex';
            section.style.display = 'block';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    // Hide sections with no visible products
    const sections = document.querySelectorAll('.category-section');
    sections.forEach(section => {
        const visibleCards = section.querySelectorAll('.product-card[style="display: flex;"]');
        if (visibleCards.length === 0) {
            section.style.display = 'none';
        }
    });

    if (!hasResults) {
        alert('No products found matching "' + searchTerm + '"');
        resetSearch();
    }
}

function resetSearch() {
    const productCards = document.querySelectorAll('.product-card');
    const sections = document.querySelectorAll('.category-section');

    productCards.forEach(card => {
        card.style.display = 'flex';
    });

    sections.forEach(section => {
        section.style.display = 'block';
    });
}

function updateCartCount() {
    console.log('Cart items:', cart.length);
    console.log('Cart contents:', cart);
}

// Clear search when clicking outside search area
document.addEventListener('click', function(e) {
    const searchBar = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-bar input');

    if (searchInput && searchInput.value !== '' && !searchBar.contains(e.target)) {
        // Optional: clear search when clicking outside
        // resetSearch();
        // searchInput.value = '';
    }
});
