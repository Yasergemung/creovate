'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, Sparkles, ArrowRight, Globe2, Users, Layers3 } from 'lucide-react';
import { creators } from '@/lib/data';
import { CreatorCard } from '@/components/creator-card';

const categories = ['All','Gaming','Football','Technology','Lifestyle','Education','Entertainment'];
export default function Home() {
  const [query,setQuery] = useState('');
  const [category,setCategory] = useState('All');
  const [ar,setAr] = useState(false);
  const visible = useMemo(()=>creators.filter(c=>(category==='All'||c.category===category) && `${c.name} ${c.category} ${c.handle}`.toLowerCase().includes(query.toLowerCase())),[query,category]);
  return <main className="min-h-screen overflow-hidden">
    <header className="container-wide flex h-20 items-center justify-between">
      <Link href="/" className="text-2xl font-black tracking-tight">creo<span className="text-violet-400">vate</span><span className="ml-2 align-top text-[10px] text-zinc-500">BETA</span></Link>
      <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex"><a href="#discover" className="hover:text-white">{ar?'استكشف':'Discover'}</a><a href="#about" className="hover:text-white">{ar?'عن المنصة':'About'}</a><a href="#community" className="hover:text-white">{ar?'المجتمع':'Community'}</a></nav>
      <div className="flex items-center gap-3"><button onClick={()=>setAr(!ar)} className="rounded-xl border border-white/10 px-3 py-2 text-xs text-zinc-300">{ar?'EN':'عربي'}</button><Link href="#join" className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold hover:bg-violet-500">{ar?'انضم الآن':'Join Creovate'}</Link></div>
    </header>
    <section className="container-wide relative py-20 text-center md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-8 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[100px]"/>
      <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs text-violet-200"><Sparkles size={14}/>{ar?'مساحة واحدة لكل المبدعين':'A home for every creator'}</div>
      <h1 className="mx-auto max-w-4xl text-5xl font-black leading-[1.12] tracking-tight md:text-7xl">{ar?<>اكتشف المبدعين.<br/><span className="gradient-text">واجمع عالمك في مكان واحد.</span></>:<>Discover creators.<br/><span className="gradient-text">Connect beyond platforms.</span></>}</h1>
      <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">{ar?'اكتشف صناع المحتوى، تعرّف على أعمالهم، واجمع كل حساباتهم الاجتماعية في ملف شخصي واحد.':'Find creators, explore what they make, and bring all their social profiles together in one place.'}</p>
      <div className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row"><a href="#discover" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold hover:bg-violet-500">{ar?'استكشف المبدعين':'Explore creators'} <ArrowRight size={17}/></a><a href="#join" className="rounded-xl border border-white/10 px-6 py-3.5 font-semibold text-zinc-200 hover:bg-white/5">{ar?'أنشئ ملفك مجاناً':'Create your free profile'}</a></div>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-3">
        {[{icon:Users,n:'Creators',v:'Discover'},{icon:Globe2,n:'Platforms',v:'All in one'},{icon:Layers3,n:'Community',v:'Coming soon'}].map(x=><div key={x.n} className="glass rounded-2xl p-4 text-left"><x.icon className="mb-3 text-violet-300" size={19}/><div className="font-bold">{x.n}</div><div className="mt-1 text-xs text-zinc-500">{x.v}</div></div>)}
      </div>
    </section>
    <section id="discover" className="container-wide py-16">
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-[.2em] text-violet-300">{ar?'اكتشف':'Discover'}</p><h2 className="mt-2 text-3xl font-bold">{ar?'صناع محتوى يستحقون المتابعة':'Creators worth knowing'}</h2><p className="mt-2 text-sm text-zinc-500">{ar?'ابحث حسب الاسم أو المجال.':'Search by creator name or category.'}</p></div>
      <div className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-panel px-4 py-3 md:max-w-sm"><Search size={18} className="text-zinc-500"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={ar?'ابحث عن صانع محتوى...':'Search creators...'} className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600"/></div></div>
      <div className="mb-7 flex flex-wrap gap-2">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`rounded-full px-4 py-2 text-xs font-medium transition ${category===c?'bg-violet-600 text-white':'border border-white/10 bg-white/[.03] text-zinc-400 hover:text-white'}`}>{c==='All'?(ar?'الكل':c):c}</button>)}</div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{visible.map(c=><CreatorCard key={c.slug} creator={c} ar={ar}/>)}</div>
      {visible.length===0&&<p className="rounded-2xl border border-dashed border-white/10 py-16 text-center text-zinc-500">{ar?'لا توجد نتائج. جرّب بحثاً آخر.':'No creators found. Try another search.'}</p>}
    </section>
    <section id="about" className="container-wide py-16"><div className="glass rounded-3xl p-8 md:p-12"><p className="text-sm font-semibold uppercase tracking-[.2em] text-cyan-300">One profile. Every platform.</p><h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">{ar?'مساحتك الرقمية تبدأ من هنا.':'Your creator identity, in one place.'}</h2><p className="mt-4 max-w-2xl leading-7 text-zinc-400">{ar?'Creovate تساعدك على عرض هويتك الرقمية والوصول إلى جمهورك عبر منصاتك المختلفة.':'Creovate gives creators a simple home to showcase their work, connect their platforms, and get discovered by new audiences.'}</p></div></section>
    <section id="community" className="container-wide py-10"><div className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-600/15 to-cyan-500/5 p-8 text-center md:p-12"><h2 className="text-3xl font-bold">{ar?'مجتمع المبدعين قادم':'The creator community is next'}</h2><p className="mx-auto mt-3 max-w-xl text-zinc-400">{ar?'نعمل على إضافة المنشورات والمتابعات والتفاعل بين صناع المحتوى.':'Profiles and discovery come first. Posts, follows, and creator-to-creator interaction are planned for the next release.'}</p></div></section>
    <section id="join" className="container-wide py-12 text-center"><h2 className="text-3xl font-bold">{ar?'ابدأ رحلتك مع Creovate':'Make your presence discoverable.'}</h2><p className="mt-3 text-zinc-500">{ar?'أنشئ ملفك واجمع حساباتك في مكان واحد.':'Create a profile and connect your social accounts.'}</p><button className="mt-6 rounded-xl bg-violet-600 px-7 py-3 font-semibold opacity-70" title="Authentication integration is the next build step">{ar?'التسجيل قريباً':'Sign-up coming next'}</button></section>
    <footer className="container-wide border-t border-white/10 py-8 text-center text-xs text-zinc-600">© 2026 Creovate. Built for creators.</footer>
  </main>;
}
