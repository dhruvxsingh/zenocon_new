// app/api/whatsapp/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Environment variables
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;
const PHONE_NUMBER_ID = process.env.META_PHONE_NUMBER_ID;
const CATALOG_ID = process.env.META_CATALOG_ID; // Add this to your environment

// Types
interface Customer {
  phone: string;
  name?: string;
  email?: string;
  isRegistered: boolean;
  loyaltyPoints: number;
  addresses: string[];
  preferences?: {
    favoriteCategories: string[];
    dietaryRestrictions: string[];
  };
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  createdAt: Date;
  estimatedDeliveryTime?: string;
  deliveryAddress?: string;
}

interface InteractiveMessage {
  type: string;
  button_reply?: {
    id: string;
    title: string;
  };
  list_reply?: {
    id: string;
    title: string;
  };
  nfm_reply?: {
    response_json: string;
    body: string;
    name: string;
  };
}

interface LocationMessage {
  latitude: number;
  longitude: number;
  address?: string;
  name?: string;
}

interface OrderData {
  catalog_id: string;
  text: string;
  product_items: Array<{
    product_retailer_id: string;
    quantity: number;
    item_price: number;
    currency: string;
  }>;
}

interface MessageData {
  type: string;
  text?: { body: string };
  interactive?: {
    type: string;
    body?: { text: string };
    footer?: { text: string };
    header?: {
      type: string;
      text?: string;
      image?: { link: string };
      video?: { link: string };
    };
    action?: {
      name?: string;
      catalog_id?: string;
      button?: string;
      buttons?: Array<{
        type: string;
        reply: {
          id: string;
          title: string;
        };
      }>;
      sections?: Array<{
        title?: string;
        product_items?: Array<{
          product_retailer_id: string;
        }>;
        rows?: Array<{
          id: string;
          title: string;
          description?: string;
        }>;
      }>;
      parameters?: {
        reference_id: string;
        type: string;
        payment_type?: string;
        payment_configuration?: string;
        currency: string;
        total_amount: {
          value: number;
          offset: number;
        };
        order: {
          status: string;
          items: Array<{
            retailer_id?: string;
            name: string;
            amount: { value: number; offset: number };
            sale_amount?: { value: number; offset: number };
            quantity: number;
          }>;
          subtotal: { value: number; offset: number };
          tax?: { value: number; offset: number; description?: string };
          shipping?: { value: number; offset: number; description?: string };
          discount?: { value: number; offset: number; description?: string };
        };
      };
    };
  };
}

// User States
const STATES = {
  NEW: 'new',
  REGISTRATION_NAME: 'registration_name',
  REGISTRATION_EMAIL: 'registration_email',
  ADDRESS_NEEDED: 'address_needed',
  BROWSING: 'browsing',
  CART_REVIEW: 'cart_review',
  PAYMENT: 'payment',
  ORDER_PLACED: 'order_placed',
  FEEDBACK: 'feedback'
} as const;

// Product cache to store catalog data (fetched from WhatsApp API)
const productCache = new Map<string, any>();
const categoryCache = new Map<string, any>();
let catalogLastFetched: number = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Catalog API Functions
async function fetchCatalogProducts(): Promise<any[]> {
  try {
    // Check cache first
    if (Date.now() - catalogLastFetched < CACHE_DURATION && productCache.size > 0) {
      return Array.from(productCache.values());
    }

    const response = await fetch(`https://graph.facebook.com/v22.0/${CATALOG_ID}/products?fields=id,name,description,price,currency,availability,category,image_url,url`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Catalog API error: ${response.status}`);
    }

    const data = await response.json();
    const products = data.data || [];

    // Update cache
    productCache.clear();
    products.forEach((product: any) => {
      productCache.set(product.id, product);
    });
    catalogLastFetched = Date.now();

    console.log(`Fetched ${products.length} products from catalog`);
    return products;
  } catch (error) {
    console.error('Error fetching catalog products:', error);
    return [];
  }
}

async function getProductById(productId: string): Promise<any | null> {
  try {
    console.log(`Fetching product: ${productId}`);
    
    // Check cache first
    if (productCache.has(productId)) {
      console.log(`Product found in cache: ${productId}`);
      return productCache.get(productId);
    }

    // If no CATALOG_ID, return mock product
    if (!CATALOG_ID) {
      console.warn('CATALOG_ID not configured, returning mock product');
      const mockProduct = {
        id: productId,
        name: `Product ${productId}`,
        price: '299',
        currency: 'INR',
        availability: 'in stock',
        category: 'Food',
        description: 'Delicious item from our menu'
      };
      productCache.set(productId, mockProduct);
      return mockProduct;
    }

    // Fetch from API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(
      `https://graph.facebook.com/v22.0/${productId}?fields=id,name,description,price,currency,availability,category,image_url,url`, 
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Product API error for ${productId}: ${response.status} ${response.statusText}`);
      
      // Try to get error details
      let errorText = '';
      try {
        const errorData = await response.json();
        errorText = errorData.error?.message || response.statusText;
      } catch {
        errorText = response.statusText;
      }
      
      console.error(`API Error details: ${errorText}`);
      return null;
    }

    const product = await response.json();
    console.log(`Product fetched successfully:`, product);
    
    // Cache the product
    productCache.set(productId, product);
    return product;
    
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error(`Product fetch timeout for ${productId}`);
      } else {
        console.error(`Error fetching product ${productId}:`, error.message);
      }
    } else {
      console.error(`Unknown error fetching product ${productId}:`, String(error));
    }
    return null;
  }
}

async function getCatalogCategories(): Promise<string[]> {
  try {
    const products = await fetchCatalogProducts();
    const categories = [...new Set(products.map(product => product.category).filter(Boolean))];
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
}

async function getProductsByCategory(category: string): Promise<any[]> {
  try {
    const products = await fetchCatalogProducts();
    return products.filter(product => 
      product.category && product.category.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error('Error getting products by category:', error);
    return [];
  }
}

async function getPopularProducts(): Promise<any[]> {
  try {
    const products = await fetchCatalogProducts();
    // In a real scenario, you'd have analytics data to determine popular products
    // For now, we'll return first 6 products or those marked as featured
    return products.slice(0, 6);
  } catch (error) {
    console.error('Error getting popular products:', error);
    return [];
  }
}

// In-memory storage (use database in production)
const customers = new Map<string, Customer>();
const userStates = new Map<string, string>();
const userCarts = new Map<string, CartItem[]>();
const orders = new Map<string, Order>();
const sessionData = new Map<string, any>();

// Webhook verification (GET)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  console.log('Webhook verification:', { mode, token, challenge });
  console.log('Environment:', { ACCESS_TOKEN: !!ACCESS_TOKEN, VERIFY_TOKEN, PHONE_NUMBER_ID });

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified successfully');
    return new NextResponse(challenge, { status: 200 });
  } else {
    console.log('Webhook verify failed');
    return new NextResponse('Forbidden', { status: 403 });
  }
}

// Handle incoming messages (POST)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Webhook received:', JSON.stringify(body, null, 2));

    if (body.entry?.[0]?.changes?.[0]?.value?.messages) {
      const message = body.entry[0].changes[0].value.messages[0];
      const fromNumber = message.from;
      
      console.log(`Processing message from ${fromNumber}:`, message.type);
      
      // Add more detailed logging for order messages
      if (message.type === 'order') {
        console.log('Order message details:', JSON.stringify(message.order, null, 2));
        await handleCatalogOrder(fromNumber, message.order);
      } else if (message.type === 'text') {
        await handleTextMessage(fromNumber, message.text.body);
      } else if (message.type === 'interactive') {
        await handleInteractiveMessage(fromNumber, message.interactive);
      } else if (message.type === 'location') {
        await handleLocation(fromNumber, message.location);
      } else {
        console.log(`Unhandled message type: ${message.type}`);
      }
    }

    // Handle message status updates
    if (body.entry?.[0]?.changes?.[0]?.value?.statuses) {
      const statuses = body.entry[0].changes[0].value.statuses;
      await handleMessageStatuses(statuses);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}

// Enhanced Message Handlers
async function handleTextMessage(phone: string, messageText: string) {
  const text = messageText.toLowerCase().trim();
  const customer = customers.get(phone);
  const currentState = userStates.get(phone) || STATES.NEW;

  console.log(`Customer: ${customer?.name || 'Unknown'}, State: ${currentState}, Message: ${text}`);

  switch (currentState) {
    case STATES.NEW:
      if (text.includes('hi') || text.includes('hello') || text.includes('start') || text.includes('menu')) {
        if (customer?.isRegistered) {
          await welcomeReturningCustomer(phone, customer);
        } else {
          await startRegistration(phone);
        }
      } else {
        await sendWelcomePrompt(phone);
      }
      break;

    case STATES.REGISTRATION_NAME:
      await collectName(phone, messageText);
      break;

    case STATES.REGISTRATION_EMAIL:
      await collectEmail(phone, messageText);
      break;

    case STATES.ADDRESS_NEEDED:
      await handleAddressText(phone, messageText);
      break;

    case STATES.BROWSING:
      await handleBrowsingCommands(phone, text);
      break;

    case STATES.CART_REVIEW:
      await handleCartCommands(phone, text);
      break;

    case STATES.FEEDBACK:
      await handleFeedback(phone, messageText);
      break;

    default:
      await sendHelpMessage(phone);
  }
}

async function handleInteractiveMessage(phone: string, interactive: InteractiveMessage) {
  console.log('Interactive message received:', interactive);

  if (interactive.type === 'button_reply' && interactive.button_reply) {
    await handleButtonReply(phone, interactive.button_reply.id);
  } else if (interactive.type === 'list_reply' && interactive.list_reply) {
    await handleListReply(phone, interactive.list_reply.id);
  } else {
    // Handle any other interactive message types
    console.log('Unhandled interactive message type:', interactive.type);
    await sendMessage(phone, {
      type: 'text',
      text: { body: 'Please use the menu options provided to navigate through our services.' }
    });
  }
}

async function handleButtonReply(phone: string, buttonId: string) {
  console.log(`Button clicked: ${buttonId} by ${phone}`);

  switch (buttonId) {
    case 'start_ordering':
      await requestAddress(phone);
      break;
    case 'browse_catalog':
      await showCatalogMessage(phone);
      break;
    case 'view_categories':
      await showCategoryList(phone);
      break;
    case 'popular_items':
      await showPopularItems(phone);
      break;
    case 'view_cart':
      await showEnhancedCartSummary(phone);
      break;
    case 'checkout':
      await processCheckout(phone);
      break;
    case 'add_more':
      await showCatalogMessage(phone);
      userStates.set(phone, STATES.BROWSING);
      break;
    case 'clear_cart':
      await clearCart(phone);
      break;
    case 'pay_upi':
    case 'pay_card':
    case 'pay_cod':
      await processPayment(phone, buttonId);
      break;
    case 'track_order':
      await showOrderTracking(phone);
      break;
    case 'help':
      await sendHelpMessage(phone);
      break;
    case 'feedback_good':
      await handlePositiveFeedback(phone);
      break;
    case 'feedback_bad':
      await handleNegativeFeedback(phone);
      break;
    default:
      console.log(`Unhandled button: ${buttonId}`);
  }
}

async function handleListReply(phone: string, listId: string) {
  console.log(`List item selected: ${listId} by ${phone}`);

  if (listId.startsWith('cat_')) {
    const categoryId = listId.replace('cat_', '');
    await showCategoryProducts(phone, categoryId);
  } else {
    // Handle other list selections
    await sendMessage(phone, {
      type: 'text',
      text: { body: 'Please use our catalog to browse and select products for the best experience!' }
    });
    await showCatalogMessage(phone);
  }
}

// Enhanced debugging version of handleCatalogOrder
const retailerIdToProductMap = new Map<string, any>();
let catalogMappingLastUpdated = 0;
const MAPPING_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Enhanced catalog fetch that builds retailer_id mapping
async function fetchCatalogProductsWithMapping(): Promise<any[]> {
  try {
    // Check cache first
    if (Date.now() - catalogMappingLastUpdated < MAPPING_CACHE_DURATION && retailerIdToProductMap.size > 0) {
      console.log(`Using cached product mapping (${retailerIdToProductMap.size} products)`);
      return Array.from(productCache.values());
    }

    console.log('🔄 Fetching catalog with retailer_id mapping...');
    
    if (!CATALOG_ID || !ACCESS_TOKEN) {
      console.error('❌ Missing CATALOG_ID or ACCESS_TOKEN');
      return [];
    }

    const response = await fetch(
      `https://graph.facebook.com/v22.0/${CATALOG_ID}/products?fields=id,name,description,price,currency,availability,category,image_url,url,retailer_id&limit=100`, 
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Catalog fetch error:', errorData);
      throw new Error(`Catalog API error: ${response.status}`);
    }

    const data = await response.json();
    const products = data.data || [];

    // Clear and rebuild caches
    productCache.clear();
    retailerIdToProductMap.clear();

    console.log(`📦 Processing ${products.length} products for mapping...`);

    products.forEach((product: any) => {
      // Cache by Facebook product ID
      productCache.set(product.id, product);
      
      // Create mapping by retailer_id (the ID you set when creating products)
      if (product.retailer_id) {
        retailerIdToProductMap.set(product.retailer_id, product);
        console.log(`📍 Mapped retailer_id "${product.retailer_id}" → product "${product.name}" (${product.id})`);
      }
    });

    catalogMappingLastUpdated = Date.now();
    console.log(`✅ Built mapping for ${retailerIdToProductMap.size} products with retailer_ids`);
    console.log('Available retailer_ids:', Array.from(retailerIdToProductMap.keys()));

    return products;
  } catch (error) {
    console.error('Error fetching catalog with mapping:', error);
    return [];
  }
}

// Enhanced product lookup that tries multiple strategies
async function findProductByAnyId(productId: string): Promise<any | null> {
  console.log(`🔍 Finding product by ID: ${productId}`);
  
  // Strategy 1: Check if it's a Facebook product ID (long number)
  if (productCache.has(productId)) {
    console.log('✅ Found by Facebook product ID in cache');
    return productCache.get(productId);
  }
  
  // Strategy 2: Check if it's a retailer_id
  if (retailerIdToProductMap.has(productId)) {
    const product = retailerIdToProductMap.get(productId);
    console.log('✅ Found by retailer_id:', product.name);
    return product;
  }
  
  // Strategy 3: Fetch fresh catalog data and try again
  console.log('🔄 Not found in cache, refreshing catalog...');
  await fetchCatalogProductsWithMapping();
  
  // Try retailer_id mapping again
  if (retailerIdToProductMap.has(productId)) {
    const product = retailerIdToProductMap.get(productId);
    console.log('✅ Found by retailer_id after refresh:', product.name);
    return product;
  }
  
  // Strategy 4: Search through all products by name or partial match
  console.log('🔍 Searching products by name/description...');
  const allProducts = Array.from(productCache.values());
  
  // Try exact name match (case-insensitive)
  let product = allProducts.find(p => 
    p.name && p.name.toLowerCase().includes(productId.toLowerCase())
  );
  
  if (product) {
    console.log('✅ Found by name match:', product.name);
    return product;
  }
  
  // Strategy 5: Try to find by description
  product = allProducts.find(p => 
    p.description && p.description.toLowerCase().includes(productId.toLowerCase())
  );
  
  if (product) {
    console.log('✅ Found by description match:', product.name);
    return product;
  }
  
  console.log('❌ Product not found by any strategy');
  return null;
}

// Fixed handleCatalogOrder with proper product ID handling
async function handleCatalogOrder(phone: string, orderData: any) {
  console.log('=== CATALOG ORDER WITH ID MAPPING ===');
  console.log('Raw order data:', JSON.stringify(orderData, null, 2));
  
  // Ensure we have fresh mapping data
  await fetchCatalogProductsWithMapping();
  
  const cart = userCarts.get(phone) || [];
  let itemsAdded = 0;
  let errors: string[] = [];

  if (!orderData?.product_items || !Array.isArray(orderData.product_items)) {
    console.error('❌ Invalid order data structure');
    await sendMessage(phone, {
      type: 'text',
      text: { body: '❌ Invalid order data received. Please try again.' }
    });
    return;
  }

  console.log(`Processing ${orderData.product_items.length} items...`);

  for (const [index, item] of orderData.product_items.entries()) {
    console.log(`\n--- Processing item ${index + 1}: ${item.product_retailer_id} ---`);
    
    try {
      if (!item.product_retailer_id) {
        console.warn('⚠️ Missing product_retailer_id');
        continue;
      }

      const productId = item.product_retailer_id;
      console.log(`🔍 Looking up product: ${productId}`);
      
      // Use enhanced product lookup
      const product = await findProductByAnyId(productId);
      
      if (!product) {
        console.log(`❌ Product ${productId} not found, creating fallback...`);
        
        // Create a basic product from the order data
        const fallbackProduct = {
          id: productId,
          retailer_id: productId,
          name: productId.includes('RB') ? `Recipe Bowl ${productId}` : `Product ${productId}`,
          price: String(item.item_price || 299),
          currency: item.currency || 'INR',
          description: 'Delicious item from our menu',
          image_url: 'https://placehold.co/600x600/325aa8/ffffff/png?text=Zenocon'
        };
        
        // Cache the fallback
        productCache.set(productId, fallbackProduct);
        retailerIdToProductMap.set(productId, fallbackProduct);
        
        console.log('✅ Created fallback product:', fallbackProduct);
        
        // Add to cart with fallback data
        await addItemToCart(cart, fallbackProduct, item);
        itemsAdded++;
        continue;
      }

      console.log('✅ Product found:', product.name);
      
      // Add to cart with real product data
      await addItemToCart(cart, product, item);
      itemsAdded++;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error processing item ${index + 1}:`, error);
      errors.push(`Error adding ${item.product_retailer_id || 'unknown'}: ${errorMessage}`);
    }
  }

  // Update cart
  userCarts.set(phone, cart);
  console.log(`\n✅ Cart updated. Items: ${cart.length}, Added: ${itemsAdded}, Errors: ${errors.length}`);

  // Send confirmation
  if (itemsAdded > 0) {
    await sendMessage(phone, {
      type: 'text',
      text: { 
        body: `✅ *${itemsAdded} item${itemsAdded > 1 ? 's' : ''} added to cart!*\n\n${errors.length > 0 ? `⚠️ Some items had issues: ${errors.slice(0, 2).join(', ')}${errors.length > 2 ? '...' : ''}\n\n` : ''}Let me show you your cart summary.` 
      }
    });
    
    setTimeout(() => {
      showEnhancedCartSummary(phone);
      userStates.set(phone, STATES.CART_REVIEW);
    }, 1000);
  } else {
    await sendMessage(phone, {
      type: 'text',
      text: { 
        body: `❌ *Unable to add items to cart*\n\nIssues encountered:\n${errors.slice(0, 3).join('\n')}\n\nPlease try browsing our catalog again.` 
      }
    });
    
    setTimeout(() => showCatalogMessage(phone), 1000);
  }
}

// Helper function to add item to cart
async function addItemToCart(cart: CartItem[], product: any, orderItem: any): Promise<void> {
  // Parse price
  let productPrice = 0;
  if (product.price) {
    // Remove currency symbols and parse
    const priceStr = String(product.price).replace(/[^\d.]/g, '');
    productPrice = parseFloat(priceStr) || 0;
  }
  
  // Fallback to order item price
  if (!productPrice || isNaN(productPrice)) {
    productPrice = parseFloat(String(orderItem.item_price || 0)) || 0;
  }
  
  // Final fallback
  if (!productPrice || isNaN(productPrice)) {
    productPrice = 299;
  }

  const quantity = parseInt(String(orderItem.quantity || 1)) || 1;
  const productId = product.retailer_id || product.id;

  console.log(`📦 Adding: ${product.name}, ₹${productPrice} x ${quantity}`);

  // Check if item exists in cart
  const existingItemIndex = cart.findIndex(cartItem => cartItem.productId === productId);

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
    console.log(`✅ Updated existing item quantity: ${cart[existingItemIndex].quantity}`);
  } else {
    const newCartItem: CartItem = {
      productId: productId,
      name: product.name || `Product ${productId}`,
      price: productPrice,
      quantity: quantity,
      image: product.image_url,
      description: product.description || 'Delicious item from our menu'
    };
    
    cart.push(newCartItem);
    console.log('✅ Added new cart item');
  }
}

// Debug function to show current mappings
async function debugProductMappings(): Promise<void> {
  console.log('\n=== PRODUCT MAPPING DEBUG ===');
  
  await fetchCatalogProductsWithMapping();
  
  console.log(`Total products in cache: ${productCache.size}`);
  console.log(`Total retailer_id mappings: ${retailerIdToProductMap.size}`);
  
  console.log('\nRetailer ID mappings:');
  for (const [retailerId, product] of retailerIdToProductMap.entries()) {
    console.log(`"${retailerId}" → "${product.name}" (${product.id})`);
  }
  
  console.log('\nFirst few Facebook product IDs:');
  const fbIds = Array.from(productCache.keys()).slice(0, 5);
  fbIds.forEach(id => {
    const product = productCache.get(id);
    console.log(`${id} → "${product?.name}"`);
  });
  
  console.log('=== MAPPING DEBUG END ===\n');
}

debugProductMappings()

// Enhanced product fetching with detailed debugging
async function getProductByIdWithDebug(productId: string): Promise<any | null> {
  console.log(`\n🔍 getProductByIdWithDebug: ${productId}`);
  
  try {
    // If no CATALOG_ID, create a mock product immediately
    if (!CATALOG_ID) {
      console.log('⚠️ CATALOG_ID not configured, creating mock product');
      return createMockProduct(productId);
    }

    if (!ACCESS_TOKEN) {
      console.log('❌ ACCESS_TOKEN not configured');
      return createMockProduct(productId);
    }

    // Try direct product fetch first
    console.log(`🌐 Fetching product from: https://graph.facebook.com/v22.0/${productId}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `https://graph.facebook.com/v22.0/${productId}?fields=id,name,description,price,currency,availability,category,image_url,url`, 
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    console.log(`📡 API Response Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      let errorDetails = '';
      try {
        const errorData = await response.json();
        console.log('📡 API Error Details:', JSON.stringify(errorData, null, 2));
        errorDetails = errorData.error?.message || response.statusText;
      } catch (parseError) {
        console.log('❌ Could not parse error response');
        errorDetails = response.statusText;
      }
      
      console.log(`❌ API request failed: ${response.status} ${errorDetails}`);
      
      // Try fetching from catalog products as fallback
      console.log('🔄 Trying catalog products fallback...');
      return await findProductInCatalog(productId);
    }

    const product = await response.json();
    console.log(`✅ Product fetched successfully:`, JSON.stringify(product, null, 2));
    
    // Cache the product
    productCache.set(productId, product);
    return product;
    
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error(`⏰ Product fetch timeout for ${productId}`);
      } else {
        console.error(`❌ Error fetching product ${productId}:`, error.message);
      }
    } else {
      console.error(`❌ Unknown error fetching product ${productId}:`, String(error));
    }
    
    // Try catalog fallback
    console.log('🔄 Trying catalog fallback due to error...');
    return await findProductInCatalog(productId);
  }
}

// Try to find product in the full catalog
async function findProductInCatalog(productId: string): Promise<any | null> {
  console.log(`🔍 Searching for ${productId} in full catalog...`);
  
  try {
    const allProducts = await fetchCatalogProducts();
    console.log(`📦 Searching through ${allProducts.length} catalog products`);
    
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      console.log(`✅ Found product in catalog:`, JSON.stringify(product, null, 2));
      return product;
    } else {
      console.log(`❌ Product ${productId} not found in catalog`);
      return createMockProduct(productId);
    }
  } catch (error) {
    console.error('❌ Error searching catalog:', error);
    return createMockProduct(productId);
  }
}

// Create a mock product when all else fails
function createMockProduct(productId: string): any {
  console.log(`🔧 Creating mock product for ${productId}`);
  
  const mockProduct = {
    id: productId,
    name: `Product ${productId}`,
    price: '299',
    currency: 'INR',
    availability: 'in stock',
    category: 'Food',
    description: 'Delicious item from our menu',
    image_url: 'https://placehold.co/600x600/325aa8/ffffff/png?text=Zenocon'
  };
  
  // Cache the mock product
  productCache.set(productId, mockProduct);
  return mockProduct;
}

// Create fallback product from order data
function createFallbackProduct(item: any, orderData: any): any | null {
  console.log('🔧 Creating fallback product from order data...');
  
  try {
    const productId = item.product_retailer_id;
    const price = item.item_price || 299;
    
    // Try to extract name from order text or use product ID
    let productName = `Product ${productId}`;
    if (orderData.text && typeof orderData.text === 'string') {
      // Extract product names from order text if available
      productName = orderData.text.includes(productId) ? 
        orderData.text : `Product ${productId}`;
    }
    
    const fallbackProduct = {
      id: productId,
      name: productName,
      price: String(price),
      currency: item.currency || 'INR',
      availability: 'in stock',
      category: 'Food',
      description: 'Delicious item from our menu',
      image_url: 'https://placehold.co/600x600/325aa8/ffffff/png?text=Zenocon'
    };
    
    console.log('✅ Created fallback product:', JSON.stringify(fallbackProduct, null, 2));
    return fallbackProduct;
  } catch (error) {
    console.error('❌ Error creating fallback product:', error);
    return null;
  }
}

// Add a test function to verify your catalog setup
async function testCatalogSetup(): Promise<void> {
  console.log('\n=== TESTING CATALOG SETUP ===');
  console.log('Environment variables:');
  console.log('- ACCESS_TOKEN exists:', !!ACCESS_TOKEN);
  console.log('- CATALOG_ID exists:', !!CATALOG_ID);
  console.log('- CATALOG_ID value:', CATALOG_ID);
  
  if (CATALOG_ID && ACCESS_TOKEN) {
    try {
      console.log('🔍 Testing catalog products fetch...');
      const products = await fetchCatalogProducts();
      console.log(`✅ Successfully fetched ${products.length} products`);
      
      if (products.length > 0) {
        console.log('📦 Sample products:');
        products.slice(0, 3).forEach(product => {
          console.log(`- ${product.id}: ${product.name} (₹${product.price})`);
        });
      }
    } catch (error) {
      console.error('❌ Error testing catalog:', error);
    }
  } else {
    console.log('⚠️ Missing required environment variables');
  }
  console.log('=== CATALOG SETUP TEST END ===\n');
}

testCatalogSetup()

async function handleAddressText(phone: string, address: string) {
  const customer = customers.get(phone);
  if (customer) {
    customer.addresses = [address.trim()];
    customers.set(phone, customer);
  }
  
  await sendMessage(phone, {
    type: 'text',
    text: { body: '✅ Perfect! Address saved successfully.' }
  });
  
  await showMainMenu(phone);
}

async function handleLocation(phone: string, location: LocationMessage) {
  const address = location.address || `${location.latitude}, ${location.longitude}`;
  const customer = customers.get(phone);
  
  if (customer) {
    customer.addresses = [address];
    customers.set(phone, customer);
  }
  
  await sendMessage(phone, {
    type: 'text',
    text: { body: '📍 Great! Location saved. Now let\'s explore our delicious menu!' }
  });
  
  await showMainMenu(phone);
}

// Enhanced Registration Flow
async function startRegistration(phone: string) {
  await sendMessage(phone, {
    type: 'text',
    text: { 
      body: `🍕 *Welcome to FoodieBot!*

Your personal food ordering assistant is here!

*Why register with us?*
🎁 *10% welcome discount*
⚡ *Lightning-fast checkout*
🏆 *Earn loyalty points*
📍 *Save delivery addresses*
🔔 *Order updates via WhatsApp*

Let's get started! What's your name?` 
    }
  });
  
  userStates.set(phone, STATES.REGISTRATION_NAME);
}

async function collectName(phone: string, name: string) {
  const cleanName = name.trim();
  
  if (cleanName.length < 2) {
    await sendMessage(phone, {
      type: 'text',
      text: { body: 'Please enter a valid name (at least 2 characters).' }
    });
    return;
  }

  customers.set(phone, {
    phone,
    name: cleanName,
    isRegistered: false,
    loyaltyPoints: 0,
    addresses: []
  });

  await sendMessage(phone, {
    type: 'text',
    text: { body: `Nice to meet you, ${cleanName}! 😊\n\nWhat's your email address?\n\n💡 *Tip: Type "skip" if you prefer not to share*` }
  });
  
  userStates.set(phone, STATES.REGISTRATION_EMAIL);
}

async function collectEmail(phone: string, email: string) {
  const customer = customers.get(phone)!;
  
  if (email.toLowerCase() !== 'skip') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      await sendMessage(phone, {
        type: 'text',
        text: { body: 'Please enter a valid email address or type "skip".' }
      });
      return;
    }
    customer.email = email;
  }
  
  customer.isRegistered = true;
  customer.loyaltyPoints = 100; // Welcome bonus
  customers.set(phone, customer);

  await sendMessage(phone, {
    type: 'text',
    text: { 
      body: `🎉 *Registration Complete!*

Welcome to the FoodieBot family, ${customer.name}! 

🎁 *Welcome bonus:* 100 loyalty points added!
🏆 *Current points:* ${customer.loyaltyPoints}

Now I need your delivery address to get started.` 
    }
  });
  
  await requestAddress(phone);
}

async function welcomeReturningCustomer(phone: string, customer: Customer) {
  const timeOfDay = getTimeOfDayGreeting();
  
  await sendMessage(phone, {
    type: 'text',
    text: { 
      body: `${timeOfDay}, ${customer.name}! 🎉

Welcome back to FoodieBot!

🏆 *Loyalty Points:* ${customer.loyaltyPoints}
📍 *Saved Address:* ${customer.addresses[0] || 'None saved'}` 
    }
  });

  if (customer.addresses.length > 0) {
    await sendMessage(phone, {
      type: 'interactive',
      interactive: {
        type: 'button',
        body: { text: `📍 Deliver to: *${customer.addresses[0]}*?` },
        action: {
          buttons: [
            { type: 'reply', reply: { id: 'start_ordering', title: '✅ Yes, Let\'s Order!' }},
            { type: 'reply', reply: { id: 'change_address', title: '📍 Change Address' }}
          ]
        }
      }
    });
  } else {
    await requestAddress(phone);
  }
}

async function requestAddress(phone: string) {
  await sendMessage(phone, {
    type: 'text',
    text: { body: '📍 *Share Your Location*\n\nI need to know where to deliver your delicious food!' }
  });

  // Send location request
  await sendMessage(phone, {
    type: 'interactive',
    interactive: {
      type: 'location_request_message',
      body: { text: 'Please share your delivery location by tapping the button below, or simply type your address.' },
      action: { name: 'send_location' }
    }
  });
  
  userStates.set(phone, STATES.ADDRESS_NEEDED);
}

// Enhanced Menu & Catalog Functions
async function showMainMenu(phone: string) {
  await sendMessage(phone, {
    type: 'interactive',
    interactive: {
      type: 'button',
      header: {
        type: 'image',
        image: { link: 'https://placehold.co/600x600/325aa8/ffffff/png?text=Zenocon' }
      },
      body: { 
        text: `🍽️ *What sounds delicious today?*

Choose how you'd like to explore our menu:` 
      },
      footer: { text: 'FoodieBot • Always fresh, always fast!' },
      action: {
        buttons: [
          { type: 'reply', reply: { id: 'browse_catalog', title: '📖 Full Menu' }},
          { type: 'reply', reply: { id: 'popular_items', title: '⭐ Popular Items' }},
          { type: 'reply', reply: { id: 'view_categories', title: '📂 Categories' }}
        ]
      }
    }
  });

  userStates.set(phone, STATES.BROWSING);
}

async function showCatalogMessage(phone: string) {
  if (!CATALOG_ID) {
    await sendMessage(phone, {
      type: 'text',
      text: { body: '❌ Catalog not configured. Please contact support.' }
    });
    return;
  }

  try {
    // Send WhatsApp native catalog
    await sendMessage(phone, {
      type: 'interactive',
      interactive: {
        type: 'catalog_message',
        body: { 
          text: '🛒 *Browse Our Complete Menu*\n\nTap on any item to see details and add to cart!' 
        },
        footer: { text: 'Scroll through all our delicious options' },
        action: {
          name: 'catalog_message',
          catalog_id: CATALOG_ID
        }
      }
    });
  } catch (error) {
    console.error('Error showing catalog:', error);
    await sendMessage(phone, {
      type: 'text',
      text: { body: '❌ Unable to load catalog. Please try again later.' }
    });
  }
}

async function showCategoryList(phone: string) {
  try {
    const categories = await getCatalogCategories();
    
    if (categories.length === 0) {
      await sendMessage(phone, {
        type: 'text',
        text: { body: '❌ No categories found. Please browse our catalog directly.' }
      });
      return;
    }

    // Map categories to list rows with emojis
    const categoryEmojis: { [key: string]: string } = {
      'pizza': '🍕',
      'burger': '🍔', 
      'burgers': '🍔',
      'pasta': '🍝',
      'salad': '🥗',
      'salads': '🥗',
      'dessert': '🍰',
      'desserts': '🍰',
      'drinks': '🥤',
      'beverages': '🥤',
      'appetizers': '🥨',
      'mains': '🍽️',
      'sides': '🍟'
    };

    const rows = categories.map(category => ({
      id: `cat_${category.toLowerCase().replace(/\s+/g, '_')}`,
      title: `${categoryEmojis[category.toLowerCase()] || '🍽️'} ${category}`,
      description: `Browse all ${category.toLowerCase()} items`
    }));

    await sendMessage(phone, {
      type: 'interactive',
      interactive: {
        type: 'list',
        header: { type: 'text', text: 'Food Categories' },
        body: { text: '🍽️ *Choose your favorite category:*' },
        footer: { text: 'Each category has amazing options!' },
        action: {
          button: 'Select Category',
          sections: [{
            title: 'Available Categories',
            rows: rows
          }]
        }
      }
    });
  } catch (error) {
    console.error('Error showing categories:', error);
    await sendMessage(phone, {
      type: 'text',
      text: { body: '❌ Unable to load categories. Please try browsing our catalog directly.' }
    });
  }
}

async function showCategoryProductList(phone: string) {
  try {
    const categories = await getCatalogCategories();
    
    if (!CATALOG_ID || categories.length === 0) {
      await sendMessage(phone, {
        type: 'text',
        text: { body: '❌ Unable to load product categories. Please try again later.' }
      });
      return;
    }

    const productSections = [];

    // Create sections for each category with up to 3 products each
    for (const category of categories.slice(0, 10)) { // Limit to 10 categories max
      const categoryProducts = await getProductsByCategory(category);
      
      if (categoryProducts.length > 0) {
        const categoryEmoji = getCategoryEmoji(category);
        productSections.push({
          title: `${categoryEmoji} ${category}`,
          product_items: categoryProducts.slice(0, 3).map(product => ({
            product_retailer_id: product.id
          }))
        });
      }
    }

    if (productSections.length > 0) {
      await sendMessage(phone, {
        type: 'interactive',
        interactive: {
          type: 'product_list',
          header: { type: 'text', text: 'Our Menu Highlights' },
          body: { text: '✨ *Featured items from each category*' },
          footer: { text: 'Tap any item to add to cart' },
          action: {
            catalog_id: CATALOG_ID,
            sections: productSections
          }
        }
      });
    } else {
      await sendMessage(phone, {
        type: 'text',
        text: { body: '❌ No products available at the moment. Please try again later.' }
      });
    }
  } catch (error) {
    console.error('Error showing category product list:', error);
    await sendMessage(phone, {
      type: 'text',
      text: { body: '❌ Unable to load products. Please try again later.' }
    });
  }
}

async function showPopularItems(phone: string) {
  try {
    const popularProducts = await getPopularProducts();
    
    if (!CATALOG_ID || popularProducts.length === 0) {
      await sendMessage(phone, {
        type: 'text',
        text: { body: '❌ Popular items not available at the moment. Please browse our catalog.' }
      });
      return;
    }

    await sendMessage(phone, {
      type: 'interactive',
      interactive: {
        type: 'product_list',
        header: { type: 'text', text: '⭐ Most Popular' },
        body: { text: '*Customer favorites!* These are our most-ordered items.' },
        footer: { text: 'Tap to add to cart' },
        action: {
          catalog_id: CATALOG_ID,
          sections: [{
            title: 'Popular Items',
            product_items: popularProducts.map(product => ({
              product_retailer_id: product.id
            }))
          }]
        }
      }
    });
  } catch (error) {
    console.error('Error showing popular items:', error);
    await sendMessage(phone, {
      type: 'text',
      text: { body: '❌ Unable to load popular items. Please try again later.' }
    });
  }
}

async function showTextMenu(phone: string) {
  try {
    const products = await fetchCatalogProducts();
    const categories = await getCatalogCategories();
    
    if (products.length === 0) {
      await sendMessage(phone, {
        type: 'text',
        text: { body: '❌ Menu not available at the moment. Please try again later.' }
      });
      return;
    }

    let menuText = '📋 *Our Delicious Menu:*\n\n';
    
    categories.forEach(category => {
      const categoryProducts = products.filter(p => 
        p.category && p.category.toLowerCase() === category.toLowerCase()
      );
      
      if (categoryProducts.length > 0) {
        const emoji = getCategoryEmoji(category);
        menuText += `${emoji} *${category}:*\n`;
        categoryProducts.forEach((product, index) => {
          const price = parseFloat(product.price) || 0;
          menuText += `${index + 1}. ${product.name} - ₹${price}\n`;
        });
        menuText += '\n';
      }
    });
    
    menuText += '💡 *How to order:*\nUse our interactive catalog above for the best experience!';
    
    await sendMessage(phone, { type: 'text', text: { body: menuText } });
  } catch (error) {
    console.error('Error showing text menu:', error);
    await sendMessage(phone, {
      type: 'text',
      text: { body: '❌ Unable to load menu. Please try again later.' }
    });
  }
}

async function showCategoryProducts(phone: string, categoryId: string) {
  try {
    // Convert category ID back to category name
    const categoryName = categoryId.replace('_', ' ');
    const categoryProducts = await getProductsByCategory(categoryName);

    if (categoryProducts.length === 0) {
      await sendMessage(phone, {
        type: 'text',
        text: { body: `❌ No products found in category "${categoryName}". Please try another category.` }
      });
      return;
    }

    if (CATALOG_ID) {
      const emoji = getCategoryEmoji(categoryName);
      await sendMessage(phone, {
        type: 'interactive',
        interactive: {
          type: 'product_list',
          header: { type: 'text', text: `${emoji} ${categoryName}` },
          body: { text: `Browse all ${categoryName.toLowerCase()} items` },
          footer: { text: 'Tap any item to view details' },
          action: {
            catalog_id: CATALOG_ID,
            sections: [{
              title: categoryName,
              product_items: categoryProducts.map(product => ({
                product_retailer_id: product.id
              }))
            }]
          }
        }
      });
    } else {
      const emoji = getCategoryEmoji(categoryName);
      let categoryText = `${emoji} *${categoryName}*\n\n`;
      categoryProducts.forEach((product, index) => {
        const price = parseFloat(product.price) || 0;
        categoryText += `${index + 1}. *${product.name}* - ₹${price}\n`;
        if (product.description) {
          categoryText += `   ${product.description}\n`;
        }
        categoryText += '\n';
      });
      categoryText += 'Browse our catalog for the best experience!';
      
      await sendMessage(phone, { type: 'text', text: { body: categoryText } });
    }
  } catch (error) {
    console.error('Error showing category products:', error);
    await sendMessage(phone, {
      type: 'text',
      text: { body: '❌ Unable to load category products. Please try again later.' }
    });
  }
}

// Enhanced Cart Functions
async function showEnhancedCartSummary(phone: string) {
  const cart = userCarts.get(phone);
  
  console.log(`Showing cart for ${phone}:`, cart);
  console.log(`Cart exists: ${!!cart}, Cart length: ${cart?.length || 0}`);
  
  if (!cart || cart.length === 0) {
    console.log('Cart is empty, showing empty cart message');
    await sendMessage(phone, {
      type: 'text',
      text: { body: '🛒 Your cart is empty!\n\nLet\'s add some delicious items! Use the menu button below to browse our catalog.' }
    });
    
    // Show menu options
    await sendMessage(phone, {
      type: 'interactive',
      interactive: {
        type: 'button',
        body: { text: 'Ready to order?' },
        action: {
          buttons: [
            { type: 'reply', reply: { id: 'browse_catalog', title: '📖 Browse Menu' }},
            { type: 'reply', reply: { id: 'popular_items', title: '⭐ Popular Items' }}
          ]
        }
      }
    });
    return;
  }

  console.log('Cart has items, building summary...');

  let cartText = '🛒 *Your Order Summary:*\n\n';
  let total = 0;

  cart.forEach((item, index) => {
    const itemPrice = parseFloat(item.price.toString()) || 0;
    const itemQuantity = parseInt(item.quantity.toString()) || 0;
    const itemTotal = itemQuantity * itemPrice;
    total += itemTotal;
    
    cartText += `${index + 1}. *${item.name}*\n`;
    cartText += `   ${itemQuantity} × ₹${itemPrice} = ₹${itemTotal}\n\n`;
  });

  const deliveryFee = total > 500 ? 0 : 40;
  const tax = Math.round(total * 0.05); // 5% tax
  const finalTotal = total + deliveryFee + tax;

  cartText += `*Subtotal:* ₹${total}\n`;
  cartText += `*Delivery:* ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}\n`;
  cartText += `*Tax (5%):* ₹${tax}\n`;
  cartText += `━━━━━━━━━━━━━━━━\n`;
  cartText += `*Total: ₹${finalTotal}*`;

  if (deliveryFee === 0) {
    cartText += '\n\n🎉 *Free delivery applied!*';
  } else {
    cartText += `\n\n💡 *Tip:* Add ₹${500 - total} more for free delivery!`;
  }

  console.log('Sending cart summary...');

  await sendMessage(phone, {
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: cartText },
      footer: { text: 'What would you like to do next?' },
      action: {
        buttons: [
          { type: 'reply', reply: { id: 'checkout', title: '✅ Proceed to Pay' }},
          { type: 'reply', reply: { id: 'add_more', title: '➕ Add More Items' }},
          { type: 'reply', reply: { id: 'clear_cart', title: '🗑️ Clear Cart' }}
        ]
      }
    }
  });
}

async function clearCart(phone: string) {
  userCarts.delete(phone);
  
  await sendMessage(phone, {
    type: 'text',
    text: { body: '🗑️ Cart cleared successfully!\n\nReady to start fresh? Let\'s find something delicious!' }
  });
  
  await showMainMenu(phone);
}

// Enhanced Checkout & Payment
async function processCheckout(phone: string) {
  const cart = userCarts.get(phone);
  const customer = customers.get(phone);
  
  if (!cart || cart.length === 0 || !customer) {
    await sendMessage(phone, {
      type: 'text',
      text: { body: '❌ Cart is empty or customer not found. Please try again.' }
    });
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;
  
  // Create order
  const orderId = `ORD${Date.now()}`;
  const order: Order = {
    id: orderId,
    customerId: phone,
    items: [...cart],
    totalAmount: total,
    status: 'pending',
    createdAt: new Date(),
    estimatedDeliveryTime: getEstimatedDeliveryTime(),
    deliveryAddress: customer.addresses[0] || 'Address not specified'
  };
  
  orders.set(orderId, order);

  // Send enhanced order details with WhatsApp Commerce
  await sendOrderDetailsMessage(phone, order, subtotal, deliveryFee, tax);
  
  userStates.set(phone, STATES.PAYMENT);
}

async function sendOrderDetailsMessage(phone: string, order: Order, subtotal: number, deliveryFee: number, tax: number) {
  const customer = customers.get(phone)!;
  
  // First send the order review
  await sendMessage(phone, {
    type: 'interactive',
    interactive: {
      type: 'order_details',
      header: {
        type: 'image',
        image: { link: 'https://placehold.co/600x600/325aa8/ffffff/png?text=Zenocon' }
      },
      body: { 
        text: `🍕 *Order Confirmation*\n\n*Order ID:* ${order.id}\n*Delivery to:* ${order.deliveryAddress}\n*Estimated Time:* ${order.estimatedDeliveryTime}` 
      },
      footer: { text: 'Review your order details below' },
      action: {
        name: 'review_and_pay',
        parameters: {
          reference_id: order.id,
          type: 'digital-goods',
          payment_type: "upi",
          payment_configuration: "Sushant_personal",
          currency: 'INR',
          total_amount: {
            value: Math.round(order.totalAmount * 100),
            offset: 100
          },
          order: {
            status: 'pending',
            items: order.items.map(item => ({
              retailer_id: item.productId,
              name: item.name,
              amount: { value: Math.round(item.price * 100), offset: 100 },
              sale_amount: { value: Math.round(item.price * 100), offset: 100 },
              quantity: item.quantity
            })),
            subtotal: { value: Math.round(subtotal * 100), offset: 100 },
            tax: { value: Math.round(tax * 100), offset: 100, description: 'GST (5%)' },
            shipping: { 
              value: Math.round(deliveryFee * 100), 
              offset: 100, 
              description: deliveryFee === 0 ? 'Free Delivery' : 'Delivery Fee' 
            },
            discount: { value: 0, offset: 100, description: 'No discount applied' }
          }
        }
      }
    }
  });

  // Then send payment options
  setTimeout(() => sendPaymentOptions(phone, order), 2000);
}

async function sendPaymentOptions(phone: string, order: Order) {
  const customer = customers.get(phone)!;
  const loyaltyDiscount = Math.min(customer.loyaltyPoints, Math.floor(order.totalAmount * 0.1));
  
  let paymentText = `💳 *Choose Payment Method*\n\n*Amount to Pay:* ₹${order.totalAmount}`;
  
  if (loyaltyDiscount > 0) {
    paymentText += `\n\n🏆 *Loyalty Points Available:* ${customer.loyaltyPoints}\n💰 *Potential Discount:* ₹${loyaltyDiscount}`;
  }

  await sendMessage(phone, {
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: paymentText },
      footer: { text: 'All payments are secure and encrypted' },
      action: {
        buttons: [
          { type: 'reply', reply: { id: 'pay_upi', title: '📱 UPI Payment' }},
          { type: 'reply', reply: { id: 'pay_card', title: '💳 Card Payment' }},
          { type: 'reply', reply: { id: 'pay_cod', title: '💵 Cash on Delivery' }}
        ]
      }
    }
  });
}

async function processPayment(phone: string, paymentMethod: string) {
  const orderEntries = Array.from(orders.entries());
  const userOrders = orderEntries.filter(([, order]) => order.customerId === phone);
  const latestOrder = userOrders[userOrders.length - 1]?.[1];
  
  if (!latestOrder) {
    await sendMessage(phone, {
      type: 'text',
      text: { body: '❌ Order not found. Please try placing a new order.' }
    });
    return;
  }

  let paymentMessage = '';
  let processingTime = 5000; // 5 seconds default
  
  switch (paymentMethod) {
    case 'pay_upi':
      paymentMessage = `📱 *UPI Payment Processing*\n\n💰 *Amount:* ₹${latestOrder.totalAmount}\n\n🔄 Generating UPI payment link...\n\n*UPI ID:* foodiebot@paytm\n*Or scan QR code above*`;
      processingTime = 3000;
      break;
    case 'pay_card':
      paymentMessage = `💳 *Secure Card Payment*\n\n💰 *Amount:* ₹${latestOrder.totalAmount}\n\n🔐 Redirecting to secure payment gateway...\n\n*Your payment is protected by 256-bit SSL encryption*`;
      processingTime = 4000;
      break;
    case 'pay_cod':
      paymentMessage = `💵 *Cash on Delivery Selected*\n\n💰 *Amount to pay:* ₹${latestOrder.totalAmount}\n\n✅ Order confirmed! Pay cash when your food arrives.\n\n*Please keep exact change ready*`;
      processingTime = 2000;
      break;
  }

  await sendMessage(phone, {
    type: 'text',
    text: { body: paymentMessage }
  });

  // Simulate payment processing
  setTimeout(() => confirmOrder(phone, latestOrder, paymentMethod), processingTime);
}

async function confirmOrder(phone: string, order: Order, paymentMethod: string) {
  const customer = customers.get(phone)!;
  
  // Update order status
  order.status = 'confirmed';
  orders.set(order.id, order);
  
  // Clear cart
  userCarts.delete(phone);
  
  // Award loyalty points
  const pointsEarned = Math.floor(order.totalAmount / 10);
  customer.loyaltyPoints += pointsEarned;
  customers.set(phone, customer);

  const paymentEmoji = paymentMethod === 'pay_upi' ? '📱' : paymentMethod === 'pay_card' ? '💳' : '💵';
  const paymentMethodName = paymentMethod === 'pay_upi' ? 'UPI' : paymentMethod === 'pay_card' ? 'Card' : 'Cash on Delivery';

  const confirmationMsg = `✅ *Order Confirmed Successfully!*

🎉 Thank you, ${customer.name}!

*📋 Order Details:*
• *Order ID:* ${order.id}
• *Amount:* ₹${order.totalAmount}
• *Payment:* ${paymentEmoji} ${paymentMethodName}
• *Delivery Time:* ${order.estimatedDeliveryTime}
• *Address:* ${order.deliveryAddress}

🏆 *Loyalty Points Earned:* +${pointsEarned}
💎 *Total Points:* ${customer.loyaltyPoints}

📱 *What's Next?*
• Track your order in real-time
• We'll send updates as we prepare your food
• Rate your experience after delivery

Enjoy your meal! 🍽️`;

  await sendMessage(phone, {
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: confirmationMsg },
      footer: { text: 'FoodieBot • Your order is our priority!' },
      action: {
        buttons: [
          { type: 'reply', reply: { id: 'track_order', title: '📍 Track Order' }},
          { type: 'reply', reply: { id: 'browse_catalog', title: '🛒 Order Again' }},
          { type: 'reply', reply: { id: 'help', title: '❓ Need Help' }}
        ]
      }
    }
  });
  
  userStates.set(phone, STATES.ORDER_PLACED);

  // Schedule order updates
  scheduleOrderUpdates(phone, order);
}

async function scheduleOrderUpdates(phone: string, order: Order) {
  // Order preparation (5 minutes)
  setTimeout(async () => {
    order.status = 'preparing';
    await sendOrderUpdate(phone, '👨‍🍳 *Order Update*\n\nYour delicious food is being prepared by our expert chefs!\n\n*Estimated time:* 20-25 minutes');
  }, 5 * 60 * 1000);

  // Out for delivery (25 minutes)
  setTimeout(async () => {
    order.status = 'out_for_delivery';
    await sendOrderUpdate(phone, '🛵 *Out for Delivery!*\n\nYour order is on the way! Our delivery partner will be there soon.\n\n*Delivery Partner:* Rahul (+91-98765-43210)\n*ETA:* 10-15 minutes');
  }, 25 * 60 * 1000);

  // Delivered (40 minutes)
  setTimeout(async () => {
    order.status = 'delivered';
    await sendOrderUpdate(phone, '🎉 *Order Delivered Successfully!*\n\nEnjoy your delicious meal!\n\nHow was your experience? We\'d love to hear your feedback!');
    
    // Ask for feedback after delivery
    setTimeout(() => requestFeedback(phone), 10 * 60 * 1000); // 10 minutes after delivery
  }, 40 * 60 * 1000);
}

async function sendOrderUpdate(phone: string, message: string) {
  await sendMessage(phone, {
    type: 'text',
    text: { body: message }
  });
}

async function showOrderTracking(phone: string) {
  const userOrderEntries = Array.from(orders.entries())
    .filter(([, order]) => order.customerId === phone)
    .sort(([, a], [, b]) => b.createdAt.getTime() - a.createdAt.getTime());

  if (userOrderEntries.length === 0) {
    await sendMessage(phone, {
      type: 'text',
      text: { body: '📦 No orders found.\n\nReady to place your first order? Let\'s explore our menu!' }
    });
    await showMainMenu(phone);
    return;
  }

  const latestOrder = userOrderEntries[0][1];
  const statusEmoji = {
    pending: '⏳',
    confirmed: '✅',
    preparing: '👨‍🍳',
    out_for_delivery: '🛵',
    delivered: '🎉',
    cancelled: '❌'
  };

  const trackingMessage = `📍 *Order Tracking*

*Order ID:* ${latestOrder.id}
*Status:* ${statusEmoji[latestOrder.status]} ${latestOrder.status.replace('_', ' ').toUpperCase()}
*Placed:* ${latestOrder.createdAt.toLocaleString()}
*Delivery Address:* ${latestOrder.deliveryAddress}
*Total Amount:* ₹${latestOrder.totalAmount}

*Items Ordered:*
${latestOrder.items.map(item => `• ${item.name} x${item.quantity}`).join('\n')}`;

  await sendMessage(phone, {
    type: 'text',
    text: { body: trackingMessage }
  });
}

// Feedback System
async function requestFeedback(phone: string) {
  await sendMessage(phone, {
    type: 'interactive',
    interactive: {
      type: 'button',
      header: {
        type: 'image',
        image: { link: 'https://placehold.co/600x600/325aa8/ffffff/png?text=Zenocon' }
      },
      body: { 
        text: '⭐ *How was your experience?*\n\nYour feedback helps us serve you better!' 
      },
      footer: { text: 'We value your opinion' },
      action: {
        buttons: [
          { type: 'reply', reply: { id: 'feedback_good', title: '😊 Great Experience' }},
          { type: 'reply', reply: { id: 'feedback_bad', title: '😞 Could be Better' }},
          { type: 'reply', reply: { id: 'feedback_later', title: '⏰ Maybe Later' }}
        ]
      }
    }
  });

  userStates.set(phone, STATES.FEEDBACK);
}

async function handlePositiveFeedback(phone: string) {
  const customer = customers.get(phone)!;
  
  // Bonus points for feedback
  customer.loyaltyPoints += 50;
  customers.set(phone, customer);

  await sendMessage(phone, {
    type: 'text',
    text: { 
      body: `🎉 *Thank you for the wonderful feedback!*

We're delighted that you enjoyed your experience, ${customer.name}!

🏆 *Bonus:* +50 loyalty points for your feedback
💎 *Total Points:* ${customer.loyaltyPoints}

Share FoodieBot with friends and earn more rewards! 🎁` 
    }
  });

  // Send promotional offer
  setTimeout(() => sendPersonalizedOffer(phone), 24 * 60 * 60 * 1000); // Next day
}

async function handleNegativeFeedback(phone: string) {
  await sendMessage(phone, {
    type: 'text',
    text: { 
      body: `😔 *We're sorry to hear that!*

Your feedback is valuable to us. Please tell us what went wrong so we can improve:

• Food quality issue?
• Delivery problem?
• App/service issue?
• Other concern?

Type your feedback below, and our team will address it promptly.` 
    }
  });

  userStates.set(phone, STATES.FEEDBACK);
}

async function handleFeedback(phone: string, feedbackText: string) {
  const customer = customers.get(phone)!;
  
  // Store feedback (in production, save to database)
  console.log(`Feedback from ${customer.name} (${phone}): ${feedbackText}`);
  
  await sendMessage(phone, {
    type: 'text',
    text: { 
      body: `📝 *Feedback Received*

Thank you for sharing your thoughts, ${customer.name}!

Our customer service team will review your feedback and get back to you within 24 hours if needed.

🏆 *Bonus:* +25 loyalty points for helping us improve
💎 *Total Points:* ${customer.loyaltyPoints + 25}

Is there anything else I can help you with today?` 
    }
  });

  customer.loyaltyPoints += 25;
  customers.set(phone, customer);
  
  await showMainMenu(phone);
}

// Utility Functions
async function sendWelcomePrompt(phone: string) {
  await sendMessage(phone, {
    type: 'interactive',
    interactive: {
      type: 'button',
      header: {
        type: 'image',
        image: { link: 'https://placehold.co/600x600/325aa8/ffffff/png?text=Zenocon' }
      },
      body: { 
        text: '👋 *Welcome to FoodieBot!*\n\nYour personal food ordering assistant is here to serve you delicious meals right to your doorstep!' 
      },
      footer: { text: 'Get started in seconds!' },
      action: {
        buttons: [
          { type: 'reply', reply: { id: 'start_ordering', title: '🍕 Start Ordering' }},
          { type: 'reply', reply: { id: 'help', title: '❓ How it Works' }}
        ]
      }
    }
  });
}

async function sendHelpMessage(phone: string) {
  const helpText = `❓ *FoodieBot Help Center*

*🍕 How to Order:*
1️⃣ Browse our menu catalog
2️⃣ Add items to your cart
3️⃣ Proceed to checkout
4️⃣ Choose payment method
5️⃣ Track your order in real-time

*💡 Quick Commands:*
• "menu" - Browse our catalog
• "cart" - View your cart
• "track" - Track latest order
• "help" - Show this help

*🏆 Loyalty Program:*
• Earn points on every order
• Get bonus points for feedback
• Redeem points for discounts

*📞 Need Human Help?*
Contact our support team at:
📱 WhatsApp: +91-98765-43210
📧 Email: support@foodiebot.com

*🕒 Operating Hours:*
Monday - Sunday: 8:00 AM - 11:00 PM`;

  await sendMessage(phone, {
    type: 'text',
    text: { body: helpText }
  });

  await sendMessage(phone, {
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: 'What would you like to do next?' },
      action: {
        buttons: [
          { type: 'reply', reply: { id: 'browse_catalog', title: '🛒 Browse Menu' }},
          { type: 'reply', reply: { id: 'view_cart', title: '🛍️ View Cart' }},
          { type: 'reply', reply: { id: 'track_order', title: '📍 Track Order' }}
        ]
      }
    }
  });
}

async function handleBrowsingCommands(phone: string, text: string) {
  if (text.includes('cart')) {
    await showEnhancedCartSummary(phone);
  } else if (text.includes('menu') || text.includes('catalog')) {
    await showCatalogMessage(phone);
  } else if (text.includes('popular')) {
    await showPopularItems(phone);
  } else if (text.includes('track')) {
    await showOrderTracking(phone);
  } else if (text.includes('help')) {
    await sendHelpMessage(phone);
  } else {
    // Try to parse as item numbers
    await handleMenuSelection(phone, text);
  }
}

async function handleCartCommands(phone: string, text: string) {
  if (text.includes('checkout') || text === '1') {
    await processCheckout(phone);
  } else if (text.includes('add') || text === '2') {
    await showCatalogMessage(phone);
    userStates.set(phone, STATES.BROWSING);
  } else if (text.includes('clear') || text === '3') {
    await clearCart(phone);
  } else {
    await showEnhancedCartSummary(phone);
  }
}

async function handleMenuSelection(phone: string, text: string) {
  await sendMessage(phone, {
    type: 'text',
    text: { body: '💡 *For the best experience, please use our interactive catalog above!*\n\nYou can browse products, see images, read descriptions, and add items directly to your cart with just a tap!' }
  });
  
  // Show catalog again
  await showCatalogMessage(phone);
}

// Utility function to get emoji for category
function getCategoryEmoji(category: string): string {
  const categoryEmojis: { [key: string]: string } = {
    'pizza': '🍕',
    'burger': '🍔', 
    'burgers': '🍔',
    'pasta': '🍝',
    'salad': '🥗',
    'salads': '🥗',
    'dessert': '🍰',
    'desserts': '🍰',
    'drinks': '🥤',
    'beverages': '🥤',
    'appetizers': '🥨',
    'mains': '🍽️',
    'sides': '🍟',
    'chicken': '🍗',
    'seafood': '🦐',
    'vegetarian': '🥬',
    'vegan': '🌱',
    'sandwiches': '🥪',
    'wraps': '🌯',
    'soup': '🍲',
    'soups': '🍲'
  };
  
  return categoryEmojis[category.toLowerCase()] || '🍽️';
}

async function handleMessageStatuses(statuses: any[]) {
  statuses.forEach(status => {
    console.log(`Message ${status.id} status: ${status.status}`);
    // Handle message delivery confirmations, read receipts, etc.
  });
}

async function sendPersonalizedOffer(phone: string) {
  const customer = customers.get(phone);
  if (!customer) return;

  await sendMessage(phone, {
    type: 'interactive',
    interactive: {
      type: 'button',
      header: {
        type: 'image',
        image: { link: 'https://placehold.co/600x600/325aa8/ffffff/png?text=Zenocon' }
      },
      body: { 
        text: `🎁 *Special Offer Just for You!*

Hey ${customer.name}! 

We miss you! Here's an exclusive 20% discount on your next order.

*Offer Code:* WELCOME20
*Valid until:* ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
*Minimum order:* ₹299

Ready to order something delicious? 🍕` 
      },
      footer: { text: 'Limited time offer!' },
      action: {
        buttons: [
          { type: 'reply', reply: { id: 'browse_catalog', title: '🛒 Order Now' }},
          { type: 'reply', reply: { id: 'popular_items', title: '⭐ Popular Items' }}
        ]
      }
    }
  });
}

function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getEstimatedDeliveryTime(): string {
  const now = new Date();
  const deliveryTime = new Date(now.getTime() + 45 * 60 * 1000); // 45 minutes
  return deliveryTime.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
}

// Utility function to send WhatsApp messages
async function sendMessage(to: string, messageData: MessageData) {
  try {
    const response = await fetch(`https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        ...messageData
      })
    });

    const result = await response.json();
    console.log('Message sent successfully:', result);
    
    if (!response.ok) {
      throw new Error(`WhatsApp API error: ${JSON.stringify(result)}`);
    }
    
    return result;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}