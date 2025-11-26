
const btnMenu = document.querySelector('.fa-bars');
const menu = document.querySelector('.menu');

btnMenu.addEventListener('click', () => {
    menu.classList.toggle('menu-show');
});



const cartNumber = document.querySelector('.content-shopping-cart .number');
const addCartButtons = document.querySelectorAll('.add-cart');

let cartItems = [];

const updateCartCount = () => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartNumber.textContent = `(${totalItems})`;
};

addCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
       
        const productElement = e.target.closest('.card-product') || e.target.closest('.container-products');
        
        let productName = 'Producto de Café';
        let productPrice = 10.00; 

        if (productElement) {
            
            const nameElement = productElement.querySelector('h3');
            const priceElement = productElement.querySelector('.price');
            
            if (nameElement) {
                productName = nameElement.textContent.trim();
            }
            if (priceElement) {
            
                const priceText = priceElement.textContent.replace('$', '').replace('.', ',');
                productPrice = parseFloat(priceText) || 10.00;
            }
        }
        
        const existingItem = cartItems.find(item => item.name === productName);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }
        
        updateCartCount();
        alert(`"${productName}" añadido al carrito.`);
    });
});


if (menu) {
    menu.style.transition = 'all .3s ease';


}



const commentForm = document.getElementById('comment-submission-form');
const commentList = document.getElementById('comment-list');
const totalCommentsHeader = document.getElementById('comment-count'); 

if (commentForm && commentList && totalCommentsHeader) {
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault(); // 🛑 

        const nameInput = document.getElementById('comment-name');
        const textInput = document.getElementById('comment-text');

        const name = nameInput.value.trim();
        const text = textInput.value.trim();
        
        if (name === '' || text === '') {
            alert('Por favor, completa tu nombre y tu comentario.');
            return;
        }

        const newComment = document.createElement('div');
        newComment.classList.add('comment-item');
        
        const timeString = 'Hace unos segundos'; 

        newComment.innerHTML = `
            <i class="fa-solid fa-user"></i>
            <div class="comment-content">
                <h4>${name}</h4>
                <span>${timeString}</span>
                <p>${text}</p>
            </div>
        `;

        commentList.prepend(newComment); 
        commentForm.reset();

        const currentCount = commentList.children.length;
        totalCommentsHeader.textContent = `Experiencias y Comentarios (${currentCount})`;

        alert('¡Tu comentario ha sido añadido!');
    });
}



document.addEventListener('DOMContentLoaded', () => {
    
    const ratingBoxes = document.querySelectorAll('.rating-box');
    
    if (ratingBoxes.length > 0) {
        
        const renderStars = (rating) => {
            let html = '';
            for (let i = 1; i <= 5; i++) {
                if (rating >= i) {
                    html += '<i class="fa-solid fa-star"></i>'; 
                } else if (rating > i - 1) {
                    html += '<i class="fa-solid fa-star-half-stroke"></i>'; 
                } else {
                    html += '<i class="fa-regular fa-star"></i>'; 
                }
            }
            return html;
        };
        
        ratingBoxes.forEach(box => {
            const starsContainer = box.querySelector('.rating-stars');
            const textElement = box.querySelector('.rating-text');
            
            starsContainer.addEventListener('click', (e) => {
                let rect = starsContainer.getBoundingClientRect();
                
                let clickX = e.clientX - rect.left;
                let rating = Math.ceil((clickX / rect.width) * 10) / 2; 

                if (rating > 5) rating = 5;
                if (rating < 0.5) rating = 0.5;

                starsContainer.innerHTML = renderStars(rating);
                
                const oldText = textElement.textContent;
                const match = oldText.match(/\((\d+)\s*votos\)/); 
                
                let newVotes = match ? parseInt(match[1]) + 1 : 1;
                
                textElement.textContent = `Calificación: ${rating.toFixed(1)}/5 (${newVotes} votos). ¡Haz click para calificar!`;

                alert(`¡Gracias por calificar! Calificaste ${rating.toFixed(1)} estrellas.`);
            });
        });
    }
});



const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form input[type="search"]');

if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            
            const encodedTerm = encodeURIComponent(searchTerm);
            
            
            window.location.href = `search-results.html?q=${encodedTerm}`;
        } else {
            alert('Por favor, ingresa un término de búsqueda.');
        }
    });
}


const userIcon = document.querySelector('.container-user .fa-user');
const userModal = document.getElementById('user-modal');
const closeUserModalButton = document.querySelector('.close-user-modal');
const loginForm = document.getElementById('login-form');

if (userIcon && userModal && closeUserModalButton && loginForm) {
    
    userIcon.style.cursor = 'pointer'; 
    userIcon.addEventListener('click', () => {
        userModal.style.display = 'block';
    });

   
    closeUserModalButton.addEventListener('click', () => {
        userModal.style.display = 'none';
    });

    
    window.addEventListener('click', (event) => {
       
        const cartModal = document.getElementById('cart-modal');
        if (event.target === userModal && event.target !== cartModal) {
            userModal.style.display = 'none';
        }
    });

    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const username = document.getElementById('username').value;
        
        
        alert(`Inicio de sesión simulado para: ${username}. ¡Bienvenido de vuelta!`);
        
        
        userModal.style.display = 'none';
        loginForm.reset(); 
    });
}