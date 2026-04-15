import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SearchIcon, CartIcon, UserIcon, MenuIcon,CloseIcon } from "../ui/NavIcons";


//  Nav links config

const NAV_LINKS = [
  { label: "New In",      to: "/new-in" },
  { label: "Collections", to: "/collections" },
  { label: "Designers",   to: "/designers" },
  { label: "Sellers",     to: "/sellers" },
];

//  Navbar 

export default function Navbar() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [searchOpen, setSearchOpen]     = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const navigate = useNavigate();

  // Dynamically retrieve cart count & user from Redux if slices exist
  const cartCount = useSelector((s) => s.cart?.items?.length ?? 0);
  const user      = useSelector((s) => s.auth?.user ?? null);

  // Add thicker backdrop when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  const navLinkClass = ({ isActive }) =>
    [
      "relative text-[0.65rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
      "after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full",
      "after:transition-transform after:duration-300 after:origin-left",
      isActive
        ? "text-[var(--color-primary)] after:bg-[var(--color-primary)] after:scale-x-100"
        : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] after:bg-[var(--color-primary)] after:scale-x-0 hover:after:scale-x-100",
    ].join(" ");

  return (
    <>
      {/*  Main Bar  */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: "64px",
          backgroundColor: scrolled
            ? "rgba(28, 27, 27, 0.95)"
            : "rgba(28, 27, 27, 0.80)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(212, 160, 23, 0.12)",
          fontFamily: "var(--font-family)",
        }}
      >
        <div className="h-full max-w-360 mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">

          {/*  Brand  */}
          <Link to="/" className="flex flex-col leading-none shrink-0">
            <span
              className="font-bold tracking-[0.22em] text-[1.1rem]"
              style={{ color: "var(--color-primary-container)" }}
            >
              ZYLO
            </span>
            <span
              className="text-[0.55rem] tracking-[0.18em] uppercase hidden sm:block"
              style={{ color: "var(--color-outline)" }}
            >
              The Nocturnal Atelier
            </span>
          </Link>

          {/*  Desktop Nav Links (centre)  */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink key={to} to={to} className={navLinkClass}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/*  Right Actions  */}
          <div className="flex items-center gap-3">

            {/* Search toggle */}
            <button
              aria-label="Toggle search"
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2 transition-colors duration-300"
              style={{ color: "var(--color-outline)", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-outline)")}
            >
              <SearchIcon />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative p-2 transition-colors duration-300"
              style={{ color: "var(--color-outline)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-outline)")}
            >
              <CartIcon />
              {cartCount > 0 && (
                <span
                  className="absolute top-0 right-0 w-4 h-4 flex items-center justify-center text-[0.55rem] font-bold"
                  style={{
                    backgroundColor: "var(--color-primary-container)",
                    color: "var(--color-on-primary-container)",
                    borderRadius: 0,
                  }}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link
              to={user ? "/profile" : "/login"}
              aria-label="Account"
              className="p-2 transition-colors duration-300"
              style={{ color: "var(--color-outline)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-outline)")}
            >
              <UserIcon />
            </Link>

            {/* Seller CTA — desktop only */}
            <Link
              to={user?.role === "seller" ? "/seller/dashboard" : "/register?seller=true"}
              className="hidden lg:inline-flex items-center px-4 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.13em] transition-colors duration-300 shrink-0"
              style={{
                border: "1px solid var(--color-primary-container)",
                color: "var(--color-primary-container)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-primary-container)";
                e.currentTarget.style.color = "var(--color-on-primary-container)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--color-primary-container)";
              }}
            >
              {user?.role === "seller" ? "Seller Dashboard" : "Become a Seller"}
            </Link>

            {/* Mobile hamburger */}
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2 transition-colors duration-300"
              style={{ color: "var(--color-primary)", background: "none", border: "none", cursor: "pointer" }}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/*  Search Overlay  */}
      <div
        className="fixed left-0 right-0 z-40 overflow-hidden transition-all duration-300"
        style={{
          top: "64px",
          maxHeight: searchOpen ? "80px" : "0px",
          backgroundColor: "rgba(28,27,27,0.97)",
          backdropFilter: "blur(24px)",
          borderBottom: searchOpen ? "1px solid rgba(212,160,23,0.12)" : "none",
        }}
      >
        <form onSubmit={handleSearch} className="max-w-360 mx-auto px-6 lg:px-10 flex items-center gap-4 h-20">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search collections, designers, styles…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus={searchOpen}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{
              color: "var(--color-on-surface)",
              fontFamily: "var(--font-family)",
              caretColor: "var(--color-primary)",
            }}
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            style={{ color: "var(--color-outline)", background: "none", border: "none", cursor: "pointer" }}
          >
            <CloseIcon />
          </button>
        </form>
      </div>

      {/*  Mobile Drawer  */}
      <div
        className="fixed inset-0 z-30 lg:hidden transition-opacity duration-300"
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
          opacity: menuOpen ? 1 : 0,
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(19,19,19,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <nav
          className="absolute top-16 left-0 right-0 flex flex-col gap-0 transition-transform duration-300"
          style={{
            backgroundColor: "rgba(28,27,27,0.98)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(212,160,23,0.12)",
            transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
          }}
        >
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="px-8 py-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] border-b transition-colors duration-300"
              style={({ isActive }) => ({
                color: isActive ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                borderColor: "rgba(79,70,52,0.25)",
              })}
            >
              {label}
            </NavLink>
          ))}

          {/* Seller CTA (mobile) */}
          <div className="px-8 py-5">
            <Link
              to={user?.role === "seller" ? "/seller/dashboard" : "/register?seller=true"}
              onClick={() => setMenuOpen(false)}
              className="inline-flex px-6 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.13em] transition-colors duration-300"
              style={{
                border: "1px solid var(--color-primary-container)",
                color: "var(--color-primary-container)",
                textDecoration: "none",
              }}
            >
              {user?.role === "seller" ? "Seller Dashboard" : "Become a Seller"}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
