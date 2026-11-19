import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { issueSession } from "@/lib/auth";
const attempts = new Map<string,{n:number;at:number}>();
export async function POST(req:Request) { const ip=req.headers.get("x-forwarded-for")?.split(",")[0]||"unknown"; const prev=attempts.get(ip); if(prev&&prev.n>=8&&Date.now()-prev.at<15*60_000)return NextResponse.json({error:"Demasiados intentos. Espera 15 minutos."},{status:429}); try { const data=z.object({username:z.string().min(1).max(80),password:z.string().min(1).max(200)}).parse(await req.json()); const admin=await db.admin.findUnique({where:{username:data.username}}); if(!admin||data.username!==process.env.ADMIN_USERNAME||!await bcrypt.compare(data.password,admin.passwordHash)){attempts.set(ip,{n:(prev?.n||0)+1,at:Date.now()});return NextResponse.json({error:"Credenciales incorrectas"},{status:401});} attempts.delete(ip); await issueSession(admin.username); return NextResponse.json({ok:true}); }catch{return NextResponse.json({error:"Solicitud no válida"},{status:400});} }
