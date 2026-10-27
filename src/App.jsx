import { useEffect, useMemo, useState } from "react";
import "./styles.css";

/* =============== PRODUCT CATALOGUE =============== */

const initialProducts = [
  { id: "rice", name: "Rice / Chawal", emoji: "🍚", category: "Grocery", price: 60, unit: "kg" },
  { id: "basmati", name: "Basmati Rice", emoji: "🍚", category: "Grocery", price: 110, unit: "kg" },
  { id: "atta", name: "Wheat Atta", emoji: "🌾", category: "Grocery", price: 40, unit: "kg" },
  { id: "maida", name: "Maida", emoji: "🥣", category: "Grocery", price: 38, unit: "kg" },
  { id: "besan", name: "Besan", emoji: "🥣", category: "Grocery", price: 90, unit: "kg" },
  { id: "suji", name: "Suji / Rawa", emoji: "🥣", category: "Grocery", price: 42, unit: "kg" },
  { id: "poha", name: "Poha", emoji: "🍚", category: "Grocery", price: 48, unit: "kg" },
  { id: "sugar", name: "Sugar / Chini", emoji: "🍬", category: "Grocery", price: 45, unit: "kg" },
  { id: "salt", name: "Salt / Namak", emoji: "🧂", category: "Grocery", price: 22, unit: "packet" },
  { id: "jaggery", name: "Gud", emoji: "🟤", category: "Grocery", price: 65, unit: "kg" },
  { id: "dalia", name: "Dalia", emoji: "🌾", category: "Grocery", price: 55, unit: "kg" },
  { id: "sabudana", name: "Sabudana", emoji: "⚪", category: "Grocery", price: 95, unit: "kg" },

  { id: "arhar", name: "Arhar Dal", emoji: "🟡", category: "Pulses", price: 140, unit: "kg" },
  { id: "moong", name: "Moong Dal", emoji: "🟢", category: "Pulses", price: 120, unit: "kg" },
  { id: "masoor", name: "Masoor Dal", emoji: "🟠", category: "Pulses", price: 95, unit: "kg" },
  { id: "chana-dal", name: "Chana Dal", emoji: "🟡", category: "Pulses", price: 85, unit: "kg" },
  { id: "urad", name: "Urad Dal", emoji: "⚫", category: "Pulses", price: 125, unit: "kg" },
  { id: "rajma", name: "Rajma", emoji: "🫘", category: "Pulses", price: 140, unit: "kg" },
  { id: "chole", name: "Kabuli Chana", emoji: "🫘", category: "Pulses", price: 105, unit: "kg" },
  { id: "kala-chana", name: "Kala Chana", emoji: "🫘", category: "Pulses", price: 80, unit: "kg" },

  { id: "mustard-oil", name: "Mustard Oil", emoji: "🫗", category: "Oil & Spices", price: 155, unit: "litre" },
  { id: "refined-oil", name: "Refined Oil", emoji: "🫗", category: "Oil & Spices", price: 135, unit: "litre" },
  { id: "ghee", name: "Desi Ghee", emoji: "🧈", category: "Oil & Spices", price: 620, unit: "kg" },
  { id: "haldi", name: "Haldi Powder", emoji: "🟡", category: "Oil & Spices", price: 220, unit: "kg" },
  { id: "mirch", name: "Red Chilli Powder", emoji: "🌶️", category: "Oil & Spices", price: 280, unit: "kg" },
  { id: "dhaniya", name: "Dhaniya Powder", emoji: "🌿", category: "Oil & Spices", price: 180, unit: "kg" },
  { id: "jeera", name: "Jeera", emoji: "🌱", category: "Oil & Spices", price: 420, unit: "kg" },
  { id: "rai", name: "Rai / Sarson", emoji: "🌱", category: "Oil & Spices", price: 90, unit: "kg" },
  { id: "hing", name: "Hing", emoji: "🧂", category: "Oil & Spices", price: 30, unit: "packet" },
  { id: "garam-masala", name: "Garam Masala", emoji: "🥘", category: "Oil & Spices", price: 40, unit: "packet" },

  { id: "potato", name: "Potato / Aloo", emoji: "🥔", category: "Vegetables", price: 30, unit: "kg" },
  { id: "onion", name: "Onion / Pyaz", emoji: "🧅", category: "Vegetables", price: 35, unit: "kg" },
  { id: "tomato", name: "Tomato / Tamatar", emoji: "🍅", category: "Vegetables", price: 40, unit: "kg" },
  { id: "cauliflower", name: "Gobhi", emoji: "🥦", category: "Vegetables", price: 45, unit: "kg" },
  { id: "cabbage", name: "Patta Gobhi", emoji: "🥬", category: "Vegetables", price: 30, unit: "kg" },
  { id: "brinjal", name: "Baingan", emoji: "🍆", category: "Vegetables", price: 40, unit: "kg" },
  { id: "bhindi", name: "Bhindi", emoji: "🌿", category: "Vegetables", price: 50, unit: "kg" },
  { id: "peas", name: "Green Peas / Matar", emoji: "🟢", category: "Vegetables", price: 70, unit: "kg" },
  { id: "carrot", name: "Gajar", emoji: "🥕", category: "Vegetables", price: 40, unit: "kg" },
  { id: "cucumber", name: "Kheera", emoji: "🥒", category: "Vegetables", price: 35, unit: "kg" },
  { id: "capsicum", name: "Shimla Mirch", emoji: "🫑", category: "Vegetables", price: 60, unit: "kg" },
  { id: "spinach", name: "Palak", emoji: "🥬", category: "Vegetables", price: 25, unit: "bunch" },
  { id: "garlic", name: "Lahsun", emoji: "🧄", category: "Vegetables", price: 160, unit: "kg" },
  { id: "ginger", name: "Adrak", emoji: "🫚", category: "Vegetables", price: 100, unit: "kg" },
  { id: "green-chilli", name: "Green Chilli", emoji: "🌶️", category: "Vegetables", price: 60, unit: "kg" },
  { id: "lemon", name: "Nimbu", emoji: "🍋", category: "Vegetables", price: 5, unit: "pcs" },

  { id: "banana", name: "Banana / Kela", emoji: "🍌", category: "Fruits", price: 60, unit: "dozen" },
  { id: "apple", name: "Apple / Seb", emoji: "🍎", category: "Fruits", price: 160, unit: "kg" },
  { id: "mango", name: "Mango / Aam", emoji: "🥭", category: "Fruits", price: 100, unit: "kg" },
  { id: "orange", name: "Orange / Santra", emoji: "🍊", category: "Fruits", price: 80, unit: "kg" },
  { id: "grapes", name: "Grapes / Angoor", emoji: "🍇", category: "Fruits", price: 100, unit: "kg" },
  { id: "papaya", name: "Papita", emoji: "🍈", category: "Fruits", price: 45, unit: "kg" },
  { id: "guava", name: "Amrood", emoji: "🍐", category: "Fruits", price: 60, unit: "kg" },
  { id: "watermelon", name: "Tarbooz", emoji: "🍉", category: "Fruits", price: 30, unit: "kg" },

  { id: "biscuit", name: "Biscuits", emoji: "🍪", category: "Snacks & Namkeen", price: 10, unit: "packet" },
  { id: "chips", name: "Potato Chips", emoji: "🥔", category: "Snacks & Namkeen", price: 20, unit: "packet" },
  { id: "namkeen", name: "Namkeen", emoji: "🥨", category: "Snacks & Namkeen", price: 30, unit: "packet" },
  { id: "bhujia", name: "Bhujia Sev", emoji: "🥨", category: "Snacks & Namkeen", price: 25, unit: "packet" },
  { id: "mixture", name: "Mixture", emoji: "🥜", category: "Snacks & Namkeen", price: 30, unit: "packet" },
  { id: "popcorn", name: "Popcorn", emoji: "🍿", category: "Snacks & Namkeen", price: 20, unit: "packet" },
  { id: "noodles", name: "Instant Noodles", emoji: "🍜", category: "Snacks & Namkeen", price: 15, unit: "packet" },
  { id: "chocolate", name: "Chocolate", emoji: "🍫", category: "Snacks & Namkeen", price: 20, unit: "pcs" },
  { id: "toffee", name: "Toffee", emoji: "🍬", category: "Snacks & Namkeen", price: 1, unit: "pcs" },
  { id: "rusk", name: "Rusk / Toast", emoji: "🍞", category: "Snacks & Namkeen", price: 30, unit: "packet" },

  { id: "milk", name: "Milk", emoji: "🥛", category: "Dairy & Drinks", price: 30, unit: "litre" },
  { id: "curd", name: "Dahi", emoji: "🥣", category: "Dairy & Drinks", price: 60, unit: "kg" },
  { id: "paneer", name: "Paneer", emoji: "🧀", category: "Dairy & Drinks", price: 360, unit: "kg" },
  { id: "butter", name: "Butter", emoji: "🧈", category: "Dairy & Drinks", price: 60, unit: "packet" },
  { id: "tea", name: "Tea / Chai Patti", emoji: "🍵", category: "Dairy & Drinks", price: 180, unit: "packet" },
  { id: "coffee", name: "Coffee", emoji: "☕", category: "Dairy & Drinks", price: 120, unit: "packet" },
  { id: "cold-drink", name: "Cold Drink", emoji: "🥤", category: "Dairy & Drinks", price: 40, unit: "bottle" },
  { id: "water", name: "Drinking Water", emoji: "💧", category: "Dairy & Drinks", price: 20, unit: "bottle" },

  { id: "soap", name: "Bathing Soap", emoji: "🧼", category: "Household", price: 35, unit: "pcs" },
  { id: "detergent", name: "Washing Powder", emoji: "🫧", category: "Household", price: 60, unit: "packet" },
  { id: "dishwash", name: "Dishwash Bar", emoji: "🧽", category: "Household", price: 20, unit: "pcs" },
  { id: "toothpaste", name: "Toothpaste", emoji: "🪥", category: "Household", price: 55, unit: "pcs" },
  { id: "shampoo", name: "Shampoo Sachet", emoji: "🧴", category: "Household", price: 2, unit: "packet" },
  { id: "matchbox", name: "Matchbox", emoji: "🔥", category: "Household", price: 2, unit: "pcs" },
  { id: "candle", name: "Candle", emoji: "🕯️", category: "Household", price: 10, unit: "packet" },
  { id: "agarbatti", name: "Agarbatti", emoji: "🪔", category: "Household", price: 25, unit: "packet" },
];

const categories = [
  "All",
  "Grocery",
  "Pulses",
  "Oil & Spices",
  "Vegetables",
  "Fruits",
  "Snacks & Namkeen",
  "Dairy & Drinks",
  "Household",
  "Custom",
];

const themes = [
  { id: "emerald", name: "Emerald", color: "#a9ff70" },
  { id: "ocean", name: "Ocean", color: "#70e6ff" },
  { id: "violet", name: "Violet", color: "#d0a2ff" },
  { id: "sunset", name: "Sunset", color: "#ffc07a" },
];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

function readStorage(key, fallback) {
  try {
    const result = JSON.parse(localStorage.getItem(key) || "null");
    return result ?? fallback;
  } catch {
    return fallback;
  }
}

function loadProducts() {
  const saved = readStorage("smart-kirana-products", []);

  if (!Array.isArray(saved)) {
    return initialProducts.map((item) => ({ ...item, inMyShop: false }));
  }

  const defaults = initialProducts.map((product) => {
    const old = saved.find(
      (item) => item.id === product.id && item.name === product.name
    );

    return old
      ? {
          ...product,
          price: Number.isFinite(Number(old.price))
            ? Number(old.price)
            : product.price,
          inMyShop: Boolean(old.inMyShop),
        }
      : { ...product, inMyShop: false };
  });

  const customProducts = saved.filter((product) => product.custom === true);

  return [...defaults, ...customProducts];
}

function formatGrams(grams) {
  return Number(grams.toFixed(1)).toLocaleString("en-IN");
}

/* ================= AUTH PAGE ================= */

function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");

    const cleanUsername = username.trim();

    if (cleanUsername.length < 3 || cleanUsername.length > 40) {
      setError("Username 3–40 characters ka hona chahiye.");
      return;
    }

    if (password.length < 8 || password.length > 72) {
      setError("Password 8–72 characters ka hona chahiye.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: cleanUsername,
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Login/register nahi ho paya."
        );
      }

      onLogin(
        data.user || {
          username: data.username || cleanUsername,
        }
      );
    } catch (err) {
      setError(
        err.message || "Server se connection nahi ho pa raha."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-screen" data-theme="emerald">
      <section className="auth-art">
        <div className="brand-mark">🛒</div>
        <p className="eyebrow">YOUR DIGITAL SHOP</p>
        <h1>
          Smart shopping.
          <br />
          <span>Smarter business.</span>
        </h1>
        <p>
          Products, prices aur billing ek premium dashboard mein.
          Apni dukaan ko smart tareeke se manage karo.
        </p>
        <div className="hero-tags">
          <span>✦ Quick billing</span>
          <span>₹ Smart pricing</span>
          <span>↗ Easy sharing</span>
        </div>
      </section>

      <section className="auth-card">
        <div className="brand auth-brand">
          <div className="brand-mark">🛒</div>
          <div>
            <div className="brand-name">
              SMART <span>KIRANA</span>
            </div>
            <div className="brand-caption">YOUR DIGITAL SHOP ASSISTANT</div>
          </div>
        </div>

        <p className="eyebrow">
          {mode === "login" ? "WELCOME BACK" : "GET STARTED"}
        </p>
        <h2>
          {mode === "login" ? "Login to your shop" : "Create your account"}
        </h2>
        <p className="subtext">
          {mode === "login"
            ? "Username aur password enter karo."
            : "Apna naya account banao."}
        </p>

        <form onSubmit={submit}>
          <label htmlFor="auth-username">Username</label>
          <input
            className="field"
            id="auth-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={3}
            maxLength={40}
            autoComplete="username"
            placeholder="3–40 characters"
            required
          />

          <label htmlFor="auth-password">Password</label>
          <input
            className="field"
            id="auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            maxLength={72}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            placeholder="8–72 characters"
            required
          />

          {error && <div className="error-box">{error}</div>}

          <button className="btn btn-primary full-btn" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Login →"
                : "Create account →"}
          </button>
        </form>

        <div className="switch-auth">
          {mode === "login" ? "New to Smart Kirana?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
            }}
          >
            {mode === "login" ? "Create account" : "Login"}
          </button>
        </div>
      </section>
    </main>
  );
}

/* ================= MAIN APP ================= */

export default function App() {
  const [user, setUser] = useState(() =>
    readStorage("smart-kirana-user", null)
  );

  const [products, setProducts] = useState(loadProducts);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("all");
  const [category, setCategory] = useState("All");
  const [discount, setDiscount] = useState("0");

  const [theme, setTheme] = useState(
    () => localStorage.getItem("smart-kirana-theme") || "emerald"
  );

  const [showPriceManager, setShowPriceManager] = useState(false);
  const [priceSearch, setPriceSearch] = useState("");
  const [priceDrafts, setPriceDrafts] = useState({});

  const [customName, setCustomName] = useState("");
  const [customPrice, setCustomPrice] = useState("");

  const [weightProduct, setWeightProduct] = useState(null);
  const [calcMode, setCalcMode] = useState("weight");
  const [weightValue, setWeightValue] = useState("250");
  const [weightUnit, setWeightUnit] = useState("g");
  const [budgetValue, setBudgetValue] = useState("10");
  const [modalRate, setModalRate] = useState("0");

  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem("smart-kirana-products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("smart-kirana-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("smart-kirana-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("smart-kirana-user");
    }
  }, [user]);

  useEffect(() => {
    if (!notice) return undefined;

    const timer = window.setTimeout(() => setNotice(""), 2800);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function notify(text) {
    setNotice(text);
  }

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        `${product.name} ${product.category} ${product.unit}`
          .toLowerCase()
          .includes(query);

      const matchesView =
        view === "my-shop"
          ? Boolean(product.inMyShop)
          : view === "grocery"
            ? product.category === "Grocery"
            : true;

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesView && matchesCategory;
    });
  }, [products, search, view, category]);

  const priceList = useMemo(() => {
    const query = priceSearch.trim().toLowerCase();

    return products.filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(query)
    );
  }, [products, priceSearch]);

  const subtotal = cart.reduce((total, item) => {
    const amount = item.isWeighted
      ? item.price * item.quantity / 1000
      : item.price * item.quantity;

    return total + amount;
  }, 0);

  const discountPercent = Math.max(0, Math.min(100, Number(discount) || 0));
  const discountAmount = subtotal * discountPercent / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount);
  const myShopCount = products.filter((item) => item.inMyShop).length;

  const effectiveRate = Math.max(0, Number(modalRate) || 0);
  const numericWeight = Math.max(0, Number(weightValue) || 0);
  const numericBudget = Math.max(0, Number(budgetValue) || 0);

  const previewGrams =
    calcMode === "budget"
      ? effectiveRate > 0
        ? Math.round((numericBudget / effectiveRate) * 1000 * 10) / 10
        : 0
      : numericWeight * (weightUnit === "kg" ? 1000 : 1);

  const previewAmount = effectiveRate * previewGrams / 1000;

  function changeView(nextView) {
    setView(nextView);
    setCategory("All");
    setSearch("");
  }

  function changeTheme(nextTheme) {
    setTheme(nextTheme);
    notify(`${nextTheme} theme selected`);
  }

  function toggleMyShop(productId) {
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    setProducts((previous) =>
      previous.map((item) =>
        item.id === productId
          ? { ...item, inMyShop: !item.inMyShop }
          : item
      )
    );

    notify(
      product.inMyShop
        ? `${product.name} My Shop se remove ho gaya`
        : `${product.name} My Shop mein save ho gaya`
    );
  }

  function savePrice(productId, value) {
    if (value === "" || !Number.isFinite(Number(value)) || Number(value) < 0) {
      notify("Valid price enter karo.");
      return;
    }

    const newPrice = Number(value);

    setProducts((previous) =>
      previous.map((product) =>
        product.id === productId
          ? { ...product, price: newPrice }
          : product
      )
    );

    setCart((previous) =>
      previous.map((item) =>
        item.productId === productId
          ? { ...item, price: newPrice }
          : item
      )
    );

    if (weightProduct?.id === productId) {
      setWeightProduct((previous) =>
        previous ? { ...previous, price: newPrice } : previous
      );
      setModalRate(String(newPrice));
    }

    setPriceDrafts((previous) => {
      const updated = { ...previous };
      delete updated[productId];
      return updated;
    });

    notify("Naya price save ho gaya.");
  }

  function openWeightCalculator(product) {
    setWeightProduct(product);
    setModalRate(String(product.price));
    setCalcMode("weight");
    setWeightValue("250");
    setWeightUnit("g");
    setBudgetValue("10");
  }

  function addProduct(product) {
    if (product.unit === "kg") {
      openWeightCalculator(product);
      return;
    }

    setCart((previous) => {
      const existing = previous.find(
        (item) => item.productId === product.id && !item.isWeighted
      );

      if (existing) {
        return previous.map((item) =>
          item.cartId === existing.cartId
            ? { ...item, quantity: item.quantity + 1, price: product.price }
            : item
        );
      }

      return [
        ...previous,
        {
          cartId: `${product.id}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          emoji: product.emoji,
          price: product.price,
          unit: product.unit,
          quantity: 1,
          isWeighted: false,
        },
      ];
    });

    notify(`${product.name} bill mein add ho gaya.`);
  }

  function addWeightedProduct(event) {
    event.preventDefault();

    if (!weightProduct) return;

    const rate = Number(modalRate);
    if (!Number.isFinite(rate) || rate <= 0) {
      notify("Rate ₹/kg zero se zyada hona chahiye.");
      return;
    }

    let grams;

    if (calcMode === "budget") {
      const rupees = Number(budgetValue);

      if (!Number.isFinite(rupees) || rupees <= 0) {
        notify("Kitne rupaye ka lena hai, sahi amount enter karo.");
        return;
      }

      grams = Math.round((rupees / rate) * 1000 * 10) / 10;
    } else {
      const amount = Number(weightValue);

      if (!Number.isFinite(amount) || amount <= 0) {
        notify("Weight sahi enter karo.");
        return;
      }

      grams = amount * (weightUnit === "kg" ? 1000 : 1);
    }

    if (!Number.isFinite(grams) || grams <= 0 || grams > 100000) {
      notify("Weight 0 se zyada aur 100 kg tak rakho.");
      return;
    }

    // Calculator mein badla gaya rate save karna.
    savePrice(weightProduct.id, String(rate));

    setCart((previous) => [
      ...previous,
      {
        cartId: `${weightProduct.id}-${Date.now()}`,
        productId: weightProduct.id,
        name: weightProduct.name,
        emoji: weightProduct.emoji,
        price: rate,
        unit: "kg",
        quantity: grams,
        isWeighted: true,
      },
    ]);

    const total = rate * grams / 1000;
    notify(
      `${weightProduct.name}: ${formatGrams(grams)} g, bill ${money(total)}`
    );

    setWeightProduct(null);
  }

  function changeQuantity(cartId, direction) {
    setCart((previous) =>
      previous
        .map((item) => {
          if (item.cartId !== cartId) return item;

          const step = item.isWeighted ? 50 : 1;
          return { ...item, quantity: item.quantity + direction * step };
        })
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(cartId) {
    setCart((previous) =>
      previous.filter((item) => item.cartId !== cartId)
    );
  }

  function addCustomProduct(event) {
    event.preventDefault();

    const name = customName.trim();
    const price = Number(customPrice);

    if (!name || !Number.isFinite(price) || price < 0) {
      notify("Product ka naam aur valid price enter karo.");
      return;
    }

    const product = {
      id: `custom-${Date.now()}`,
      name,
      emoji: "🛍️",
      category: "Custom",
      price,
      unit: "pcs",
      custom: true,
      inMyShop: true,
    };

    setProducts((previous) => [...previous, product]);

    setCart((previous) => [
      ...previous,
      {
        cartId: `${product.id}-bill`,
        productId: product.id,
        name: product.name,
        emoji: product.emoji,
        price: product.price,
        unit: product.unit,
        quantity: 1,
        isWeighted: false,
      },
    ]);

    setCustomName("");
    setCustomPrice("");
    notify(`${name} add ho gaya.`);
  }

  function receiptText() {
    return [
      "SMART KIRANA",
      `Date: ${new Date().toLocaleString("en-IN")}`,
      `Customer: ${user?.username || user?.name || "Customer"}`,
      "--------------------------------",
      ...cart.map((item) => {
        const amount = item.isWeighted
          ? item.price * item.quantity / 1000
          : item.price * item.quantity;

        const quantity = item.isWeighted
          ? `${formatGrams(item.quantity)} g`
          : `${item.quantity} ${item.unit}`;

        return `${item.name} (${quantity}) - ${money(amount)}`;
      }),
      "--------------------------------",
      `Subtotal: ${money(subtotal)}`,
      `Discount (${discountPercent}%): -${money(discountAmount)}`,
      `GRAND TOTAL: ${money(grandTotal)}`,
      "Thank you for shopping with us!",
    ].join("\n");
  }

  function printBill() {
    if (!cart.length) {
      notify("Print se pehle bill mein product add karo.");
      return;
    }

    const printWindow = window.open("", "_blank", "width=750,height=750");

    if (!printWindow) {
      notify("Browser mein print pop-up allow karo.");
      return;
    }

    const escapeHtml = (text) =>
      String(text).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]);

    const rows = cart.map((item) => {
      const qty = item.isWeighted
        ? `${formatGrams(item.quantity)} g`
        : `${item.quantity} ${item.unit}`;

      const amount = item.isWeighted
        ? item.price * item.quantity / 1000
        : item.price * item.quantity;

      return `<tr>
        <td>${escapeHtml(item.name)}</td>
        <td>${escapeHtml(qty)}</td>
        <td>${money(item.price)}${item.isWeighted ? "/kg" : ""}</td>
        <td>${money(amount)}</td>
      </tr>`;
    }).join("");

    printWindow.document.write(`
      <!doctype html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Smart Kirana Bill</title>
        <style>
          body {font-family:Arial,sans-serif;color:#173622;padding:24px}
          h1,p{text-align:center}
          h1{margin-bottom:4px}
          p{font-size:12px;color:#526d5a}
          table{width:100%;border-collapse:collapse;margin-top:20px}
          td,th{padding:9px 5px;border-bottom:1px solid #ddd;text-align:left;font-size:12px}
          th{background:#e6f6e6}
          .totals{margin:20px 0 0 auto;width:270px}
          .row{display:flex;justify-content:space-between;margin:10px 0;font-size:13px}
          .grand{border-top:2px solid #173622;padding-top:13px;font-weight:bold;font-size:20px}
          .thanks{text-align:center;margin-top:32px}
          @media print{body{padding:0}}
        </style>
      </head>
      <body>
        <h1>SMART KIRANA</h1>
        <p>Your neighbourhood shop</p>
        <p>Date: ${escapeHtml(new Date().toLocaleString("en-IN"))}</p>
        <p>Customer: ${escapeHtml(user?.username || user?.name || "Customer")}</p>
        <table>
          <thead>
            <tr><th>Product</th><th>Quantity</th><th>Rate</th><th>Amount</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <div class="totals">
          <div class="row"><span>Subtotal</span><b>${money(subtotal)}</b></div>
          <div class="row"><span>Discount</span><b>-${money(discountAmount)}</b></div>
          <div class="row grand"><span>Grand total</span><span>${money(grandTotal)}</span></div>
        </div>
        <div class="thanks"><b>Thank you for shopping with us!</b></div>
        <script>window.onload = () => window.print();<\/script>
      </body>
      </html>
    `);

    printWindow.document.close();
  }

  function shareBill(platform) {
    if (!cart.length) {
      notify("Pehle bill mein product add karo.");
      return;
    }

    const text = encodeURIComponent(receiptText());

    const url =
      platform === "whatsapp"
        ? `https://wa.me/?text=${text}`
        : `https://t.me/share/url?url=&text=${text}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  function downloadBill() {
    if (!cart.length) {
      notify("Pehle bill mein product add karo.");
      return;
    }

    const blob = new Blob([receiptText()], {
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
    notify("Bill download ho gaya.");
  }

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">🛒</div>
          <div>
            <div className="brand-name">
              SMART <span>KIRANA</span>
            </div>
            <div className="brand-caption">YOUR DIGITAL SHOP ASSISTANT</div>
          </div>
        </div>

        <div className="top-actions">
          <span className="user-label">
            <i /> {user.username || user.name || "My Shop"}
          </span>

          <button
            className="btn btn-secondary"
            onClick={() => setShowPriceManager(!showPriceManager)}
          >
            ⚙️ {showPriceManager ? "Close rates" : "All prices"}
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => {
              setUser(null);
              setCart([]);
            }}
          >
            Exit
          </button>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">✦ SMARTER SHOP MANAGEMENT</p>
            <h1>
              Your Shop.
              <br />
              <span>Your Rules.</span>
            </h1>
            <p>
              Price change karo, kilo ya rupaye se quantity nikalo,
              bill banao aur customer ko share karo.
            </p>

            <div className="hero-tags">
              <span>⚡ Quick billing</span>
              <span>₹ Smart calculator</span>
              <span>✦ Custom themes</span>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <span className="hero-fruit fruit-one">🍅</span>
            <span className="hero-fruit fruit-two">🥑</span>
            <span className="hero-fruit fruit-three">🥕</span>
            <div className="hero-orbit">
              <div className="hero-basket">🛒</div>
            </div>
            <span className="hero-star">✦</span>
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div>
              <p>All products</p>
              <strong>{products.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div>
              <p>My Shop products</p>
              <strong>{myShopCount}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🧾</div>
            <div>
              <p>Current bill</p>
              <strong>{money(grandTotal)}</strong>
            </div>
          </div>
        </section>

        <section className="theme-panel">
          <div>
            <h3>🎨 Choose your vibe</h3>
            <p>Colour select karo; poore dashboard ka theme badal jayega.</p>
          </div>

          <div className="theme-options">
            {themes.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`theme-choice ${theme === item.id ? "selected" : ""}`}
                onClick={() => changeTheme(item.id)}
              >
                <span style={{ background: item.color }} />
                {item.name}
                {theme === item.id && <b>✓</b>}
              </button>
            ))}
          </div>
        </section>

        {notice && (
          <div className="toast" role="status">
            ✦ {notice}
          </div>
        )}

        {showPriceManager && (
          <section className="panel price-manager">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">QUICK RATE EDITOR</p>
                <h2>All product prices</h2>
                <p className="subtext">
                  Rate change karo; Enter dabao ya input se bahar click karo.
                </p>
              </div>

              <button
                className="btn btn-ghost"
                onClick={() => setShowPriceManager(false)}
              >
                Close ✕
              </button>
            </div>

            <input
              className="field"
              placeholder="Product search..."
              value={priceSearch}
              onChange={(e) => setPriceSearch(e.target.value)}
            />

            <div className="price-list">
              {priceList.map((product) => (
                <div className="price-row" key={product.id}>
                  <div className="price-product">
                    <span>{product.emoji}</span>
                    <div>
                      <b>{product.name}</b>
                      <small>
                        {product.category} ·{" "}
                        {product.unit === "kg" ? "rate per kg" : `per ${product.unit}`}
                      </small>
                    </div>
                  </div>

                  <label>
                    <span>Rate ₹</span>
                    <input
                      className="field price-input"
                      type="number"
                      min="0"
                      step="0.01"
                      value={priceDrafts[product.id] ?? product.price}
                      onChange={(e) =>
                        setPriceDrafts((previous) => ({
                          ...previous,
                          [product.id]: e.target.value,
                        }))
                      }
                      onBlur={(e) => savePrice(product.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") e.currentTarget.blur();
                      }}
                    />
                  </label>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="workspace">
          <section className="panel catalog">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">PRODUCT COLLECTION</p>
                <h2>
                  {view === "my-shop"
                    ? "My Shop"
                    : view === "grocery"
                      ? "Grocery products"
                      : category === "All"
                        ? "All Products"
                        : category}
                </h2>
                <p className="subtext">
                  Price card par edit karo; product add karne par current rate use hoga.
                </p>
              </div>

              <span className="count-pill">{visibleProducts.length} items</span>
            </div>

            <nav className="main-tabs">
              <button
                className={view === "my-shop" ? "active" : ""}
                onClick={() => changeView("my-shop")}
              >
                ⭐ My Shop
              </button>

              <button
                className={view === "all" ? "active" : ""}
                onClick={() => changeView("all")}
              >
                ▦ All Products
              </button>

              <button
                className={view === "grocery" ? "active" : ""}
                onClick={() => changeView("grocery")}
              >
                🌾 Grocery
              </button>
            </nav>

            <div className="search-wrap">
              <span>⌕</span>
              <input
                className="field search-input"
                placeholder="Search aloo, chawal, namkeen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="category-row">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`category-chip ${category === item ? "active" : ""}`}
                  onClick={() => {
                    setCategory(item);
                    setView("all");
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-top">
                    <div className="product-emoji">{product.emoji}</div>

                    <button
                      type="button"
                      className={`pin-button ${product.inMyShop ? "pinned" : ""}`}
                      onClick={() => toggleMyShop(product.id)}
                      title={product.inMyShop ? "Remove from My Shop" : "Save to My Shop"}
                      aria-label={`Toggle ${product.name} in My Shop`}
                    >
                      {product.inMyShop ? "★" : "☆"}
                    </button>
                  </div>

                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>

                  <label className="price-label">
                    <span>
                      {product.unit === "kg"
                        ? "Rate per kg (₹)"
                        : `Rate per ${product.unit} (₹)`}
                    </span>
                    <input
                      className="field card-price-input"
                      type="number"
                      min="0"
                      step="0.01"
                      value={priceDrafts[product.id] ?? product.price}
                      onChange={(e) =>
                        setPriceDrafts((previous) => ({
                          ...previous,
                          [product.id]: e.target.value,
                        }))
                      }
                      onBlur={(e) => savePrice(product.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") e.currentTarget.blur();
                      }}
                    />
                  </label>

                  <button
                    type="button"
                    className="btn btn-primary add-product"
                    onClick={() => addProduct(product)}
                  >
                    + Add to bill
                  </button>
                </article>
              ))}

              {!visibleProducts.length && (
                <div className="empty-state">
                  <span>🛍️</span>
                  <b>Yahan koi product nahi mila.</b>
                  <p>
                    My Shop ke liye products par ☆ dabao.
                    Ya All Products par jaakar catalogue dekho.
                  </p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => changeView("all")}
                  >
                    All Products
                  </button>
                </div>
              )}
            </div>

            <form className="custom-form" onSubmit={addCustomProduct}>
              <div className="custom-heading">
                <h3>＋ Add your own product</h3>
                <p>Jo product catalogue mein nahi hai use add karo.</p>
              </div>

              <input
                className="field"
                placeholder="Product name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                required
              />

              <input
                className="field"
                type="number"
                min="0"
                step="0.01"
                placeholder="Price ₹"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                required
              />

              <button className="btn btn-primary" type="submit">
                Add product
              </button>
            </form>

            <p className="note">
              ★ dabane se item My Shop mein save hota hai. KG product par
              Add to bill dabane se weight/rupee calculator khulta hai.
            </p>
          </section>

          <aside className="panel cart-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">CHECKOUT</p>
                <h2>Current Bill</h2>
                <p className="subtext">Customer ka bill yahan ready hoga.</p>
              </div>
              <div className="cart-icon">🧾</div>
            </div>

            <div className="cart-list">
              {!cart.length ? (
                <div className="cart-empty">
                  <span>🛒</span>
                  <b>Bill abhi khaali hai</b>
                  <p>Product select karke Add to bill dabao.</p>
                </div>
              ) : (
                cart.map((item) => {
                  const amount = item.isWeighted
                    ? item.price * item.quantity / 1000
                    : item.price * item.quantity;

                  return (
                    <div className="cart-item" key={item.cartId}>
                      <div className="cart-emoji">{item.emoji}</div>

                      <div className="cart-info">
                        <b>{item.name}</b>
                        <small>
                          {item.isWeighted
                            ? `${formatGrams(item.quantity)} g`
                            : `${item.quantity} ${item.unit}`}
                          {" · "}
                          {money(item.price)}
                          {item.isWeighted ? "/kg" : ""}
                        </small>

                        <div className="qty-controls">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name}`}
                            onClick={() => changeQuantity(item.cartId, -1)}
                          >
                            −
                          </button>
                          <span>
                            {item.isWeighted
                              ? `${formatGrams(item.quantity)}g`
                              : item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase ${item.name}`}
                            onClick={() => changeQuantity(item.cartId, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="cart-amount">
                        <b>{money(amount)}</b>
                        <button
                          className="remove-button"
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => removeItem(item.cartId)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="bill-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <b>{money(subtotal)}</b>
              </div>

              <div className="total-row discount-row">
                <label htmlFor="discount">Discount (%)</label>
                <input
                  id="discount"
                  className="field discount-input"
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>

              <div className="total-row">
                <span>Discount amount</span>
                <b className="discount-green">−{money(discountAmount)}</b>
              </div>

              <div className="grand-total">
                <span>Grand Total</span>
                <strong>{money(grandTotal)}</strong>
              </div>
            </div>

            <div className="bill-actions">
              <button
                className="btn btn-primary"
                onClick={printBill}
                disabled={!cart.length}
              >
                🖨️ Print bill
              </button>

              <button
                className="btn btn-secondary"
                onClick={downloadBill}
                disabled={!cart.length}
              >
                ↓ Download
              </button>

              <button
                className="btn btn-whatsapp"
                onClick={() => shareBill("whatsapp")}
                disabled={!cart.length}
              >
                WhatsApp ↗
              </button>

              <button
                className="btn btn-telegram"
                onClick={() => shareBill("telegram")}
                disabled={!cart.length}
              >
                Telegram ↗
              </button>

              <button
                className="btn btn-danger full-width"
                disabled={!cart.length}
                onClick={() => {
                  setCart([]);
                  setDiscount("0");
                  notify("Bill clear ho gaya.");
                }}
              >
                Clear bill
              </button>
            </div>

            <p className="note">
              WhatsApp/Telegram par bill ka text ready hoga.
              Contact select karke Send tumhe karna hai.
            </p>
          </aside>
        </div>

        <footer>
          SMART KIRANA <span>✦</span> YOUR SHOP, YOUR RULES
        </footer>
      </main>

      {/* =============== WEIGHT / RUPEE CALCULATOR =============== */}

      {weightProduct && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setWeightProduct(null);
            }
          }}
        >
          <form className="weight-modal" onSubmit={addWeightedProduct}>
            <p className="eyebrow">SMART RATE CALCULATOR</p>
            <h2>
              {weightProduct.emoji} {weightProduct.name}
            </h2>
            <p className="modal-description">
              Rate aur quantity badlo; neeche bill amount live calculate hoga.
            </p>

            <label htmlFor="modal-rate">Rate per kilogram (₹/kg)</label>
            <input
              id="modal-rate"
              className="field rate-modal-input"
              type="number"
              min="0.01"
              step="0.01"
              value={modalRate}
              onChange={(e) => setModalRate(e.target.value)}
              onBlur={(e) => {
                if (
                  e.target.value !== "" &&
                  Number.isFinite(Number(e.target.value)) &&
                  Number(e.target.value) > 0
                ) {
                  savePrice(weightProduct.id, e.target.value);
                }
              }}
              required
            />

            <div className="calc-mode-tabs">
              <button
                type="button"
                className={calcMode === "weight" ? "active" : ""}
                onClick={() => setCalcMode("weight")}
              >
                ⚖️ Weight se price
              </button>

              <button
                type="button"
                className={calcMode === "budget" ? "active" : ""}
                onClick={() => setCalcMode("budget")}
              >
                ₹ Rupaye se weight
              </button>
            </div>

            {calcMode === "weight" ? (
              <div className="calc-fields">
                <label htmlFor="weight-value">Kitna weight chahiye?</label>

                <div className="weight-input-row">
                  <input
                    id="weight-value"
                    className="field"
                    type="number"
                    min="0.001"
                    step="any"
                    value={weightValue}
                    onChange={(e) => setWeightValue(e.target.value)}
                    required
                  />

                  <select
                    className="field"
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value)}
                  >
                    <option value="g">Grams (g)</option>
                    <option value="kg">Kilograms (kg)</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="calc-fields">
                <label htmlFor="budget-value">Kitne rupaye ka samaan chahiye?</label>
                <div className="rupee-input">
                  <span>₹</span>
                  <input
                    id="budget-value"
                    className="field"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={budgetValue}
                    onChange={(e) => setBudgetValue(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="formula-note">
              {calcMode === "weight"
                ? `Formula: ${formatGrams(previewGrams)} g × ₹${effectiveRate}/kg ÷ 1000`
                : `Formula: ₹${numericBudget} ÷ ₹${effectiveRate}/kg × 1000`}
            </div>

            <div className="weight-preview">
              <div>
                <span>Customer ko milega</span>
                <strong>
                  {previewGrams >= 1000
                    ? `${(previewGrams / 1000).toLocaleString("en-IN", {
                        maximumFractionDigits: 3,
                      })} kg`
                    : `${formatGrams(previewGrams)} g`}
                </strong>
              </div>
              <div>
                <span>Bill amount</span>
                <strong>{money(previewAmount)}</strong>
              </div>
            </div>

            {calcMode === "budget" && (
              <p className="note">
                Weight ko 0.1 gram tak round kiya gaya hai; isliye bahut
                chhota rounding difference ho sakta hai.
              </p>
            )}

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setWeightProduct(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={effectiveRate <= 0 || previewGrams <= 0 || previewGrams > 100000}
              >
                Add to bill →
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}