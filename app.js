
        // State
        let isUserLoggedIn = false;
        let cart = [];
        let wishlist = [];
        let appliedDiscount = 0; 

        // Product Data
        const products = [
            {id: 1, name: 'Crystal Wine Glasses', category: 'crockery', price: 1099, image: 'wine_glasses.png', desc: 'Set of 6 elegant crystal wine glasses, perfect for sophisticated gatherings.', rating: 4.8},
            {id: 2, name: 'Professional Cocktail Shaker', category: 'crockery', price: 899, image: 'cocktail_shaker.png', desc: 'Stainless steel shaker with built-in strainer for professional-grade mixing.', rating: 4.7},
            {id: 3, name: 'Luxury Party Plates', category: 'crockery', price: 1599, image: 'party_plates.png', desc: 'Premium plates with gold rim (8 pieces).', rating: 4.5},
            {id: 4, name: 'Champagne Flutes', category: 'crockery', price: 1099, image: 'champagne_flutes.png', desc: 'Set of 6 tall elegant flutes for celebratory toasts.', rating: 4.9},
            {id: 5, name: 'Shot Glass Set', category: 'crockery', price: 449, image: 'shot_glasses.png', desc: 'Set of 12 heavy base premium shot glasses.', rating: 4.6},
            {id: 6, name: 'Steel Ice Bucket', category: 'crockery', price: 1099, image: 'ice_bucket.png', desc: 'Double-wall insulated bucket with matching tongs.', rating: 4.8},
            {id: 7, name: 'Mojito Mixer', category: 'mixers', price: 149, image: 'mojito_mixer.png', desc: 'Fresh mint & lime concentrate. Just add rum and soda.', rating: 4.5},
            {id: 8, name: 'Cranberry Mix', category: 'mixers', price: 199, image: 'cranberry_mix.png', desc: 'Premium cranberry mixer, essential for Cosmopolitans.', rating: 4.4},
            {id: 9, name: 'Tropical Punch', category: 'mixers', price: 229, image: 'tropical_punch.png', desc: 'Exotic pineapple and mango blend for a taste of paradise.', rating: 4.7},
            {id: 10, name: 'Spicy Ginger Beer', category: 'mixers', price: 149, image: 'ginger_beer.png', desc: 'The key ingredient for a perfect Moscow Mule.', rating: 4.8},
            {id: 11, name: 'Margarita Mix', category: 'mixers', price: 179, image: 'margarita_mix.png', desc: 'Authentic lime margarita base with a balance of sweet and sour.', rating: 4.6},
            {id: 12, name: 'Premium Tonic Water', category: 'mixers', price: 399, image: 'tonic_water.png', desc: '6-pack of artisanal tonic for the ultimate Gin & Tonic.', rating: 4.9},
            {id: 13, name: 'Cherry Bombs', category: 'candies', price: 249, image: 'cherry_bombs.png', desc: 'Edible cherry-flavored cocktail garnishes that dissolve slowly.', rating: 4.7},
            {id: 14, name: 'Citrus Zest Drops', category: 'candies', price: 179, image: 'citrus_drops.png', desc: 'Dehydrated lemon wheels to enhance aroma and presentation.', rating: 4.5},
            {id: 15, name: 'Berry Burst Pearls', category: 'candies', price: 229, image: 'berry_pearls.png', desc: 'Popping boba pearls with mixed berry flavor.', rating: 4.8},
            {id: 16, name: 'Mint Crystals', category: 'candies', price: 189, image: 'mint_crystals.png', desc: 'Refreshing mint-flavored sugar crystals for rimming glasses.', rating: 4.6},
            {id: 17, name: '24k Gold Flakes', category: 'candies', price: 1049, image: 'gold_flakes.png', desc: 'Edible gold flakes for a touch of pure luxury.', rating: 5.0},
            {id: 18, name: 'Gummy Bear Mix', category: 'candies', price: 249, image: 'gummy_bears.png', desc: 'Colorful gummy bears, a fun garnish for sweet cocktails.', rating: 4.4}
        ];

        // Icons
        const HEART_OUTLINE = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#d4af37]"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>`;
        const HEART_SOLID = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-600"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" /></svg>`;

        // --- Init ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
        }, { threshold: 0.1 });

        window.onload = function() {
            renderProducts('all');
            document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
            animateStats();
        };

        function showToast(message) {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = `<i class="fa-solid fa-check-circle text-green-400"></i> <span class="font-bold">${message}</span>`;
            container.appendChild(toast);
            setTimeout(() => toast.classList.add('show'), 100);
            setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3000);
        }

        // --- Product Logic ---
        function renderProducts(filter) {
            const grid = document.getElementById('product-grid');
            grid.innerHTML = '';
            
            document.querySelectorAll('.category-btn').forEach(btn => {
                if(filter === 'all' && btn.textContent === 'All') {
                    btn.classList.add('bg-[#1a0505]', 'text-[#d4af37]');
                    btn.classList.remove('text-[#1a0505]');
                } else if (btn.textContent.toLowerCase().includes(filter) && filter !== 'all') {
                    btn.classList.add('bg-[#1a0505]', 'text-[#d4af37]');
                    btn.classList.remove('text-[#1a0505]');
                } else {
                    btn.classList.remove('bg-[#1a0505]', 'text-[#d4af37]');
                    btn.classList.add('text-[#1a0505]');
                }
            });

            const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

            filtered.forEach((p, index) => {
                const isWishlisted = wishlist.includes(p.id);
                const heartIcon = isWishlisted ? HEART_SOLID : HEART_OUTLINE;
                const stars = getStarsHTML(p.rating);

                const div = document.createElement('div');
                div.className = 'product-card rounded-xl overflow-hidden fade-in-up cursor-pointer group relative';
                div.style.transitionDelay = `${index * 50}ms`;
                div.onclick = (e) => {
                    if(!e.target.closest('.add-btn') && !e.target.closest('.wishlist-btn')) openProductPage(p.id);
                };
                div.innerHTML = `
                    <div class="relative h-64 overflow-hidden bg-gray-50">
                        <img src="${p.image}" class="w-full h-full object-cover">
                        ${p.category === 'mixers' ? '<span class="absolute top-2 left-2 bg-[#d4af37] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">Best Seller</span>' : ''}
                        
                        <button onclick="toggleWishlist(${p.id})" class="wishlist-btn absolute top-3 right-3 h-8 w-8 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition z-20 heart-container-${p.id}">
                            ${heartIcon}
                        </button>

                        <button onclick="addToCart(${p.id})" class="add-btn absolute bottom-3 right-3 h-10 w-10 bg-[#1a0505] text-[#d4af37] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition z-20">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <div class="p-5">
                        <div class="flex justify-between items-start mb-1">
                            <span class="text-xs text-gray-400 uppercase tracking-widest font-bold">${p.category}</span>
                            <div class="flex text-xs text-[#d4af37]">${stars}</div>
                        </div>
                        <h3 class="font-bold text-lg text-[#1a0505] mt-1 mb-2 leading-tight">${p.name}</h3>
                        <div class="flex justify-between items-center">
                            <span class="text-lg font-bold text-[#1a0505]">₹${p.price}</span>
                            <span class="text-xs text-[#d4af37] font-bold uppercase tracking-wider group-hover:underline">View</span>
                        </div>
                    </div>
                `;
                grid.appendChild(div);
                observer.observe(div);
            });
        }

        function getStarsHTML(rating) {
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(rating)) {
                    starsHTML += '<i class="fa-solid fa-star"></i>';
                } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                    starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
                } else {
                    starsHTML += '<i class="fa-regular fa-star"></i>';
                }
            }
            return starsHTML;
        }

        function filterProducts(cat) { renderProducts(cat); }

        function openProductPage(id) {
            const p = products.find(x => x.id === id);
            const isWishlisted = wishlist.includes(p.id);
            
            document.getElementById('detail-image').src = p.image;
            document.getElementById('detail-category').innerText = p.category;
            document.getElementById('detail-name').innerText = p.name;
            document.getElementById('detail-price').innerText = p.price;
            document.getElementById('detail-desc').innerText = p.desc;
            document.getElementById('detail-stars').innerHTML = getStarsHTML(p.rating);
            
            // Reset Pincode field
            document.getElementById('pincode-input').value = '';
            document.getElementById('delivery-result').innerText = '';
            document.getElementById('delivery-result').classList.add('hidden');

            document.getElementById('detail-add-btn').onclick = () => addToCart(p.id);
            
            const wishBtn = document.getElementById('detail-wishlist-btn');
            wishBtn.onclick = () => toggleWishlist(p.id);
            wishBtn.innerHTML = isWishlisted ? HEART_SOLID : HEART_OUTLINE;

            // Recommendations
            const relContainer = document.getElementById('related-products-grid');
            relContainer.innerHTML = '';
            let related = products.filter(x => x.category === p.category && x.id !== p.id);
            if (related.length < 5) related = related.concat(products.filter(x => x.category !== p.category).slice(0, 5));
            
            related.slice(0, 10).forEach(rel => {
                const rDiv = document.createElement('div');
                rDiv.className = 'cursor-pointer group min-w-[220px] snap-center'; 
                rDiv.onclick = () => openProductPage(rel.id);
                rDiv.innerHTML = `
                    <div class="h-48 bg-white border border-gray-100 rounded-xl overflow-hidden mb-3 shadow-sm hover:shadow-md transition">
                        <img src="${rel.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                    </div>
                    <h4 class="font-bold text-sm truncate text-[#1a0505] group-hover:text-[#d4af37] transition">${rel.name}</h4>
                    <span class="text-xs text-gray-500 font-bold">₹${rel.price}</span>
                `;
                relContainer.appendChild(rDiv);
            });

            const view = document.getElementById('product-detail-view');
            view.classList.remove('hidden'); 
            requestAnimationFrame(() => view.classList.add('active'));
            document.getElementById('product-detail-view').scrollTo({ top: 0, behavior: 'smooth' });
        }

        function closeProductPage() {
            const view = document.getElementById('product-detail-view');
            view.classList.remove('active');
            setTimeout(() => view.classList.add('hidden'), 400);
        }

        // --- Pincode Checker ---
        function checkDelivery() {
            const pincode = document.getElementById('pincode-input').value;
            const result = document.getElementById('delivery-result');
            
            if (pincode.length === 6 && !isNaN(pincode)) {
                const deliveryDate = new Date();
                deliveryDate.setDate(deliveryDate.getDate() + 3); 
                const dateString = deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
                
                result.innerHTML = `<i class="fa-solid fa-truck text-[#d4af37]"></i> Estimated Delivery: <span class="text-[#1a0505]">${dateString}</span>`;
                result.classList.remove('hidden', 'text-red-600');
                result.classList.add('text-green-700');
            } else {
                result.innerText = "Please enter a valid 6-digit pincode.";
                result.classList.remove('hidden', 'text-green-700');
                result.classList.add('text-red-600');
            }
        }

        // --- Stats Animation ---
        function animateStats() {
            let count = 0;
            const target = 15347;
            const duration = 2000; 
            const increment = target / (duration / 18); 
            
            const el = document.getElementById('stats-orders');
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    el.innerText = "15,347+";
                    clearInterval(timer);
                } else {
                    el.innerText = Math.floor(count).toLocaleString() + "+";
                }
            }, 16);
        }

        // --- Wishlist Functions ---
        function toggleWishlist(id) {
            const index = wishlist.indexOf(id);
            if (index > -1) {
                wishlist.splice(index, 1);
                showToast("Removed from Wishlist");
            } else {
                wishlist.push(id);
                showToast("Added to Wishlist");
            }
            updateWishlistUI(id);
        }

        function updateWishlistUI(id) {
            const isWishlisted = wishlist.includes(id);
            const iconHTML = isWishlisted ? HEART_SOLID : HEART_OUTLINE;
            document.querySelectorAll(`.heart-container-${id}`).forEach(btn => btn.innerHTML = iconHTML);

            const detailBtn = document.getElementById('detail-wishlist-btn');
            if(document.getElementById('product-detail-view').classList.contains('active')) {
                detailBtn.innerHTML = iconHTML; 
            }

            const count = wishlist.length;
            const badge = document.getElementById('wishlist-count');
            badge.innerText = count;
            badge.classList.toggle('hidden', count === 0);
            renderWishlistPanel();
        }

        function renderWishlistPanel() {
            const container = document.getElementById('wishlist-items');
            container.innerHTML = '';
            if (wishlist.length === 0) {
                container.innerHTML = `<div class="text-center py-20 text-gray-400"><i class="fa-regular fa-heart text-6xl mb-4 opacity-30"></i><p>Your wishlist is empty.</p></div>`;
            } else {
                wishlist.forEach(itemId => {
                    const item = products.find(p => p.id === itemId);
                    container.innerHTML += `
                        <div class="flex gap-4 items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <img src="${item.image}" class="h-16 w-16 object-cover rounded-md bg-gray-50">
                            <div class="flex-grow">
                                <h4 class="font-bold text-sm text-[#1a0505]">${item.name}</h4>
                                <div class="text-xs text-gray-500 mt-1">₹${item.price}</div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <button onclick="addToCart(${item.id}); toggleWishlist(${item.id})" class="text-xs bg-[#1a0505] text-[#d4af37] px-3 py-1 rounded">Add to Cart</button>
                                <button onclick="toggleWishlist(${item.id})" class="text-xs text-red-400 hover:text-red-600 text-right">Remove</button>
                            </div>
                        </div>
                    `;
                });
            }
        }

        function toggleWishlistPanel() {
            const panel = document.getElementById('wishlist-panel');
            const backdrop = document.getElementById('backdrop');
            document.getElementById('cart-panel').classList.remove('translate-x-0');
            document.getElementById('cart-panel').classList.add('translate-x-full');
            if(panel.classList.contains('translate-x-0')) {
                panel.classList.remove('translate-x-0');
                panel.classList.add('translate-x-full');
                backdrop.classList.add('hidden');
            } else {
                panel.classList.remove('translate-x-full');
                panel.classList.add('translate-x-0');
                backdrop.classList.remove('hidden');
                renderWishlistPanel();
            }
        }

        // --- Cart Functions ---
        function addToCart(id) {
            const p = products.find(x => x.id === id);
            const exist = cart.find(x => x.id === id);
            if(exist) exist.qty++;
            else cart.push({...p, qty:1});
            updateCartUI();
            showToast(`${p.name} added to cart`);
        }

        function updateCartUI() {
            const count = cart.reduce((a,b) => a+b.qty, 0);
            const badge = document.getElementById('cart-count');
            badge.innerText = count;
            badge.classList.toggle('hidden', count === 0);
            
            const container = document.getElementById('cart-items');
            container.innerHTML = '';
            let subtotal = 0;
            
            if(cart.length === 0) {
                container.innerHTML = `<div class="text-center py-20 text-gray-400"><i class="fa-solid fa-cart-shopping text-6xl mb-4 opacity-20"></i><p>Empty Cart</p></div>`;
            } else {
                cart.forEach(item => {
                    subtotal += item.price * item.qty;
                    container.innerHTML += `
                        <div class="flex gap-4 items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <img src="${item.image}" class="h-16 w-16 object-cover rounded-md bg-gray-50">
                            <div class="flex-grow">
                                <h4 class="font-bold text-sm text-[#1a0505]">${item.name}</h4>
                                <div class="flex items-center gap-3 mt-2">
                                    <button onclick="changeQty(${item.id}, -1)" class="w-6 h-6 bg-gray-100 rounded text-xs font-bold hover:bg-gray-200">-</button>
                                    <span class="text-sm font-bold w-4 text-center">${item.qty}</span>
                                    <button onclick="changeQty(${item.id}, 1)" class="w-6 h-6 bg-gray-100 rounded text-xs font-bold hover:bg-gray-200">+</button>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="font-bold text-sm">₹${item.price * item.qty}</div>
                                <button onclick="removeFromCart(${item.id})" class="text-xs text-red-400 hover:text-red-600 mt-1">Remove</button>
                            </div>
                        </div>
                    `;
                });
            }

            const discountAmount = subtotal * appliedDiscount;
            const finalTotal = subtotal - discountAmount;

            document.getElementById('cart-subtotal').innerText = '₹' + subtotal.toFixed(2);
            document.getElementById('cart-discount').innerText = '-₹' + discountAmount.toFixed(2);
            document.getElementById('cart-final-total').innerText = '₹' + finalTotal.toFixed(2);

            const discRow = document.getElementById('discount-row');
            if(appliedDiscount > 0 && subtotal > 0) {
                discRow.classList.remove('hidden');
                discRow.classList.add('flex');
            } else {
                discRow.classList.add('hidden');
                discRow.classList.remove('flex');
            }
        }

        function applyDiscount() {
            const input = document.getElementById('coupon-code');
            const code = input.value.trim().toUpperCase();
            if(cart.length === 0) return showToast("Cart is empty");
            if(code === "BYOB15") {
                appliedDiscount = 0.15;
                updateCartUI();
                showToast("15% Discount Applied!");
                input.disabled = true; 
            } else {
                showToast("Invalid Coupon Code");
            }
        }

        function changeQty(id, delta) {
            const item = cart.find(x => x.id === id);
            if(item) {
                item.qty += delta;
                if(item.qty <= 0) removeFromCart(id);
                else updateCartUI();
            }
        }

        function removeFromCart(id) {
            cart = cart.filter(x => x.id !== id);
            updateCartUI();
        }

        function toggleCart() {
            const panel = document.getElementById('cart-panel');
            const backdrop = document.getElementById('backdrop');
            
            document.getElementById('wishlist-panel').classList.remove('translate-x-0');
            document.getElementById('wishlist-panel').classList.add('translate-x-full');

            if(panel.classList.contains('translate-x-0')) {
                panel.classList.remove('translate-x-0');
                panel.classList.add('translate-x-full');
                backdrop.classList.add('hidden');
            } else {
                panel.classList.remove('translate-x-full');
                panel.classList.add('translate-x-0');
                backdrop.classList.remove('hidden');
            }
        }

        function closeAllOverlays() {
            document.getElementById('cart-panel').classList.add('translate-x-full');
            document.getElementById('cart-panel').classList.remove('translate-x-0');
            document.getElementById('wishlist-panel').classList.add('translate-x-full');
            document.getElementById('wishlist-panel').classList.remove('translate-x-0');
            document.getElementById('backdrop').classList.add('hidden');
            document.getElementById('payment-modal').classList.add('hidden');
            document.getElementById('auth-modal').classList.add('hidden');
        }

        function initiateCheckout() {
            if(cart.length === 0) return showToast("Your cart is empty!");
            toggleCart();
            document.getElementById('payment-modal').classList.remove('hidden');
            document.getElementById('backdrop').classList.remove('hidden');
            document.getElementById('payment-processing').classList.remove('hidden');
            document.getElementById('payment-success').classList.add('hidden');
            
            setTimeout(() => {
                document.getElementById('payment-processing').classList.add('hidden');
                document.getElementById('payment-success').classList.remove('hidden');
                cart = [];
                appliedDiscount = 0;
                document.getElementById('coupon-code').disabled = false;
                document.getElementById('coupon-code').value = '';
                updateCartUI();
            }, 2500);
        }

        function closePayment() { closeAllOverlays(); }

        function handleStartParty() {
            document.getElementById('auth-modal').classList.remove('hidden');
            document.getElementById('backdrop').classList.remove('hidden');
        }
        function closeAuthModal() { closeAllOverlays(); }
        function registerUser(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.innerText = "Creating...";
            setTimeout(() => {
                document.getElementById('auth-form-container').classList.add('hidden');
                document.getElementById('auth-success-container').classList.remove('hidden');
                showToast("Welcome to the club!");
            }, 1500);
        }

        // --- Chatbot Logic ---
        function toggleChat() {
            const popup = document.getElementById('chat-popup');
            if (popup.style.display === 'flex') {
                popup.style.display = 'none';
            } else {
                popup.style.display = 'flex';
                document.getElementById('chat-input').focus();
            }
        }

        function handleChatKey(e) {
            if (e.key === 'Enter') sendMessage();
        }

        function sendMessage() {
            const input = document.getElementById('chat-input');
            const message = input.value.trim();
            if (!message) return;

            addMessage(message, 'user-message');
            input.value = '';

            setTimeout(() => {
                const responses = [
                    "That sounds like a great choice!",
                    "We offer free shipping on orders over ₹1000.",
                    "Check out our Mixers section for some zest!",
                    "Our crystal glasses are top-tier.",
                    "Need help with a bulk order? Contact us via email.",
                    "Try combining our Spicy Ginger Beer with some lime!",
                    "Yes, we deliver pan-India!"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'bot-message');
            }, 1000);
        }

        function addMessage(text, className) {
            const container = document.getElementById('chat-messages');
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${className}`;
            msgDiv.innerText = text;
            container.appendChild(msgDiv);
            container.scrollTop = container.scrollHeight;
        }

        // --- Music Logic ---
        const music = document.getElementById('bg-music');
        const musicBtn = document.getElementById('music-btn');
        let isPlaying = false;

        function toggleMusic() {
            if (isPlaying) {
                music.pause();
                musicBtn.classList.remove('playing');
                musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
                showToast("Music Paused");
            } else {
                music.play().then(() => {
                    musicBtn.classList.add('playing');
                    musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    showToast("Playing Ambient Music");
                }).catch(err => {
                    console.log("Audio play failed:", err);
                    showToast("Click anywhere first to enable audio");
                });
            }
            isPlaying = !isPlaying;
        }
    