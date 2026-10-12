import { useEffect, useRef, useState } from 'react'
import { D, P } from './data'

const img = Object.fromEntries(
  Object.entries(import.meta.glob('./assets/*.webp', { eager: true, import: 'default' }))
    .map(([k, v]) => [k.split('/').pop().replace('.webp', ''), v])
)
const CV = import.meta.env.BASE_URL + 'Faizan_Hashim_Resume.pdf'
// TODO: put your real usernames here
const LINKEDIN = 'https://www.linkedin.com/in/faizan-hashim-be-mba-bb83ab98?utm_source=share_via&utm_content=profile&utm_medium=member_android'
const EMAIL = 'hashimfaizan93@gmail.com'
const PHONE = '+92-332-3224626'
const COMPANY = { 1: 'Shafi Gluco Chem', 2: 'Digital Apparel' }

const NAV = [['top', 'Home'], ['exp', 'Expertise'], ['skills', 'Skills'], ['works', 'Works'], ['table', 'Projects'], ['journey', 'Journey'], ['contact', 'Contact']]
const SERVICES = [
  ['Solar Power', '756 KW, 204 KW and 70 KW grid-tied systems', 'solar', 'Solar panels'],
  ['Sustainable Drying', 'Saves 2.2M PKR a month, 413 t CO₂ a year', 'drying', 'Drying conveyor'],
  ['Heat Recovery', 'Boiler blowdown and condensate recovery', 'heat', 'Heat recovery system'],
]
const SKILLS = [
  ['Energy Management', 'ISO 50001, solar, VFDs, energy audits', 'solar2'],
  ['Steam & Boilers', 'Chain grate, fire tube, economizers', 'rnd'],
  ['Water Treatment', 'RO, UF, DM, EDI, ETP up to 250,000 IGPD', 'nexia'],
  ['Power Systems', '11 kV load extension, 500 KVA transformer, 825 KVA generator', 'trans'],
]
const STATS = [
  [28, 0, 'Projects (24 done, 4 in progress)'], [1313048, 0, 'kWh saved / year'], [372279, 0, 'm³ natural gas / year'],
  [1040.68, 2, 'tons CO₂ cut / year'], [7.37, 2, 'million PKR saved / month'],
]
const WORKS = [
  ['a', 'solar', '204 KW grid-tied solar', '2024 · 174,424 kWh a year'],
  ['', 'nexia', 'Nexia NS 420 washers', '2023 · 4 units'],
  ['b', 'heat', 'Heat Recovery System', '2026'],
  ['', 'rotondi', 'Rotondi dryers', '2025 · 5 units'],
  ['c', 'drying', 'Sustainable drying conveyor', '2024 · 2.2M PKR a month'],
  ['', 'trans', '500 KVA transformer', '2025 · 11 kV panels'],
  ['', 'gen', '825 KVA generator', '2026 · Cummins'],
  ['d', 'yilmaz', 'Yilmak Rainforest washers', '2025 · 2 units'],
]
const STORIES = [
  ['Sustainable drying', 'Digital Apparel', ['Saves 2.2M PKR a month', 'Cuts 413 t CO₂ a year', 'Drying conveyor replaces gas-fired dryers']],
  ['Solar program', '756 KW, 204 KW, 70 KW in progress', ['1.2M and 0.8M PKR saved a month', '417 t CO₂ cut a year from two plants', 'Grid-tied, roof and PEB mounted']],
  ['Steam & condensate', 'Both companies', ['Blowdown heat recovery: 174,975 m³ gas a year', 'Condensate tanks: 86,904 m³ gas a year', 'Economizer: 43,200 m³ gas a year']],
]

function useInView() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } }, { threshold: 0.15 })
    o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return [ref, seen]
}

function Rv({ as: T = 'div', className = '', children, ...p }) {
  const [ref, seen] = useInView()
  return <T ref={ref} className={`${className} rv${seen ? ' v' : ''}`} {...p}>{children}</T>
}

function Stat({ to, d, label }) {
  const [ref, seen] = useInView()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let start, id
    const tick = (t) => {
      start = start ?? t
      const p = reduce ? 1 : Math.min((t - start) / 1400, 1)
      setN(to * (1 - (1 - p) ** 3))
      if (p < 1) id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [seen, to])
  return (
    <div ref={ref} className={`rv${seen ? ' v' : ''}`}>
      <b>{n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })}</b>
      <span>{label}</span>
    </div>
  )
}

function Row({ n, x, company, done }) {
  return (
    <tr>
      <td>{n}</td><td>{x[0]}</td><td>{x[1]}</td>
      <td className="n">{x[2]}</td><td className="n">{x[3]}</td><td className="n">{x[4]}</td><td className="n">{x[5]}</td>
      <td>{company}</td><td className={done ? 'ok' : 'pr'}>{done ? 'Done' : 'On progress'}</td>
    </tr>
  )
}

export default function App() {
  const [menu, setMenu] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      <nav>
        <a className="lg" href="#top">FH</a>
        <div className={`m${menu ? ' o' : ''}`} onClick={() => setMenu(false)}>
          {NAV.map(([id, label], i) => <a key={id} className={`l${i === 0 ? ' on' : ''}`} href={`#${id}`}>{label}</a>)}
        </div>
        <button id="bg" aria-label="Menu" onClick={() => setMenu(!menu)}>☰</button>
      </nav>

      <header className="hero" id="top">
        <div className="w hg">
          <div>
            <span className="tag">10+ years</span><span className="tag">28 projects</span><span className="tag">ISO 50001</span>
            <h1>I’m Faizan Hashim,<br />Utilities &amp; Energy Manager</h1>
            <p>I run boilers, water treatment, compressors and solar for a large manufacturing group, and cut their energy, gas and carbon bills. My projects save about 7.37 million PKR every month.</p>
            <div className="bs">
              <a className="btn b1" href="#about">About</a>
              <a className="btn b2" href="#table">View projects</a>
              <a className="btn b1" href={CV} download>Download CV</a>
            </div>
          </div>
          <div className="ph"><img src={img.hero} alt="Engr. Faizan Hashim" width="560" height="560" /><span className="ar">↗</span></div>
        </div>
      </header>

      <section className="alt" id="exp"><div className="w">
        <span className="eb">My expertise</span><h2>Innovative Solutions</h2>
        <p className="sub">Energy, steam and water projects delivered at Shafi Gluco Chem and Digital Apparel, each with measured savings.</p>
        <div className="sv">
          {SERVICES.map(([t, s, k, alt]) => (
            <Rv as="a" key={k} className="card" href="#table">
              <h3>{t}</h3><small>{s}</small>
              <div className="im"><img loading="lazy" src={img[k]} alt={alt} /></div><span className="ar">↗</span>
            </Rv>
          ))}
        </div>
      </div></section>

      <section id="skills"><div className="w sk">
        <div id="about">
          <span className="eb" style={{ textAlign: 'left' }}>My skills</span>
          <h2>Reliable utilities and efficient plants</h2>
          <p style={{ marginTop: 16 }}>Boilers, steam and condensate, RO and ETP, compressed air, power and renewable energy. I lead teams, cost the options and commission the equipment, backed by an MBA and a B.E. in Polymer &amp; Petrochemical Engineering from NED.</p>
          <p>Training at a 1,320 MW coal power plant in China and two years on the CPEC power project taught me boiler operation, water treatment and DCS monitoring.</p>
        </div>
        <div className="tl">
          {SKILLS.map(([t, s, k]) => (
            <Rv key={t}><b>{t}</b><span>{s}</span><img loading="lazy" src={img[k]} alt="" /></Rv>
          ))}
        </div>
      </div></section>

      <section className="alt"><div className="w">
        <span className="eb">Impact 2019–2026</span><h2>Results that show on the bill</h2>
        <p className="sub">Annual figures across 24 completed projects.</p>
        <div className="st">{STATS.map(([to, d, label]) => <Stat key={label} to={to} d={d} label={label} />)}</div>
      </div></section>

      <section id="works"><div className="w">
        <h2>Featured Works</h2><p className="sub">Select a photo to enlarge it.</p>
        <div className="mz">
          {WORKS.map(([cls, k, t, s]) => (
            <Rv as="figure" key={k} className={cls} onClick={() => setLightbox(img[k])}>
              <img loading="lazy" src={img[k]} alt={t} /><figcaption>{t}<i>{s}</i></figcaption>
            </Rv>
          ))}
        </div>
      </div></section>

      <section className="alt" id="table"><div className="w">
        <span className="eb">Project summary 2019–2026</span><h2>Project-wise Impact</h2>
        <p className="sub">Every project with capacity and yearly savings. Scroll sideways on a phone.</p>
        <div className="tw"><table>
          <thead><tr><th>#</th><th>Project</th><th>Capacity</th><th>Energy (kWh/yr)</th><th>Gas (m³/yr)</th><th>CO₂ (t/yr)</th><th>Savings (M PKR/mo)</th><th>Company</th><th>Status</th></tr></thead>
          <tbody>
            <tr className="gh"><td colSpan={9}>Completed projects 2019–2026 · 24 projects</td></tr>
            {D.map((x, i) => <Row key={i} n={i + 1} x={x} company={COMPANY[x[6]]} done />)}
            <tr className="tot"><td colSpan={3}>Total, completed</td><td className="n">1,313,048</td><td className="n">372,279</td><td className="n">1,040.68</td><td className="n">7.37</td><td colSpan={2}></td></tr>
            <tr className="gh p"><td colSpan={9}>Projects in progress 2023–2026 · 4 projects</td></tr>
            {P.map((x, i) => <Row key={i} n={25 + i} x={x} company="Digital Apparel" />)}
            <tr className="tot"><td colSpan={3}>Total, in progress</td><td className="n">128,640</td><td className="n">–</td><td className="n">100.00</td><td className="n">0.58</td><td colSpan={2}></td></tr>
          </tbody>
        </table></div>
      </div></section>

      <section id="journey"><div className="w">
        <span className="eb">My experience</span><h2>Education &amp; Training</h2>
        <p className="sub">From polymer engineering to running utilities for four production units.</p>
        <div className="ed">
          <Rv as="article" className="big"><img loading="lazy" src={img.rnd} alt="" /><div>
            <div className="yr">2022 – Now</div><b>Manager Utilities, Digital Apparel</b>
            <p>Leads utilities and maintenance across Units 1–4: dual-fuel boilers, RO, ETP, compressors and gensets. Named an Active Participant of the UNIDO EnMS Program.</p>
          </div></Rv>
          <Rv as="article"><div className="yr">2019</div><b>Senior Utility Engineer, Shafi Gluco Chem</b><p>Ran utilities for 120 and 80 tons/day plants. Commissioned a 15 TPH coal boiler and a 20 m³/hr RO plant.</p></Rv>
          <Rv as="article"><div className="yr">2017</div><b>Operation Engineer, Power China Gansu</b><p>Water treatment for two 660 MW boilers, after 6 months of training at a 1,320 MW plant in China.</p></Rv>
          <Rv as="article"><div className="yr">2019 – 2021</div><b>MBA, Supply Chain Management</b><p>Iqra University, Pakistan.</p></Rv>
          <Rv as="article"><div className="yr">2012 – 2016</div><b>B.E. Polymer &amp; Petrochemical Engineering</b><p>NED University of Engineering &amp; Technology.</p></Rv>
        </div>
      </div></section>

      <section className="alt"><div className="w">
        <span className="eb">Stories</span><h2>Career Highlights</h2>
        <p className="sub" style={{ marginBottom: 30 }}>Work I would show first.</p>
        <div className="ex">
          {STORIES.map(([t, e, li]) => (
            <Rv as="article" key={t}><h3>{t}</h3><em>{e}</em><ul>{li.map((x) => <li key={x}>{x}</li>)}</ul></Rv>
          ))}
        </div>
      </div></section>

      <section id="contact"><div className="w">
        <div className="ct">
          <h2>Let’s connect</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a className="btn b1" href={CV} download>Download CV</a>
            <a className="btn b2" href={`mailto:${EMAIL}`}>Contact me</a>
          </div>
        </div>
        <footer>
          <div className="fg">
            <div><div className="lg" style={{ marginBottom: 12 }}>FH</div><p>Engr. Faizan Hashim, B.E. (NED), MBA (IU). Sustainable today, better tomorrow.</p></div>
            <div><h4>Navigation</h4>{NAV.slice(1, 5).map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}</div>
            <div><h4>Contact</h4>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={`tel:${PHONE}`}>{PHONE}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>
          <div className="cp">© 2026 Faizan Hashim. All rights reserved.</div>
        </footer>
      </div></section>

      <div className={`lb${lightbox ? ' o' : ''}`} onClick={() => setLightbox(null)}>{lightbox && <img src={lightbox} alt="" />}</div>
    </>
  )
}
