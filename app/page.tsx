'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  Asterisk,
  BarChart3,
  Database,
  Globe2,
  Landmark,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Wally = {
  id: number;
  number: string;
  name: string;
  image: string;
  tier: string;
  rank: number;
  score: number;
  color: string | null;
  hat: string | null;
  tusk: string | null;
  oneOfOne: boolean;
};

type Distribution = {
  tier: string;
  count: number;
  percent: number;
  color: string;
};

type CollectionData = {
  totalSupply: number;
  previewCount: number;
  distribution: Distribution[];
  items: Wally[];
};

const heroWallys = [
  { src: '/collection/0001.webp', label: '#0001' },
  { src: '/collection/0271.webp', label: 'RAINBOW 1/1' },
  { src: '/collection/0510.webp', label: 'WALL STREET 1/1' },
];

const tierOrder = ['All', 'Common', 'Uncommon', 'Rare', 'Epic', '1 of 1'];

const activationCards = [
  {
    number: '01',
    title: 'RWA field notes',
    copy: 'Plain-language research and visual explainers for the real-world asset economy.',
    icon: Database,
  },
  {
    number: '02',
    title: 'Fair market labs',
    copy: 'Community sessions exploring access, transparency, standards, and market design.',
    icon: BarChart3,
  },
  {
    number: '03',
    title: 'Onchain missions',
    copy: 'Member-led public-good activations that turn culture into measurable progress.',
    icon: Globe2,
  },
];

function tierClass(tier: string) {
  return `tier-${tier.toLowerCase().replaceAll(' ', '-').replaceAll('of', 'of')}`;
}

export default function Home() {
  const [data, setData] = useState<CollectionData | null>(null);
  const [query, setQuery] = useState('');
  const [activeTier, setActiveTier] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12);
  const [launchOpen, setLaunchOpen] = useState(false);
  const [signalSent, setSignalSent] = useState(false);

  useEffect(() => {
    fetch('/collection.json')
      .then((response) => response.json())
      .then((payload: CollectionData) => setData(payload));
  }, []);

  useEffect(() => {
    setVisibleCount(12);
  }, [query, activeTier]);

  const filteredItems = useMemo(() => {
    if (!data) return [];
    const needle = query.trim().toLowerCase().replace(/^#/, '');
    return data.items.filter((item) => {
      const tierMatch = activeTier === 'All' || item.tier === activeTier;
      const searchText = [
        item.number,
        item.name,
        item.color,
        item.hat,
        item.tusk,
        item.tier,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return tierMatch && (!needle || searchText.includes(needle));
    });
  }, [activeTier, data, query]);

  const openLaunch = () => {
    setSignalSent(false);
    setLaunchOpen(true);
  };

  const handleLaunchSignal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignalSent(true);
  };

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Wally NFT home">
          <span className="brand-mark">
            <img src="/wally-logo-mark.png" alt="" />
          </span>
          <span className="brand-copy">
            WALLY NFT
            <small>RWA FOUNDATION CLUB / EST. ONCHAIN</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#collection">Collection</a>
          <a href="#mission">Mission</a>
          <a href="#activations">Activations</a>
        </nav>
        <Button className="status-chip" onClick={openLaunch}>
          <i /> Coming soon
        </Button>
      </header>

      <div className="signal-strip" aria-label="Launch message">
        <span>1,000 WALLYS</span>
        <b>◆</b>
        <span>REAL ASSETS</span>
        <b>◆</b>
        <span>FAIR MARKETS</span>
        <b>◆</b>
        <span>ONCHAIN FOR EVERYONE</span>
      </div>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <Globe2 /> THE INTERNET&apos;S REAL-WORLD ASSET CLUB
          </div>
          <h1>
            WALL STREET
            <br />
            MEETS THE
            <br />
            <em>REAL WORLD.</em>
          </h1>
          <p>
            A 1,000-piece character collection building a clearer, fairer path
            for real-world assets to move onchain.
          </p>
          <div className="hero-actions">
            <Button
              className="primary-cta"
              size="lg"
              onClick={() =>
                document
                  .getElementById('collection')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Explore the collection <ArrowDownRight />
            </Button>
            <button className="launch-note" onClick={openLaunch}>
              <Sparkles /> Mint details coming soon
            </button>
          </div>
        </div>

        <div className="hero-gallery" aria-label="Featured Wally NFTs">
          {heroWallys.map((wally, index) => (
            <figure className={`hero-card card-${index + 1}`} key={wally.src}>
              <img src={wally.src} alt={`Featured Wally ${wally.label}`} />
              <figcaption>
                {wally.label}
                <span>RWA FOUNDING SERIES</span>
              </figcaption>
            </figure>
          ))}
          <div className="edition-stamp">
            <strong>1K</strong>
            <span>
              GENESIS
              <br />
              SUPPLY
            </span>
          </div>
        </div>
      </section>

      <section className="numbers-band" aria-label="Collection facts">
        <div>
          <strong>1,000</strong>
          <span>Genesis Wallys</span>
        </div>
        <div>
          <strong>29</strong>
          <span>Color traits</span>
        </div>
        <div>
          <strong>32</strong>
          <span>Hat traits</span>
        </div>
        <div>
          <strong>05</strong>
          <span>Tusk finishes</span>
        </div>
        <div>
          <strong>04</strong>
          <span>True one-of-ones</span>
        </div>
      </section>

      <section className="collection-section" id="collection">
        <div className="section-kicker">
          <span>01</span> THE COLLECTION
        </div>
        <div className="collection-heading">
          <div>
            <h2>
              Built to be
              <br />
              <em>collected.</em>
            </h2>
            <p>
              A fixed set of 1,000 Wallys, assembled from a deliberate trait
              system. Search the preview archive, compare rarity, and find your
              signal.
            </p>
          </div>
          <aside className="rarity-panel" aria-labelledby="rarity-title">
            <div className="panel-title">
              <span id="rarity-title">RARITY SIGNAL</span>
              <small>SUPPLY / 1,000</small>
            </div>
            <div className="distribution-bar" aria-label="Rarity distribution">
              {data?.distribution.map((entry) => (
                <span
                  key={entry.tier}
                  style={{
                    width: `${entry.percent}%`,
                    background: entry.color,
                  }}
                  title={`${entry.tier}: ${entry.count}`}
                />
              ))}
            </div>
            <div className="rarity-list">
              {data?.distribution.map((entry) => (
                <div key={entry.tier}>
                  <i style={{ background: entry.color }} />
                  <span>{entry.tier}</span>
                  <strong>{entry.count}</strong>
                  <small>{entry.percent}%</small>
                </div>
              )) ?? <p>Reading the chain…</p>}
            </div>
          </aside>
        </div>

        <div className="archive-toolbar">
          <label className="search-box">
            <Search aria-hidden="true" />
            <span className="sr-only">Search collection preview</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search #, color, hat, tusk…"
              aria-label="Search collection preview"
            />
          </label>
          <div className="tier-filters" aria-label="Filter by rarity">
            {tierOrder.map((tier) => (
              <button
                key={tier}
                className={activeTier === tier ? 'active' : ''}
                onClick={() => setActiveTier(tier)}
                aria-pressed={activeTier === tier}
              >
                {tier}
              </button>
            ))}
          </div>
          <span className="result-count">
            {filteredItems.length || 0} shown
          </span>
        </div>

        <div className="nft-grid" aria-live="polite">
          {filteredItems.slice(0, visibleCount).map((item) => (
            <article className="nft-card" key={item.id}>
              <div className="nft-image-wrap">
                <img
                  src={item.image}
                  alt={`${item.name}, ${item.tier} rarity`}
                  loading="lazy"
                />
                <Badge className={`rarity-badge ${tierClass(item.tier)}`}>
                  {item.tier}
                </Badge>
                <span className="rank-chip">RANK {item.rank}</span>
              </div>
              <div className="nft-info">
                <div>
                  <h3>{item.name}</h3>
                  <span>#{item.number}</span>
                </div>
                {item.oneOfOne ? (
                  <p className="one-one-copy">UNREPEATED / UNREPEATABLE</p>
                ) : (
                  <dl>
                    <div>
                      <dt>Color</dt>
                      <dd>{item.color}</dd>
                    </div>
                    <div>
                      <dt>Hat</dt>
                      <dd>{item.hat}</dd>
                    </div>
                    <div>
                      <dt>Tusk</dt>
                      <dd>{item.tusk}</dd>
                    </div>
                  </dl>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="empty-state">
            <Search />
            <h3>No Wally found.</h3>
            <p>Try a different token, trait, or rarity tier.</p>
          </div>
        )}
        {visibleCount < filteredItems.length && (
          <Button
            className="load-more"
            onClick={() => setVisibleCount((count) => count + 12)}
          >
            Load more from the archive <ArrowDownRight />
          </Button>
        )}
        <p className="archive-note">
          Showing a curated 40-piece preview from the completed 1,000-piece
          collection. Full collection access launches with the club.
        </p>
      </section>

      <section className="mission-section" id="mission">
        <div className="section-kicker light">
          <span>02</span> THE FOUNDATION
        </div>
        <div className="mission-grid">
          <div className="mission-statement">
            <p className="eyebrow">
              <Asterisk /> CULTURE WITH A PUBLIC PURPOSE
            </p>
            <h2>
              More than a PFP.
              <br />A banner for <em>fair markets.</em>
            </h2>
          </div>
          <div className="mission-copy">
            <p className="lead">
              The strongest clubs turn identity into coordination. Wally Club
              adds a mission: support the RWA Foundation as it helps bring
              real-world markets onchain—with access, transparency, and fairness
              built in from the start.
            </p>
            <p>
              This collection gives the movement a face, a shared language, and
              a community layer. The goal is simple: make the next era of
              markets easier to understand, harder to gatekeep, and useful to
              more people.
            </p>
          </div>
        </div>

        <div className="principles-grid">
          <article>
            <Landmark />
            <span>01</span>
            <h3>Real-world relevance</h3>
            <p>
              Built around the market shift already connecting physical assets
              and public blockchains.
            </p>
          </article>
          <article>
            <ShieldCheck />
            <span>02</span>
            <h3>Mission before hype</h3>
            <p>
              Identity, education, standards, and public-good activations—not a
              promise of financial return.
            </p>
          </article>
          <article>
            <Users />
            <span>03</span>
            <h3>A club that contributes</h3>
            <p>
              A recognizable cultural layer for the people building accessible
              and fair RWA markets.
            </p>
          </article>
        </div>
      </section>

      <section className="activations-section" id="activations">
        <div className="activation-topline">
          <div className="section-kicker">
            <span>03</span> ACTIVATIONS
          </div>
          <span className="coming-badge">
            <Zap /> COMING SOON
          </span>
        </div>
        <div className="activation-heading">
          <h2>
            From avatar
            <br />
            to <em>action.</em>
          </h2>
          <p>
            Activations are being designed with the Foundation. Expect useful
            ideas, public conversations, and member-led moments—not empty
            roadmap theatre.
          </p>
        </div>
        <div className="activation-cards">
          {activationCards.map(({ number, title, copy, icon: Icon }) => (
            <article key={number}>
              <div>
                <span>{number}</span>
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <small>
                DETAILS UNLOCKING SOON <ArrowRight />
              </small>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-cta">
        <div className="cta-orbit">
          <span>RWA</span>
        </div>
        <p>THE FOUNDATION CLUB FOR THE ONCHAIN REAL WORLD</p>
        <h2>
          EARLY IS A<br />
          <em>STATE OF MIND.</em>
        </h2>
        <Button className="closing-button" onClick={openLaunch}>
          Get the launch signal <ArrowRight />
        </Button>
        <small>MINT, MEMBERSHIP &amp; ACTIVATION DETAILS — COMING SOON</small>
      </section>

      <footer>
        <a
          className="brand footer-brand"
          href="#top"
          aria-label="Wally NFT home"
        >
          <span className="brand-mark">
            <img src="/wally-logo-mark.png" alt="" />
          </span>
          <span className="brand-copy">
            WALLY NFT<small>RWA FOUNDATION CLUB</small>
          </span>
        </a>
        <p>
          Built to help bring the world onchain—and make the market fairer when
          it gets there.
        </p>
        <div>
          <a href="#collection">Collection</a>
          <a href="#mission">Mission</a>
          <a href="#activations">Activations</a>
        </div>
      </footer>

      {launchOpen && (
        <div
          className="launch-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="launch-title"
        >
          <button
            className="overlay-backdrop"
            onClick={() => setLaunchOpen(false)}
            aria-label="Close launch dialog"
          />
          <div className="launch-dialog">
            <button
              className="dialog-close"
              onClick={() => setLaunchOpen(false)}
              aria-label="Close"
            >
              <X />
            </button>
            <span className="modal-label">FOUNDING SIGNAL / 001</span>
            <h2 id="launch-title">
              THE CLUBHOUSE
              <br />
              OPENS SOON.
            </h2>
            {signalSent ? (
              <div className="signal-confirmation">
                <Sparkles />
                <h3>Signal received.</h3>
                <p>
                  This is a preview experience. Public registration will open
                  with the official launch.
                </p>
                <Button onClick={() => setLaunchOpen(false)}>
                  Back to the club
                </Button>
              </div>
            ) : (
              <>
                <p>
                  Preview the launch flow and stay close. Official channels and
                  registration details are coming soon.
                </p>
                <form onSubmit={handleLaunchSignal}>
                  <input
                    type="email"
                    required
                    placeholder="YOU@EMAIL.COM"
                    aria-label="Email address"
                  />
                  <Button type="submit">
                    Preview launch signal <ArrowRight />
                  </Button>
                </form>
                <small>DEMO FORM — NO EMAIL IS STORED OR SENT.</small>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
