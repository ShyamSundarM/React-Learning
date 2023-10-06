import Cart from "./Cart";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <nav className="navbar navbar-light bg-dark">
      <a className={`navbar-brand ${styles.title}`} href="#">
        React Food Order
      </a>
      <div className={styles.cartPos}>
        <Cart />
      </div>
    </nav>
  );
}
