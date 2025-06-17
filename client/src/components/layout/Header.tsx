import Link from "next/link";

export function Header() {
  return (
    <header className="py-2 px-4 bg-gray-100">
      <nav className="container mx-auto flex justify-between gap-4">
        <div className="flex gap-4">
          <Link className="underline" href="/">
            Main Page
          </Link>
          <Link className="underline" href="/liked">
            Liked Jobs
          </Link>
        </div>
        <div className="flex gap-4">
          <Link className="underline" href="/login">
            Login
          </Link>
          <Link className="underline" href="/create-profile">
            Create Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}
