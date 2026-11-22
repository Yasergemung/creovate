import Link from 'next/link';
import type { Creator } from '@/lib/data';
import { ArrowUpRight, BadgeCheck, Users } from 'lucide-react';
export function CreatorCard({ creator, ar=false }: { creator: Creator; ar?: boolean }) {
  return <article className="group glass rounded-2xl p-5 transition hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-glow">
    <div className="flex items-start justify-between">
      <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${creator.accent} text-lg font-black text-white`}>{creator.initials}</div>
      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">{creator.category}</span>
    </div>
    <div className="mt-4 flex items-center gap-2"><h3 className="text-lg font-bold">{creator.name}</h3><BadgeCheck size={17} className="text-cyan-400"/></div>
    <p className="mt-1 text-sm text-zinc-500">{creator.handle} · {creator.country}</p>
    <p className="mt-3 min-h-12 text-sm leading-6 text-zinc-400">{creator.bio}</p>
    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
      <span className="flex items-center gap-2 text-xs text-zinc-400"><Users size={15}/>{creator.followers} {ar?'متابع':'followers'}</span>
      <Link href={`/creators/${creator.slug}`} className="flex items-center gap-1 text-sm font-semibold text-violet-300 hover:text-white">{ar?'الملف الشخصي':'View profile'} <ArrowUpRight size={15}/></Link>
    </div>
  </article>;
}
