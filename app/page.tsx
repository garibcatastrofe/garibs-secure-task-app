import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <p>Hola mundo :)</p>
      <Link href={"/home"}>Ir al dashboard</Link>
    </div>
  );
}
