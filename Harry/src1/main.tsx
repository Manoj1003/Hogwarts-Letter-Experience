import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
// The bundler loads this stylesheet at runtime; TypeScript has no CSS module declaration.
// @ts-expect-error CSS side-effect imports are handled by the bundler.
import './style.css';
const hero = new URL('./asset/hero-owl.png', import.meta.url).href;
const crest = new URL('./asset/crest.png', import.meta.url).href;

type Stage = 'arrival' | 'name' | 'letter';

const supplies = [
  'Plain black work robes',
  'Standard course books',
  'The Standard Book of Spells',
  'Wand',
  'Pewter cauldron',
  'Required magical equipment',
];

function Dust() {
  const dots = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        left: (i * 17.4) % 100,
        top: (i * 31.2) % 100,
        delay: (i % 9) * 0.35,
        size: 1 + (i % 3),
      })),
    [],
  );

  return (
    <div className="dust" aria-hidden="true">
      {dots.map((dot, index) => (
        <i
          key={index}
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            animationDelay: `${dot.delay}s`,
            width: dot.size,
            height: dot.size,
          }}
        />
      ))}
    </div>
  );
}

function FinalLetter({ name, restart }: { name: string; restart: () => void }) {
  return (
    <motion.section
      className="scene letter-scene"
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.article
        className="letter"
        initial={{ opacity: 0, y: 45, rotateX: 10, transformOrigin: 'top center' }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.25, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="border" aria-hidden="true" />

        <div className="letter-top">
          <img src={crest} alt="Hogwarts crest" />
          <div>
            <div className="hogwarts">HOGWARTS SCHOOL</div>
            <h3>of WITCHCRAFT and WIZARDRY</h3>
            <div className="headmaster-line">
              DEPUTY HEADMISTRESS: MINERVA McGONAGALL
            </div>
          </div>
        </div>

        <div className="rule">✦ ───────── ✧ ───────── ✦</div>

        <p className="salute">
          Dear <strong>{name}</strong>,
        </p>

        <p>
          This formal acceptance letter from{' '}
          <strong>Hogwarts School of Witchcraft and Wizardry</strong>, signed by
          Deputy Headmistress Minerva McGonagall, informs you of your acceptance
          into the upcoming school term beginning on <strong>September 1st</strong>.
        </p>

        <p>
          The letter includes the required list of first-year supplies, such as
          plain black work robes, standard course books like{' '}
          <em>The Standard Book of Spells</em>, and essential equipment including
          a wand and pewter cauldron.
        </p>

        <div className="supplies">
          <h4>FIRST-YEAR SUPPLIES</h4>
          <ul>
            {supplies.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="closing">
          <div className="signature-script">Minerva McGonagall</div>
          <small>Deputy Headmistress</small>
        </div>

        <div className="letter-motto">DRACO DORMIENS NUNQUAM TITILLANDUS</div>
      </motion.article>

      <div className="actions">
        <button type="button" onClick={() => window.location.href = "/sorting.html"}>
  Sorting Hat Ceremony
</button>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Read Again
        </button>
        <button type="button" onClick={restart}>
          Restart the Magic
        </button>
      </div>
    </motion.section>
  );
}

function App() {
  const [stage, setStage] = useState<Stage>('arrival');
  const [name, setName] = useState('');
  const [muted, setMuted] = useState(false);

  const restart = () => {
    setName('');
    setStage('arrival');
  };

  const submitName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = name.trim();

    if (!cleanName) {
      return;
    }

    // Go directly to the finished letter. No loading screen, envelope,
    // parchment placeholder, or intermediate animation is shown.
    setName(cleanName);
    setStage('letter');
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${hero})` }}>
      <div className="shade" />
      <div className="glow" />
      <Dust />

      <AnimatePresence mode="wait">
        {stage === 'arrival' && (
          <motion.section
            key="arrival"
            className="scene arrival"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="arrival-copy">
              <div className="ornament">✦ ───── ✧ ───── ✦</div>
              <div className="eyebrow">THE NIGHT HAS BROUGHT SOMETHING FOR YOU</div>
              <h1>
                A Letter Has
                <br />
                <em>Arrived For You...</em>
              </h1>
              <p>
                A Hogwarts letter is waiting beneath the moonlight.
                <br className="desktop" />
                Follow its journey and discover what awaits you.
              </p>
              <button className="gold" type="button" onClick={() => setStage('name')}>
                Choose Your Letter <span>✦</span>
              </button>
              <small>Choose your letter and let the parchment reveal itself.</small>
            </div>

            <button className="scroll" type="button" onClick={() => setStage('name')}>
              SCROLL TO EXPLORE
              <br />
              <b>⌄</b>
            </button>
          </motion.section>
        )}

        {stage === 'name' && (
          <motion.section
            key="name"
            className="scene name"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="panel">
              <div className="eyebrow">A PERSONAL DELIVERY</div>
              <h2>
                To whom should this
                <br />
                <em>magical letter</em> be addressed?
              </h2>
              <p>
                Enter your name. The acceptance letter will open immediately.
              </p>

              <form onSubmit={submitName} noValidate>
                <label htmlFor="name">Enter your name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter ur name"
                  autoComplete="name"
                />
                <button className="gold" type="submit">
                  Open My Letter <span>✦</span>
                </button>
              </form>
            </div>
          </motion.section>
        )}

        {stage === 'letter' && (
          <FinalLetter key="letter" name={name} restart={restart} />
        )}
      </AnimatePresence>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
