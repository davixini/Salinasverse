import type { Metadata } from "next";
import Link from "next/link";
import "./style.css";
import SearchBox from "./SearchBox";
export const metadata: Metadata = { title: "SALINASVERSE — Archivo del IES Pedro Salinas", description: "Todo lo que ocurre en el Pedro Salinas merece ser documentado." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="es"><body><header className="top"><Link className="brand" href="/">SALINAS<span>VERSE</span><small>ARCHIVO DEL IES PEDRO SALINAS</small></Link><nav><Link href="/categoria/personajes">PERSONAJES</Link><Link href="/categoria/acontecimientos">ACONTECIMIENTOS</Link><Link href="/categoria/cultura">CULTURA</Link><Link href="/categoria/lugares">LUGARES</Link><Link href="/cronologia">CRONOLOGÍA</Link><Link href="/normas">NORMAS</Link></nav><div className="topright"><SearchBox/><Link href="/admin">ADMIN</Link></div></header><main>{children}</main><footer><span>SALINASVERSE · ARCHIVO DOCUMENTAL</span><span>«Todo lo que ocurre en el Pedro Salinas merece ser documentado»</span><Link href="/preguntas">FAQ</Link><Link href="/info">INFORMACIÓN</Link></footer></body></html> }
