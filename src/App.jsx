import { useMemo, useState } from "react";

// ---------------- PRODUCTS ----------------

const initialProducts = [
  { id: 1, name: "Aata (आटा)", category: "Daily Use", price: 45, unit: "kg", emoji: "🌾" },
  { id: 2, name: "Rice (चावल)", category: "Daily Use", price: 60, unit: "kg", emoji: "🍚" },
  { id: 3, name: "Sugar (चीनी)", category: "Daily Use", price: 44, unit: "kg", emoji: "🧂" },
  { id: 4, name: "Toor Dal (अरहर दाल)", category: "Pulses", price: 130, unit: "kg", emoji: "🫘" },
  { id: 5, name: "Moong Dal (मूंग दाल)", category: "Pulses", price: 115, unit: "kg", emoji: "🫘" },
  { id: 6, name: "Potato (आलू)", category: "Vegetables", price: 30, unit: "kg", emoji: "🥔" },
  { id: 7, name: "Tomato (टमाटर)", category: "Vegetables", price: 40, unit: "kg", emoji: "🍅" },
  { id: 8, name: "Onion (प्याज)", category: "Vegetables", price: 35, unit: "kg", emoji: "🧅" },
  { id: 9, name: "Apple (सेब)", category: "Fruits", price: 160, unit: "kg", emoji: "🍎" },
  { id: 10, name: "Banana (केला)", category: "Fruits", price: 60, unit: "dozen", emoji: "🍌" },
  { id: 11, name: "Namkeen", category: "Snacks", price: 20, unit: "packet", emoji: "🥨" },
  { id: 12, name: "Biscuits", category: "Snacks", price: 10, unit: "packet", emoji: "🍪" },
  { id: 13, name: "Chana Dal (चना दाल)", category: "Pulses", price: 85, unit: "kg", emoji: "🫘" },
  { id: 14, name: "Masoor Dal (मसूर दाल)", category: "Pulses", price: 95, unit: "kg", emoji: "🫘" },
  { id: 15, name: "Urad Dal (उड़द दाल)", category: "Pulses", price: 120, unit: "kg", emoji: "🫘" },
  { id: 16, name: "Besan (बेसन)", category: "Daily Use", price: 80, unit: "kg", emoji: "🌾" },
  { id: 17, name: "Maida (मैदा)", category: "Daily Use", price: 38, unit: "kg", emoji: "🌾" },
  { id: 18, name: "Salt (नमक)", category: "Daily Use", price: 22, unit: "kg", emoji: "🧂" },
  { id: 19, name: "Mustard Oil (सरसों तेल)", category: "Daily Use", price: 150, unit: "litre", emoji: "🫗" },
  { id: 20, name: "Cooking Oil (रिफाइंड तेल)", category: "Daily Use", price: 140, unit: "litre", emoji: "🫗" },
  { id: 21, name: "Green Chilli (हरी मिर्च)", category: "Vegetables", price: 60, unit: "kg", emoji: "🌶️" },
  { id: 22, name: "Ginger (अदरक)", category: "Vegetables", price: 100, unit: "kg", emoji: "🫚" },
  { id: 23, name: "Orange (संतरा)", category: "Fruits", price: 80, unit: "kg", emoji: "🍊" },
  { id: 24, name: "Grapes (अंगूर)", category: "Fruits", price: 100, unit: "kg", emoji: "🍇" },
  { id: 25, name: "Chips", category: "Snacks", price: 10, unit: "packet", emoji: "🥔" },
  { id: 26, name: "Noodles", category: "Snacks", price: 15, unit: "packet", emoji: "🍜" },
];

const categories = [
  "All",
  "Daily Use",
  "Pulses",
  "Vegetables",
  "Fruits",
  "Snacks",
  "Custom",
];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

// ---------------- AUTH COMPONENT ----------------

function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setMessage("");
    setBusy(true);

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Server ka response valid JSON nahi hai. HTTP status: ${response.status}`
        );
      }

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      if (mode === "register") {
        setMessage(data.message || "Registration successful!");
        setPassword("");
        setMode("login");
      } else {
        if (!data.user) {
          throw new Error("Login response mein user data nahi mila.");
        }

        onLogin(data.user);
      }
    } catch (error) {
      console.error("Login/Register error:", error);
      setMessage(error.message || "Server se connection nahi hua.");
    } finally {
      setBusy(false);
    }
  }

  function switchMode() {
    setMode((current) =>
      current === "login" ? "register" : "login"
    );
    setMessage("");
    setPassword("");
  }

  return (
    <main className="auth-page">
      <div className="auth-art">
        <div className="brand-mark">🛒</div>

        <p className="eyebrow">YOUR STORE, SIMPLIFIED</p>

        <h1>
          Har bill mein
          <br />
          <span>smartness.</span>
        </h1>

        <p className="muted-light">
          Fast billing. Simple stock selection.
          A better kirana counter.
        </p>

        <div className="art-stats">
          <span>✓ Quick checkout</span>
          <span>✓ Hindi + English</span>
        </div>
      </div>

      <form className="auth-card" onSubmit={submit}>
        <div className="mini-brand">
          SMART <b>KIRANA</b>
        </div>

        <p className="eyebrow green">
          {mode === "login" ? "WELCOME BACK" : "GET STARTED"}
        </p>

        <h2>
          {mode === "login"
            ? "Login to your store"
            : "Create your account"}
        </h2>

        <p className="subtext">
          Apne kirana billing dashboard ko open karein.
        </p>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. shopowner"
          minLength={3}
          maxLength={40}
          required
          autoComplete="username"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          minLength={mode === "register" ? 8 : 1}
          maxLength={72}
          required
          autoComplete={
            mode === "login" ? "current-password" : "new-password"
          }
        />

        {message && (
          <div className="notice" role="status">
            {message}
          </div>
        )}

        <button className="primary full" disabled={busy}>
          {busy
            ? "Please wait..."
            : mode === "login"
              ? "Login →"
              : "Create account →"}
        </button>

        <p className="switch-auth">
          {mode === "login"
            ? "New to Smart Kirana?"
            : "Already have an account?"}{" "}

          <button
            type="button"
            className="text-button"
            onClick={switchMode}
            disabled={busy}
          >
            {mode === "login" ? "Register" : "Login"}
          </button>
        </p>

        <p className="tiny-note">
          Apna password kisi ke saath share na karein.
        </p>
      </form>
    </main>
  );
}

// ---------------- MAIN APP ----------------

function App() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState("0");
  const [saleMessage, setSaleMessage] = useState("");
  const [customName, setCustomName] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  const [weighProduct, setWeighProduct] = useState(null);
  const [weighMode, setWeighMode] = useState("grams");
  const [weighInput, setWeighInput] = useState("250");

  const filtered = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return products.filter(
      (product) =>
        (category === "All" || product.category === category) &&
        product.name.toLowerCase().includes(searchText)
    );
  }, [products, category, search]);

  const itemTotal = (item) =>
    item.isWeighted
      ? (item.price * item.qty) / 1000
      : item.price * item.qty;

  const displayQty = (item) =>
    item.isWeighted
      ? `${item.qty} g`
      : `${item.qty} ${
          item.unit === "unit" ? "pcs" : item.unit
        }`;

  const subtotal = cart.reduce(
    (sum, item) => sum + itemTotal(item),
    0
  );

  const discountValue = Math.min(
    subtotal,
    Math.max(0, Number(discount) || 0)
  );

  const total = Math.max(0, subtotal - discountValue);

  const enteredValue = Number(weighInput);

  const previewGrams =
    weighProduct && enteredValue > 0
      ? weighMode === "grams"
        ? enteredValue
        : (enteredValue / weighProduct.price) * 1000
      : 0;

  const previewPrice =
    weighProduct && enteredValue > 0
      ? weighMode === "grams"
        ? (enteredValue / 1000) * weighProduct.price
        : enteredValue
      : 0;

  function addToCart(product) {
    setSaleMessage("");

    if (product.unit === "kg") {
      setWeighProduct(product);
      setWeighMode("grams");
      setWeighInput("250");
      return;
    }

    setCart((old) => {
      const found = old.find(
        (item) => item.id === product.id && !item.isWeighted
      );

      if (found) {
        return old.map((item) =>
          item.id === product.id && !item.isWeighted
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [
        ...old,
        {
          ...product,
          cartId: `${product.id}-${Date.now()}-${Math.random()}`,
          qty: 1,
        },
      ];
    });
  }

  function addWeightedToCart(e) {
    e.preventDefault();

    if (!weighProduct) return;

    const entered = Number(weighInput);

    if (!Number.isFinite(entered) || entered <= 0) return;

    const grams =
      weighMode === "grams"
        ? entered
        : (entered / weighProduct.price) * 1000;

    if (!Number.isFinite(grams) || grams <= 0) return;

    setCart((old) => [
      ...old,
      {
        ...weighProduct,
        cartId: `${weighProduct.id}-${Date.now()}-${Math.random()}`,
        qty: Math.round(grams * 100) / 100,
        isWeighted: true,
      },
    ]);

    setSaleMessage("");
    setWeighProduct(null);
    setWeighInput("250");
  }

  function changeQty(cartId, qty) {
    setCart((old) =>
      qty <= 0
        ? old.filter((item) => item.cartId !== cartId)
        : old.map((item) =>
            item.cartId === cartId
              ? {
                  ...item,
                  qty: Math.min(
                    item.isWeighted ? 100000 : 999,
                    qty
                  ),
                }
              : item
          )
    );
  }

  function addCustom(e) {
    e.preventDefault();

    const price = Number(customPrice);

    if (
      !customName.trim() ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      return;
    }

    const product = {
      id: Date.now(),
      name: customName.trim(),
      category: "Custom",
      price,
      unit: "unit",
      emoji: "📦",
    };

    setProducts((old) => [...old, product]);

    setCart((old) => [
      ...old,
      {
        ...product,
        cartId: `${product.id}-${Date.now()}-${Math.random()}`,
        qty: 1,
      },
    ]);

    setCustomName("");
    setCustomPrice("");
    setShowCustom(false);
  }

  function checkout() {
    if (!cart.length) return;

    const lines = cart
      .map(
        (item) =>
          `${item.name} | Qty: ${displayQty(item)} | ${money(
            itemTotal(item)
          )}`
      )
      .join("\n");

    const receipt = `SMART KIRANA
Cash Memo
${new Date().toLocaleString("en-IN")}

Customer: ${user.username}

${lines}

Subtotal: ${money(subtotal)}
Discount: ${money(discountValue)}
TOTAL: ${money(total)}

Thank you!`;

    const blob = new Blob([receipt], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `smart-kirana-bill-${Date.now()}.txt`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    setSaleMessage("Bill download ho gaya!");
  }

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="mini-brand">
          <span className="brand-icon">🛒</span> SMART <b>KIRANA</b>
        </div>

        <div className="top-actions">
          <span className="online-dot">●</span>
          <span className="welcome">Hi, {user.username}</span>

          <button
            className="logout"
            onClick={() => {
              setUser(null);
              setCart([]);
            }}
          >
            Log out
          </button>
        </div>
      </header>

      <main className="dashboard">
        <section className="page-heading">
          <div>
            <p className="eyebrow green">STORE OVERVIEW</p>

            <h1>
              Billing <span>dashboard</span>
            </h1>

            <p className="subtext">
              Product select karo, quantity daalo aur bill banao.
            </p>
          </div>

          <button
            type="button"
            className="secondary"
            onClick={() => setShowCustom((value) => !value)}
          >
            ＋ Add custom item
          </button>
        </section>

        {showCustom && (
          <form className="custom-form" onSubmit={addCustom}>
            <input
              placeholder="Item name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              required
            />

            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Price ₹"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              required
            />

            <button className="primary" type="submit">
              Add item
            </button>
          </form>
        )}

        {weighProduct && (
          <div className="weigh-overlay">
            <form
              className="weigh-card"
              onSubmit={addWeightedToCart}
            >
              <p className="eyebrow green">WEIGHT &amp; PRICE</p>

              <h2>
                {weighProduct.emoji} {weighProduct.name}
              </h2>

              <p className="subtext">
                Rate: {money(weighProduct.price)} per kg
              </p>

              <label htmlFor="weigh-mode">
                Quantity kis tarah daalni hai?
              </label>

              <select
                id="weigh-mode"
                value={weighMode}
                onChange={(e) => {
                  const value = e.target.value;

                  setWeighMode(value);
                  setWeighInput(value === "grams" ? "250" : "10");
                }}
              >
                <option value="grams">Gram mein</option>
                <option value="rupees">Rupees mein</option>
              </select>

              <label htmlFor="weigh-input">
                {weighMode === "grams"
                  ? "Kitne gram?"
                  : "Kitne rupaye?"}
              </label>

              <input
                id="weigh-input"
                type="number"
                min="0.01"
                step="any"
                value={weighInput}
                onChange={(e) => setWeighInput(e.target.value)}
                required
                autoFocus
              />

              <div className="weigh-preview">
                <span>Approx. weight</span>

                <b>
                  {previewGrams > 0
                    ? `${previewGrams.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })} g`
                    : "—"}
                </b>

                <span>Total price</span>

                <b>
                  {previewPrice > 0 ? money(previewPrice) : "—"}
                </b>
              </div>

              <div className="weigh-actions">
                <button
                  type="button"
                  className="clear-cart"
                  onClick={() => setWeighProduct(null)}
                >
                  Cancel
                </button>

                <button className="primary" type="submit">
                  Add to bill
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="summary-grid">
          <div className="summary-card">
            <span className="summary-icon green-bg">🧺</span>
            <div>
              <p>Cart lines</p>
              <strong>{cart.length}</strong>
            </div>
          </div>

          <div className="summary-card">
            <span className="summary-icon amber-bg">₹</span>
            <div>
              <p>Subtotal</p>
              <strong>{money(subtotal)}</strong>
            </div>
          </div>

          <div className="summary-card">
            <span className="summary-icon blue-bg">🧾</span>
            <div>
              <p>Final total</p>
              <strong>{money(total)}</strong>
            </div>
          </div>
        </div>

        <div className="workspace">
          <section className="catalog panel">
            <div className="panel-heading">
              <div>
                <h2>Products</h2>
                <p className="subtext">
                  Product select karke bill mein add karo
                </p>
              </div>

              <span className="count-pill">
                {filtered.length} items
              </span>
            </div>

            <div className="search-wrap">
              <span>⌕</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search item / product..."
              />
            </div>

            <div className="category-row">
              {categories.map((itemCategory) => (
                <button
                  type="button"
                  key={itemCategory}
                  className={`category-chip ${
                    category === itemCategory ? "active" : ""
                  }`}
                  onClick={() => setCategory(itemCategory)}
                >
                  {itemCategory}
                </button>
              ))}
            </div>

            <div className="product-grid">
              {filtered.map((p) => (
                <button
                  type="button"
                  className="product-card"
                  key={p.id}
                  onClick={() => addToCart(p)}
                >
                  <span className="product-emoji">{p.emoji}</span>
                  <span className="product-name">{p.name}</span>
                  <span className="product-category">
                    {p.category}
                  </span>

                  <span className="product-bottom">
                    <b>{money(p.price)}</b>
                    <span className="add-plus">+</span>
                  </span>

                  <small>per {p.unit}</small>
                </button>
              ))}
            </div>

            {!filtered.length && (
              <div className="empty-state">
                Koi product nahi mila. Search badal kar dekho.
              </div>
            )}
          </section>

          <aside className="cart-panel panel">
            <div className="panel-heading">
              <div>
                <h2>Current bill</h2>
                <p className="subtext">Cash memo preview</p>
              </div>

              <span className="cart-bag">🛍️</span>
            </div>

            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-item" key={item.cartId}>
                  <div className="cart-item-emoji">{item.emoji}</div>

                  <div className="cart-item-info">
                    <b>{item.name}</b>

                    <small>
                      {item.isWeighted
                        ? `${money(item.price)} / kg`
                        : `${money(item.price)} / ${item.unit}`}
                    </small>

                    <div className="qty-control">
                      <button
                        type="button"
                        onClick={() =>
                          changeQty(
                            item.cartId,
                            item.qty - (item.isWeighted ? 50 : 1)
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span>{displayQty(item)}</span>

                      <button
                        type="button"
                        onClick={() =>
                          changeQty(
                            item.cartId,
                            item.qty + (item.isWeighted ? 50 : 1)
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <strong>{money(itemTotal(item))}</strong>

                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => changeQty(item.cartId, 0)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}

              {!cart.length && (
                <div className="cart-empty">
                  <span>🛒</span>
                  <b>Your bill is empty</b>
                  <p>Products par click karke add karo.</p>
                </div>
              )}
            </div>

            <div className="bill-totals">
              <div>
                <span>Subtotal</span>
                <b>{money(subtotal)}</b>
              </div>

              <label className="discount-field">
                <span>Discount (₹)</span>
                <input
                  type="number"
                  min="0"
                  max={subtotal}
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </label>

              <div>
                <span>Discount applied</span>
                <b className="discount-text">
                  − {money(discountValue)}
                </b>
              </div>

              <div className="grand-total">
                <span>Total payable</span>
                <strong>{money(total)}</strong>
              </div>
            </div>

            {saleMessage && (
              <div className="notice" role="status">
                {saleMessage}
              </div>
            )}

            <button
              type="button"
              className="primary checkout"
              disabled={!cart.length}
              onClick={checkout}
            >
              Download bill ↓
            </button>

            <button
              type="button"
              className="clear-cart"
              disabled={!cart.length}
              onClick={() => {
                setCart([]);
                setDiscount("0");
                setSaleMessage("");
              }}
            >
              Clear bill
            </button>

            <p className="tiny-note">
              Demo: products aur cart browser session mein hain.
              Sales MongoDB mein save nahi hoti.
            </p>
          </aside>
        </div>

        <style>{`
          .weigh-overlay {
            position: fixed;
            inset: 0;
            z-index: 1000;
            background: rgba(12, 20, 16, .62);
            display: grid;
            place-items: center;
            padding: 18px;
          }

          .weigh-card {
            width: min(100%, 430px);
            background: #fff;
            color: #17231c;
            border-radius: 22px;
            padding: 24px;
            box-shadow: 0 24px 80px rgba(0,0,0,.25);
            display: grid;
            gap: 12px;
          }

          .weigh-card h2 {
            margin: 0;
          }

          .weigh-card label {
            font-weight: 600;
            font-size: 14px;
          }

          .weigh-card input,
          .weigh-card select {
            width: 100%;
            padding: 12px;
            border: 1px solid #d6dfd9;
            border-radius: 10px;
            font: inherit;
            background: white;
            color: #17231c;
          }

          .weigh-preview {
            background: #f1f8f3;
            border-radius: 14px;
            padding: 14px;
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 8px;
            align-items: center;
          }

          .weigh-preview b {
            text-align: right;
          }

          .weigh-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 4px;
          }
        `}</style>

        <footer>
          Smart Kirana <span>•</span> Simple billing for everyday business
        </footer>
      </main>
    </div>
  );
}

export default App;