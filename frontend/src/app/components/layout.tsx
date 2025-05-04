import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <h1>My Web Store</h1>
        <nav>
          <ul>
            <li>
              <Link className="menuitem" href="/">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
