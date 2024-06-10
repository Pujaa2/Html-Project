document.addEventListener('DOMContentLoaded', function() {
    loadCardsFromStorage();
    document.getElementById('card-form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        const imageUrl = document.getElementById('image-url').value;
    
        if (!name || !message || !imageUrl) {
            alert('Please fill in all fields!');
            return;
        }
    
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card');

        const cardContent = `
            <h3>${name}</h3>
            <p>${message}</p>
            <img src="${imageUrl}" alt="Card Image">
            <button class="delete-btn">Delete🚫</button>
            <button class="feature-btn">Feature</button>
        `;
        cardContainer.innerHTML = cardContent;
    
        document.getElementById('board').appendChild(cardContainer);
    
        cardContainer.querySelector('.delete-btn').addEventListener('click', function() {
            cardContainer.remove();
            saveCardsToStorage();
        });
    
        cardContainer.querySelector('.feature-btn').addEventListener('click', function() {
            cardContainer.classList.toggle('featured');
            cardContainer.classList.toggle('highlight');
        });

        saveCardsToStorage();
        document.getElementById('card-form').reset();
    });

    function loadCardsFromStorage() {
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards.forEach(card => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card');
            cardContainer.innerHTML = card.html;
            document.getElementById('board').appendChild(cardContainer);
            cardContainer.querySelector('.delete-btn').addEventListener('click', function() {
                cardContainer.remove();
                saveCardsToStorage();
            });
            cardContainer.querySelector('.feature-btn').addEventListener('click', function() {
                cardContainer.classList.toggle('featured');
                cardContainer.classList.toggle('highlight');
            });
        });
    }

    function saveCardsToStorage() {
        const cards = [];
        document.querySelectorAll('.card').forEach(card => {
            const html = card.innerHTML;
            cards.push({ html });
        });
        localStorage.setItem('cards', JSON.stringify(cards));
    }
});
