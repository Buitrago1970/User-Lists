import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <div>
      <header>
        <h1 className="hidden">Mi aplicación</h1>
        <nav className="m-8 text-3xl font-bold space-x-10 ">
          <Link href="/">
            <a className="hover:text-neutral-400">HOME</a>
          </Link>
          <button
            className="hover:text-neutral-400"
            onClick={() => router.back()}
          >
            <a>{"BACK"}</a>
          </button>
        </nav>
      </header>
    </div>
  );
}
