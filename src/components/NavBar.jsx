import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <div>
      <header>
        <h1>Mi aplicación</h1>
        <nav>
          <Link href="/">
            <a>Inicio</a>
          </Link>
          <button onClick={() => router.back()}>
            <a>{"<"}</a>
          </button>
        </nav>
      </header>
    </div>
  );
}
