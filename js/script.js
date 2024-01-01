
/*----menu button----*/
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}
/*-------------slideshow------*/

    document.addEventListener("DOMContentLoaded", function () {
        const slideshow = document.querySelector(".slideshow");
        const images = slideshow.querySelectorAll("img");
        let currentIndex = 0;

        function fadeIn(element) {
            element.style.opacity = 0;

            let opacity = 0;
            const interval = setInterval(function () {
                if (opacity < 1) {
                    opacity += 0.1;
                    element.style.opacity = opacity;
                } else {
                    clearInterval(interval);
                    element.style.display = "block"; // Set display property after the animation
                }
            }, 100);
        }

        function fadeOut(element) {
            let opacity = 1;
            const interval = setInterval(function () {
                if (opacity > 0) {
                    opacity -= 0.1;
                    element.style.opacity = opacity;
                } else {
                    element.style.display = "none";
                    clearInterval(interval);
                }
            }, 100);
        }

        function showImage(index) {
            const currentImage = images[currentIndex];
            const nextImage = images[index];

            fadeOut(currentImage);
            fadeIn(nextImage);

            currentIndex = index;
        }

        function nextImage() {
            const nextIndex = (currentIndex + 1) % images.length;
            showImage(nextIndex);
        }

        // Initial display
        fadeIn(images[currentIndex]);

        // Set interval for automatic slideshow (change image every 3 seconds)
        setInterval(nextImage, 3000);
    });



    /*-----------------order--------------------*/
     // Cart logic

     let isCartOpen = false;

function toggleCart() {
    const cartSection = document.getElementById('cart');
    isCartOpen = !isCartOpen;

    if (isCartOpen) {
        cartSection.style.display = 'block';
        updateCart();

        document.addEventListener('click', closeCartOnClickOutside);
    } else {
        cartSection.style.display = 'none';

        document.removeEventListener('click', closeCartOnClickOutside);
    }
}

// Function to close the cart if clicked outside
function closeCartOnClickOutside(event) {
    const cartSection = document.getElementById('cart');
    const cartIcon = document.getElementById('cart-icon');

    if (!cartSection.contains(event.target) && !cartIcon.contains(event.target)) {
        isCartOpen = false;
        cartSection.style.display = 'none';
        document.removeEventListener('click', closeCartOnClickOutside);
    }
}
     
const cartItems = [];

function addToCart(productName, price) {
    cartItems.push({ productName, price });
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    let total = 0;

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.productName} - $${item.price.toFixed(2)}`;
        cartList.appendChild(listItem);
        total += item.price;
    });

    const cartTotalElement = document.getElementById('cart-total');
    cartTotalElement.textContent = `$${total.toFixed(2)}`;

    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartItems.length.toString();
}

function placeOrder() {
    const orderSummary = cartItems.map(item => `${item.productName} - $${item.price.toFixed(2)}`).join('\n');
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    const orderPopup = `
        Order Summary:
        ${orderSummary}
        
        Total: $${total.toFixed(2)}
        
        Thank you for your order!
    `;

    alert(orderPopup);

    // Reset the cart after placing the order
    cartItems.length = 0;
    updateCart();
}

/*------------review--------------*/
// Load existing reviews from local storage
document.addEventListener('DOMContentLoaded', function () {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const boxContainer = document.querySelector('.review-box-container'); // Change the selector

    storedReviews.forEach(review => {
        const newReview = createReviewElement(review);
        boxContainer.appendChild(newReview);
    });
});


function addReview() {
    // Get values from the form
    const name = document.getElementById('name').value;
    const reviewText = document.getElementById('reviewText').value;
    const rating = document.getElementById('rating').value;
    

    // Create a new review object
    const newReviewObject = {
        name: name,
        reviewText: reviewText,
        rating: rating
    };

    // Create a new review box
    const newReview = createReviewElement(newReviewObject);

    // Add the new review box to the review section
    document.querySelector('.review-box-container').appendChild(newReview);

    // Save the new review to local storage
    saveReviewToLocalStorage(newReviewObject);

    // Clear the form fields
    document.getElementById('name').value = '';
    document.getElementById('reviewText').value = '';
    document.getElementById('rating').value = '5';
}

function createReviewElement(review) {
    const newReview = document.createElement('div');
    newReview.className = 'review-box';

    newReview.innerHTML = `
        
        <p>${review.reviewText}</p>
        <img src="images/pic-1.png" class="user" alt="">
        <h3>${review.name}</h3>
        <div class="stars">
            ${Array.from({ length: Math.floor(review.rating) }, () => '<i class="fas fa-star"></i>').join('')}
            ${review.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
        </div>
    `;

    return newReview;
}

function saveReviewToLocalStorage(review) {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    storedReviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(storedReviews));
}
