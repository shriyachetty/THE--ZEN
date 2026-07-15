const STORAGE_KEYS = {
  products: 'hoodieProducts',
  cart: 'hoodieCart',
  wishlist: 'hoodieWishlist',
  orders: 'hoodieOrders',
  coupons: 'hoodieCoupons',
  newsletter: 'hoodieSubscribers'
};

const defaultProducts = [
  {
    id: 'hoodie-01',
    name: 'Noir Essential Hoodie',
    category: 'streetwear',
    description: 'A modern heavyweight hoodie with premium textures, tonal stitching, and a sleek streetwear silhouette.',
    price: 82,
    compareAt: 110,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Charcoal'],
    colorTags: ['#0a0a0a', '#262626'],
    images: ['assets/hoodie-1.svg', 'assets/hoodie-2.svg', 'assets/hoodie-3.svg'],
    inventory: 28,
    featured: true,
    newArrival: true
  },
  {
    id: 'hoodie-02',
    name: 'Shadow Luxe Hoodie',
    category: 'streetwear',
    description: 'Premium soft-touch fleece, oversized hood, and refined details built for everyday confidence.',
    price: 94,
    compareAt: 132,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Charcoal'],
    colorTags: ['#111111', '#f7f7f7', '#2e2e2e'],
    images: ['assets/hoodie-4.svg', 'assets/hoodie-5.svg', 'assets/hoodie-6.svg'],
    inventory: 16,
    featured: true,
    newArrival: false
  },
  {
    id: 'hoodie-03',
    name: 'Urban Core Hoodie',
    category: 'streetwear',
    description: 'A clean, minimalist hoodie designed for layers and authentic city energy.',
    price: 72,
    compareAt: 96,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Charcoal', 'White'],
    colorTags: ['#333333', '#e6e6e6'],
    images: ['assets/hoodie-2.svg', 'assets/hoodie-3.svg', 'assets/hoodie-1.svg'],
    inventory: 34,
    featured: false,
    newArrival: true
  },
  {
    id: 'hoodie-04',
    name: 'Concrete Flex Hoodie',
    category: 'streetwear',
    description: 'Textured finishes, high-density print, and a relaxed fit for modern feel.',
    price: 88,
    compareAt: null,
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Charcoal'],
    colorTags: ['#050505', '#242424'],
    images: ['assets/hoodie-3.svg', 'assets/hoodie-5.svg', 'assets/hoodie-4.svg'],
    inventory: 20,
    featured: true,
    newArrival: false
  },
  {
    id: 'hoodie-05',
    name: 'Avenue Oversized Hoodie',
    category: 'streetwear',
    description: 'Street-ready shape with elevated details and soft fleece lining.',
    price: 98,
    compareAt: 118,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Charcoal'],
    colorTags: ['#f8f8f8', '#1d1d1d'],
    images: ['assets/hoodie-6.svg', 'assets/hoodie-1.svg', 'assets/hoodie-2.svg'],
    inventory: 12,
    featured: false,
    newArrival: true
  }
];

const defaultCoupons = [
  { code: 'STREET10', discount: 10, description: 'Take $10 off your order over $75' },
  { code: 'NOIR15', discount: 15, description: '15% off select hoodies' }
];

const faqItems = [
  {
    title: 'How long does shipping take?',
    answer: 'Standard shipping delivers in 3-5 business days. Expedited and international options are available at checkout.'
  },
  {
    title: 'What is your return policy?',
    answer: 'Returns are accepted within 30 days of purchase for unworn items with tags attached. We handle returns swiftly with prepaid labels for domestic orders.'
  },
  {
    title: 'How do I choose the right size?',
    answer: 'Use the size selector on each product page. If you prefer an oversized look, choose your usual size or one size up.'
  }
];

const reviews = [
  {
    name: 'Avery M.',
    text: 'The hoodie feels premium and the fit is perfect. Customer service made ordering easy.',
    stars: 5
  },
  {
    name: 'Jordan P.',
    text: 'Excellent weight and texture. Love the understated design.',
    stars: 5
  },
  {
    name: 'Morgan K.',
    text: 'Super fast shipping and the product arrived beautifully packaged.',
    stars: 5
  }
];

function getStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function initStorage() {
  if (!getStorage(STORAGE_KEYS.products)) {
    setStorage(STORAGE_KEYS.products, defaultProducts);
  }
  if (!getStorage(STORAGE_KEYS.coupons)) {
    setStorage(STORAGE_KEYS.coupons, defaultCoupons);
  }
  if (!getStorage(STORAGE_KEYS.cart)) {
    setStorage(STORAGE_KEYS.cart, []);
  }
  if (!getStorage(STORAGE_KEYS.wishlist)) {
    setStorage(STORAGE_KEYS.wishlist, []);
  }
  if (!getStorage(STORAGE_KEYS.orders)) {
    setStorage(STORAGE_KEYS.orders, []);
  }
  if (!getStorage(STORAGE_KEYS.newsletter)) {
    setStorage(STORAGE_KEYS.newsletter, []);
  }
}

function getProducts() {
  return getStorage(STORAGE_KEYS.products) || [];
}

function saveProducts(list) {
  setStorage(STORAGE_KEYS.products, list);
}

function getCart() {
  return getStorage(STORAGE_KEYS.cart) || [];
}

function saveCart(items) {
  setStorage(STORAGE_KEYS.cart, items);
}

function getWishlist() {
  return getStorage(STORAGE_KEYS.wishlist) || [];
}

function saveWishlist(items) {
  setStorage(STORAGE_KEYS.wishlist, items);
}

function getOrders() {
  return getStorage(STORAGE_KEYS.orders) || [];
}

function saveOrders(orders) {
  setStorage(STORAGE_KEYS.orders, orders);
}

function getCoupons() {
  return getStorage(STORAGE_KEYS.coupons) || [];
}

function initUI() {
  renderNavCounts();
  bindNewsletterForm();
  bindContactForm();
}

function renderNavCounts() {
  const cartCount = getCart().reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = getWishlist().length;
  const cartLink = document.querySelector('.nav-cart-count');
  const wishLink = document.querySelector('.nav-wish-count');
  if (cartLink) cartLink.textContent = cartCount;
  if (wishLink) wishLink.textContent = wishlistCount;
}

function createProductCard(product) {
  const image = product.images[0] || 'assets/hoodie-1.svg';
  const compare = product.compareAt ? `<span class="badge-pill">Was $${product.compareAt}</span>` : '';
  return `
    <article class="product-card">
      <a href="product.html?id=${product.id}">
        <img src="${image}" alt="${product.name}" loading="lazy">
      </a>
      <div class="card-body">
        <div class="product-meta">
          <span>${product.colors.join(' / ')}</span>
          <span class="price-tag">$${product.price}</span>
        </div>
        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p>${product.description}</p>
        ${compare}
      </div>
    </article>
  `;
}

function renderHomeSections() {
  const featuredContainer = document.getElementById('featured-products');
  const arrivalContainer = document.getElementById('new-arrivals');
  if (featuredContainer) {
    featuredContainer.innerHTML = getProducts()
      .filter((product) => product.featured)
      .map(createProductCard)
      .join('');
  }
  if (arrivalContainer) {
    arrivalContainer.innerHTML = getProducts()
      .filter((product) => product.newArrival)
      .map(createProductCard)
      .join('');
  }
  const reviewContainer = document.getElementById('customer-reviews');
  if (reviewContainer) {
    reviewContainer.innerHTML = reviews
      .map(
        (review) => `
      <article class="review-card">
        <div class="card-body">
          <div class="price-tag">${'★'.repeat(review.stars)}</div>
          <h3>${review.name}</h3>
          <p>${review.text}</p>
        </div>
      </article>`
      )
      .join('');
  }
}

function bindNewsletterForm() {
  const newsForm = document.getElementById('newsletter-form');
  if (!newsForm) return;
  newsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = newsForm.querySelector('input[name="newsletter-email"]').value.trim();
    if (!email) {
      alert('Enter a valid email to subscribe.');
      return;
    }
    const list = getStorage(STORAGE_KEYS.newsletter) || [];
    if (list.includes(email)) {
      alert('You are already signed up.');
      return;
    }
    list.push(email);
    setStorage(STORAGE_KEYS.newsletter, list);
    newsForm.reset();
    alert('Subscribed successfully.');
  });
}

function bindContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thanks for reaching out! Your message will be reviewed and responded to shortly.');
    form.reset();
  });
}

function renderShopPage() {
  const products = getProducts();
  const searchField = document.getElementById('search-input');
  const colorFilters = document.querySelectorAll('input[name="filter-color"]');
  const sizeFilters = document.querySelectorAll('input[name="filter-size"]');
  const maxPrice = document.getElementById('filter-price');
  const priceLabel = document.getElementById('filter-price-label');
  const sortSelect = document.getElementById('sort-select');
  const productGrid = document.getElementById('shop-grid');

  const applyFilters = () => {
    const term = searchField.value.toLowerCase();
    const selectedColors = Array.from(colorFilters).filter((input) => input.checked).map((input) => input.value);
    const selectedSizes = Array.from(sizeFilters).filter((input) => input.checked).map((input) => input.value);
    const priceLimit = Number(maxPrice.value);
    const sortValue = sortSelect.value;

    let filtered = products.filter((product) => {
      const matchesTerm = product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term);
      const matchesColor = !selectedColors.length || selectedColors.some((color) => product.colors.includes(color));
      const matchesSize = !selectedSizes.length || selectedSizes.some((size) => product.sizes.includes(size));
      const matchesPrice = product.price <= priceLimit;
      return matchesTerm && matchesColor && matchesSize && matchesPrice;
    });

    if (sortValue === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'new') {
      filtered.sort((a, b) => b.newArrival - a.newArrival);
    } else if (sortValue === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    productGrid.innerHTML = filtered.length ? filtered.map(createProductCard).join('') : '<p class="form-copy">No hoodies matched your search. Try a different filter.</p>';
  };

  if (priceLabel) priceLabel.textContent = `$${maxPrice.value}`;
  maxPrice?.addEventListener('input', () => {
    if (priceLabel) priceLabel.textContent = `$${maxPrice.value}`;
    applyFilters();
  });
  searchField?.addEventListener('input', applyFilters);
  colorFilters.forEach((checkbox) => checkbox.addEventListener('change', applyFilters));
  sizeFilters.forEach((checkbox) => checkbox.addEventListener('change', applyFilters));
  sortSelect?.addEventListener('change', applyFilters);
  applyFilters();
}

function getQueryParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderProductPage() {
  const productId = getQueryParam('id');
  const product = getProducts().find((item) => item.id === productId) || getProducts()[0];
  const title = document.getElementById('product-title');
  const headline = document.getElementById('product-headline');
  const desc = document.getElementById('product-description');
  const imgGrid = document.getElementById('product-images');
  const metaPrice = document.getElementById('product-price');
  const colorOptions = document.getElementById('product-colors');
  const sizeOptions = document.getElementById('product-sizes');
  const wishlistBtn = document.getElementById('wishlist-button');
  const addCartBtn = document.getElementById('add-cart-button');
  const quantityInput = document.getElementById('quantity-input');
  const relatedContainer = document.getElementById('related-products');

  if (!product) return;
  title.textContent = product.name;
  headline.textContent = product.category.toUpperCase();
  desc.textContent = product.description;
  metaPrice.textContent = `$${product.price}`;
  imgGrid.innerHTML = product.images
    .map((src) => `<img src="${src}" alt="${product.name}">`)
    .join('');
  colorOptions.innerHTML = product.colors
    .map(
      (color, index) => `
      <label>
        <input type="radio" name="product-color" value="${color}" ${index === 0 ? 'checked' : ''}>
        ${color}
      </label>`
    )
    .join('');
  sizeOptions.innerHTML = product.sizes
    .map(
      (size, index) => `
      <label>
        <input type="radio" name="product-size" value="${size}" ${index === 0 ? 'checked' : ''}>
        ${size}
      </label>`
    )
    .join('');

  const isSaved = getWishlist().includes(product.id);
  if (wishlistBtn) {
    wishlistBtn.textContent = isSaved ? 'Saved to wishlist' : 'Save to wishlist';
    wishlistBtn.onclick = () => {
      const wishlist = getWishlist();
      if (wishlist.includes(product.id)) {
        saveWishlist(wishlist.filter((id) => id !== product.id));
        wishlistBtn.textContent = 'Save to wishlist';
      } else {
        wishlist.push(product.id);
        saveWishlist(wishlist);
        wishlistBtn.textContent = 'Saved to wishlist';
      }
      renderNavCounts();
    };
  }

  addCartBtn?.addEventListener('click', () => {
    const color = document.querySelector('input[name="product-color"]:checked')?.value || product.colors[0];
    const size = document.querySelector('input[name="product-size"]:checked')?.value || product.sizes[0];
    const quantity = Number(quantityInput?.value || 1);
    if (quantity < 1) return;
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id && item.color === color && item.size === size);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, color, size, quantity, image: product.images[0] });
    }
    saveCart(cart);
    renderNavCounts();
    alert('Added to cart.');
  });

  if (relatedContainer) {
    relatedContainer.innerHTML = getProducts()
      .filter((item) => item.id !== product.id)
      .slice(0, 3)
      .map(createProductCard)
      .join('');
  }
}

function renderCartPage() {
  const cart = getCart();
  const cartList = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('cart-subtotal');
  const shippingEl = document.getElementById('cart-shipping');
  const discountEl = document.getElementById('cart-discount');
  const totalEl = document.getElementById('cart-total');
  const couponInput = document.getElementById('coupon-input');
  const couponBtn = document.getElementById('coupon-button');
  const shippingZip = document.getElementById('shipping-zip');
  const shippingCalc = document.getElementById('shipping-button');
  const shippingResult = document.getElementById('shipping-result');
  const checkoutLink = document.getElementById('checkout-link');

  let couponDiscount = 0;
  let couponApplied = null;
  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const shipping = subtotal ? 7 : 0;
    const discount = couponDiscount;
    const total = Math.max(0, subtotal + shipping - discount);
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    shippingEl.textContent = `$${shipping.toFixed(2)}`;
    discountEl.textContent = `-$${discount.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  };

  const renderCartRows = () => {
    if (!cart.length) {
      cartList.innerHTML = '<p class="form-copy">Your cart is empty. Start shopping to fill your bag.</p>';
      return;
    }
    cartList.innerHTML = cart
      .map(
        (item, index) => `
      <div class="cart-row">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <strong>${item.name}</strong>
          <span>${item.color} • ${item.size}</span>
          <span>$${item.price.toFixed(2)} each</span>
        </div>
        <div class="qty-control">
          <button type="button" data-action="decrease" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button type="button" data-action="increase" data-index="${index}">+</button>
        </div>
        <button class="btn btn-ghost" type="button" data-action="remove" data-index="${index}">Remove</button>
      </div>`
      )
      .join('');
    cartList.querySelectorAll('button[data-action]').forEach((button) => {
      button.addEventListener('click', () => {
        const action = button.dataset.action;
        const index = Number(button.dataset.index);
        if (action === 'decrease') {
          if (cart[index].quantity > 1) cart[index].quantity -= 1;
        }
        if (action === 'increase') {
          cart[index].quantity += 1;
        }
        if (action === 'remove') {
          cart.splice(index, 1);
        }
        saveCart(cart);
        renderCartRows();
        calculateTotals();
        renderNavCounts();
      });
    });
  };

  couponBtn?.addEventListener('click', () => {
    const code = couponInput.value.trim().toUpperCase();
    const coupon = getCoupons().find((item) => item.code === code);
    if (!coupon) {
      alert('Invalid coupon code.');
      return;
    }
    couponDiscount = coupon.discount;
    couponApplied = coupon.code;
    alert(`Coupon ${coupon.code} applied.`);
    calculateTotals();
  });

  shippingCalc?.addEventListener('click', () => {
    const zip = shippingZip.value.trim();
    if (!zip) {
      shippingResult.textContent = 'Enter a ZIP/postal code to estimate shipping.';
      return;
    }
    shippingResult.textContent = `Estimated shipping to ${zip}: $7.00`; 
  });

  checkoutLink?.addEventListener('click', (event) => {
    if (!cart.length) {
      event.preventDefault();
      alert('Add items to cart before checking out.');
    }
  });

  renderCartRows();
  calculateTotals();
}

function renderCheckoutPage() {
  const form = document.getElementById('checkout-form');
  const cart = getCart();
  const orderNote = document.getElementById('order-note');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!cart.length) {
      alert('Your cart is empty.');
      return;
    }
    const formData = new FormData(form);
    const order = {
      id: `ORDER-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: cart,
      shipping: {
        name: formData.get('name'),
        email: formData.get('email'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zip: formData.get('zip'),
        notes: formData.get('notes')
      },
      payment: {
        method: formData.get('payment-method'),
        status: 'Pending'
      },
      subtotal: cart.reduce((sum, item) => sum + item.quantity * item.price, 0),
      shippingCost: 7,
      discount: 0,
      total: cart.reduce((sum, item) => sum + item.quantity * item.price, 0) + 7
    };
    const orders = getOrders();
    orders.unshift(order);
    saveOrders(orders);
    saveCart([]);
    renderNavCounts();
    localStorage.setItem('hoodieLastOrder', order.id);
    window.location.href = `confirmation.html?order=${order.id}`;
  });
}

function renderConfirmationPage() {
  const orderId = getQueryParam('order') || localStorage.getItem('hoodieLastOrder');
  const order = getOrders().find((item) => item.id === orderId);
  const container = document.getElementById('confirmation-details');
  if (!container || !order) return;
  container.innerHTML = `
    <div class="checkout-panel">
      <h2>Order Confirmed</h2>
      <p>Thank you, ${order.shipping.name}. Your order ${order.id} is being prepared.</p>
      <div class="summary-row"><span>Email</span><strong>${order.shipping.email}</strong></div>
      <div class="summary-row"><span>Shipping</span><strong>${order.shipping.address}, ${order.shipping.city}</strong></div>
      <div class="summary-row"><span>Total</span><strong>$${order.total.toFixed(2)}</strong></div>
      <h3>Items</h3>
      ${order.items
        .map(
          (item) => `<div class="summary-row"><span>${item.name} (${item.size}, ${item.color}) x${item.quantity}</span><strong>$${(item.price * item.quantity).toFixed(2)}</strong></div>`
        )
        .join('')}
    </div>
  `;
}

function renderAboutPage() {
  const story = document.getElementById('brand-story');
  if (!story) return;
  story.innerHTML = `
    <article class="info-card">
      <div class="card-body">
        <h3>Our story</h3>
        <p>Built around premium essentials, our label elevates everyday hoodie culture with refined materials and clean silhouettes. Designed for modern creators who value both comfort and edge.</p>
      </div>
    </article>
    <article class="info-card">
      <div class="card-body">
        <h3>Mission</h3>
        <p>We create high-quality staples that feel effortless and look refined. Our goal is to blend streetwear attitude with elevated craftsmanship.</p>
      </div>
    </article>
    <article class="info-card">
      <div class="card-body">
        <h3>Team</h3>
        <p>Our team includes designers, fabric specialists, and storytellers who collaborate to deliver premium hoodie essentials with a polished edge.</p>
      </div>
    </article>
  `;
}

function renderFaqPage() {
  const faqContainer = document.getElementById('faq-items');
  if (!faqContainer) return;
  faqContainer.innerHTML = faqItems
    .map(
      (item) => `
        <article class="faq-card">
          <div class="card-body">
            <h3>${item.title}</h3>
            <p>${item.answer}</p>
          </div>
        </article>`
    )
    .join('');
}

function renderAdminPage() {
  const products = getProducts();
  const orders = getOrders();
  const productList = document.getElementById('admin-products');
  const orderList = document.getElementById('admin-orders');
  const customerList = document.getElementById('admin-customers');
  const addForm = document.getElementById('admin-add-product');

  const formatCurrency = (value) => `$${value.toFixed(2)}`;
  const uniqueCustomers = Array.from(
    new Set(orders.map((order) => order.shipping.email))
  ).map((email) => {
    const order = orders.find((item) => item.shipping.email === email);
    return {
      email,
      name: order.shipping.name,
      lastOrder: order.id
    };
  });

  if (productList) {
    productList.innerHTML = products
      .map(
        (product) => `
      <article class="inventory-card">
        <div class="card-body">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="summary-row"><span>Price</span><strong>$${product.price}</strong></div>
          <div class="summary-row"><span>Inventory</span><strong>${product.inventory}</strong></div>
          <div class="summary-row"><span>Colors</span><strong>${product.colors.join(', ')}</strong></div>
          <button class="btn btn-secondary" data-action="edit-product" data-id="${product.id}">Edit product</button>
        </div>
      </article>`
      )
      .join('');
  }

  if (orderList) {
    orderList.innerHTML = orders
      .map(
        (order) => `
      <article class="order-card">
        <div class="card-body">
          <h3>${order.id}</h3>
          <p>${order.shipping.name} • ${order.shipping.email}</p>
          <div class="summary-row"><span>Total</span><strong>$${order.total.toFixed(2)}</strong></div>
          <div class="summary-row"><span>Status</span><strong>${order.payment.status}</strong></div>
        </div>
      </article>`
      )
      .join('');
  }

  if (customerList) {
    customerList.innerHTML = uniqueCustomers
      .map(
        (customer) => `
      <article class="info-card">
        <div class="card-body">
          <h3>${customer.name}</h3>
          <p>${customer.email}</p>
          <div class="summary-row"><span>Last order</span><strong>${customer.lastOrder}</strong></div>
        </div>
      </article>`
      )
      .join('');
  }

  if (addForm) {
    addForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(addForm);
      const imageUrl = formData.get('image-url')?.trim();
      const imageFile = formData.get('product-image');
      const imageList = [];
      if (imageUrl) {
        imageList.push(imageUrl);
      }
      if (imageFile && imageFile.size) {
        try {
          const dataUrl = await readFileAsDataURL(imageFile);
          imageList.unshift(dataUrl);
        } catch (error) {
          console.error(error);
        }
      }
      const newProduct = {
        id: `hoodie-${Date.now()}`,
        name: formData.get('name'),
        category: 'streetwear',
        description: formData.get('description'),
        price: Number(formData.get('price')) || 0,
        compareAt: null,
        sizes: formData.get('sizes').split(',').map((value) => value.trim()).filter(Boolean),
        colors: formData.get('colors').split(',').map((value) => value.trim()).filter(Boolean),
        colorTags: ['#000000'],
        images: imageList.length ? imageList : ['assets/hoodie-1.svg'],
        inventory: Number(formData.get('inventory')) || 0,
        featured: formData.get('featured') === 'on',
        newArrival: formData.get('newArrival') === 'on'
      };
      products.unshift(newProduct);
      saveProducts(products);
      addForm.reset();
      alert('Product added. Refresh the page to view it in the shop.');
    });
  }

  productList?.querySelectorAll('button[data-action="edit-product"]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.id;
      const product = products.find((item) => item.id === productId);
      if (!product) return;
      const name = prompt('Product name', product.name);
      const description = prompt('Product description', product.description);
      const price = prompt('Price', product.price);
      const inventory = prompt('Inventory quantity', product.inventory);
      if (name && description && price != null && inventory != null) {
        product.name = name;
        product.description = description;
        product.price = Number(price);
        product.inventory = Number(inventory);
        saveProducts(products);
        alert('Product updated. Refresh the shop page to see changes.');
      }
    });
  });
}

function initPage() {
  initStorage();
  initUI();
  const page = document.body.dataset.page;

  if (page === 'admin') {
    window.location.replace('index.html');
    return;
  }

  switch (page) {
    case 'home':
      renderHomeSections();
      break;
    case 'shop':
      renderShopPage();
      break;
    case 'product':
      renderProductPage();
      break;
    case 'cart':
      renderCartPage();
      break;
    case 'checkout':
      renderCheckoutPage();
      break;
    case 'confirmation':
      renderConfirmationPage();
      break;
    case 'about':
      renderAboutPage();
      break;
    case 'faq':
      renderFaqPage();
      break;
    case 'admin':
      renderAdminPage();
      break;
    default:
      break;
  }
}

window.addEventListener('DOMContentLoaded', initPage);
