import { useState } from 'react';
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Filter,
  FilePlus2,
  GitCompareArrows,
  LockKeyhole,
  Menu,
  MessageCircle,
  Search,
  Sparkles,
  Stethoscope,
  SlidersHorizontal,
  Wrench,
  X,
  Zap,
} from 'lucide-react';

type ModalKind = 'new-case' | 'quick' | 'analysis' | 'chat' | 'case-detail' | null;

const navItems = ['Home', 'Repertory', 'Materia Medica', 'Cases', 'Tools', 'Shop'];
const modules = [
  { name: 'Repertory', description: 'Browse and search the homeopathic repertory.', tone: 'blue', icon: BookOpen },
  { name: 'Materia Medica', description: 'Access detailed information on remedies.', tone: 'gold', icon: BookMarked },
  { name: 'Cases', description: 'Manage and analyze your patient cases.', tone: 'purple', icon: BriefcaseBusiness },
  { name: 'Tools', description: 'Periodic table, remedy comparison and more study instruments.', tone: 'teal', icon: Wrench },
];
const newsItems = [
  { date: 'AUG 15, 2026', title: 'My Notes — Your Personal Notebook', description: 'Type, dictate, or photograph handwritten pages and let the AI transcribe them.' },
  { date: 'AUG 08, 2026', title: 'A clearer way to study remedies', description: 'Compare materia medica passages side by side while keeping your case in view.' },
  { date: 'JUL 29, 2026', title: 'Welcome to the new Similimum', description: 'Your workspace, reorganized for a quieter and more focused practice.' },
];

const classicAuthors = [
  ['Allen HC', '185'],
  ['Allen TF', '816'],
  ['Boericke', '688'],
  ['Clarke', '1,010'],
  ['Hering', '412'],
  ['Kent', '180'],
  ['Boger', '342'],
  ['Lippe', '307'],
  ['Nash', '227'],
  ['Paterson', '8'],
];

const remedies = [
  { name: 'Abarea cochliocarpos', abbreviation: '—', kingdom: '—', family: '—', coverage: '1' },
  { name: 'Abelia parvifolia', abbreviation: 'abelia-p.', kingdom: '—', family: '—', coverage: '1' },
  { name: 'Abelmoschus', abbreviation: 'abel.', kingdom: '—', family: '—', coverage: '4' },
  { name: 'Abelmoschus esculentus', abbreviation: 'abel-e.', kingdom: '—', family: '—', coverage: '1' },
  { name: 'Abies alba', abbreviation: 'abies-a.', kingdom: '—', family: '—', coverage: '12' },
  { name: 'Abies canadensis', abbreviation: 'abies-c.', kingdom: '—', family: '—', coverage: '8' },
];

function MateriaMedicaPage({ onToast }: { onToast: (message: string) => void }) {
  const [mode, setMode] = useState<'Semantic' | 'Keyword'>('Keyword');
  const [searchTerm, setSearchTerm] = useState('');
  const [author, setAuthor] = useState('All');
  const [remedyFilter, setRemedyFilter] = useState('Remedies');
  const [matchType, setMatchType] = useState('Same sentence');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const filteredRemedies = remedies.filter((remedy) => remedy.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section className="mm-workspace" aria-label="Materia Medica workspace">
      <div className="mm-search-panel">
        <div className="segmented-control" role="tablist" aria-label="Search mode">
          {(['Semantic', 'Keyword'] as const).map((item) => (
            <button key={item} type="button" className={mode === item ? 'selected' : ''} onClick={() => setMode(item)}>{item}</button>
          ))}
        </div>
        <label className="mm-search-field">
          <Search aria-hidden="true" />
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="e.g., 'headache worse motion'" aria-label="Search remedies" />
        </label>
        <button className="mm-select" type="button" onClick={() => { setMatchType(matchType === 'Same sentence' ? 'Any passage' : 'Same sentence'); onToast('Match setting updated'); }}>
          <SlidersHorizontal aria-hidden="true" /> Match: {matchType} <ChevronDown aria-hidden="true" />
        </button>
        <button className="mm-select" type="button" onClick={() => { setRemedyFilter(remedyFilter === 'Remedies' ? 'All sources' : 'Remedies'); onToast('Source filter updated'); }}>
          <Filter aria-hidden="true" /> {remedyFilter} <ChevronDown aria-hidden="true" />
        </button>
        <button className="mm-search-button" type="button" onClick={() => onToast(searchTerm ? `Searching for “${searchTerm}”` : 'Enter a remedy or symptom to search')}>Search <Search aria-hidden="true" /></button>
      </div>

      <div className="mm-status-row">
        <span>Searching 38 of 38 sources · 5,366 remedies in view</span>
        <button type="button" className="collapse-search" aria-label="Collapse search panel" onClick={() => onToast('Search panel is already expanded')}><ChevronDown aria-hidden="true" /></button>
      </div>

      <div className="mm-layout">
        <aside className="mm-sidebar">
          <div className="mm-side-heading"><span>CLASSIC AUTHORS</span><button type="button" onClick={() => setAuthor('All')}>ALL <ChevronDown aria-hidden="true" /></button></div>
          <div className="author-list">
            {classicAuthors.map(([name, count], index) => (
              <button type="button" key={name} className={`author-row ${author === name ? 'active' : ''}`} onClick={() => { setAuthor(name); onToast(`${name} selected`); }}>
                <span className="author-avatar">{name.slice(0, 2)}</span><span className="author-name">{name}</span><span className="author-count">{count}</span>
                {index === 6 && <ChevronDown aria-hidden="true" className="author-chevron" />}
              </button>
            ))}
          </div>
        </aside>

        <div className="mm-results panel">
          <div className="mm-results-toolbar">
            <label className="remedy-search"><Search aria-hidden="true" /><input placeholder="Start typing a remedy name" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /></label>
            <strong>5,366 remedies</strong>
          </div>
          <div className="alphabet" aria-label="Filter by first letter">
            {alphabet.map((letter) => <button type="button" key={letter} className={letter === 'A' ? 'active' : ''} onClick={() => { setSearchTerm(letter); onToast(`Showing remedies beginning with ${letter}`); }}>{letter}</button>)}
          </div>
          <div className="remedy-table" role="table" aria-label="Remedies">
            <div className="remedy-head" role="row">
              <span>REMEDY <ChevronDown aria-hidden="true" /></span><span>ABBR. <ChevronDown aria-hidden="true" /></span><span>KINGDOM <ChevronDown aria-hidden="true" /></span><span>FAMILY <ChevronDown aria-hidden="true" /></span><span>COVERAGE <ChevronDown aria-hidden="true" /></span>
            </div>
            {filteredRemedies.map((remedy) => (
              <button type="button" className="remedy-row" key={remedy.name} onClick={() => onToast(`${remedy.name} selected`)}>
                <span className="remedy-name">{remedy.name}</span>
                <span>{remedy.abbreviation}</span>
                <span><LockKeyhole aria-hidden="true" /></span>
                <span><LockKeyhole aria-hidden="true" /></span>
                <span className="coverage"><i />{remedy.coverage}<LockKeyhole aria-hidden="true" /></span>
              </button>
            ))}
            {!filteredRemedies.length && <div className="mm-empty">No remedies found for “{searchTerm}”.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Logo() {
  return (
    <div className="brand" aria-label="Similimum homeopathy software">
      <svg className="brand-mark" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M18 31.5c-2.2-4.2-4.3-7.7-8.5-10.1C5 18.8 5.5 13 9.8 11.1c3.5-1.5 6.5.3 8.2 3.4 1.8-3.1 4.8-4.9 8.2-3.4 4.3 1.9 4.8 7.7.3 10.3-4.2 2.4-6.3 5.9-8.5 10.1Z" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 14.6V5.2M13.7 8.8 18 5.2l4.3 3.6M8.2 12.4 4.5 8.9M27.8 12.4l3.7-3.5M8.9 20.6l-5.1.4M27.1 20.6l5.1.4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        <circle cx="18" cy="4.3" r="1.5" fill="currentColor" />
      </svg>
      <span className="brand-copy">
        <span className="brand-name">SIMILIMUM</span>
        <span className="brand-sub">HOMEOPATHY SOFTWARE</span>
      </span>
    </div>
  );
}

function Dashboard() {
  const [activeNav, setActiveNav] = useState(window.location.pathname.endsWith('/mm') ? 'Materia Medica' : 'Home');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [modal, setModal] = useState<ModalKind>(null);
  const [toast, setToast] = useState('');
  const [caseName, setCaseName] = useState('');
  const [complaint, setComplaint] = useState('');

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };
  const navigate = (name: string) => {
    setActiveNav(name);
    setMobileNavOpen(false);
    window.history.pushState({}, '', name === 'Materia Medica' ? '/mm' : '/');
    if (name !== 'Home') showToast(`${name} workspace selected`);
  };
  const openAction = (kind: ModalKind) => setModal(kind);
  const closeModal = () => setModal(null);
  const submitCase = () => {
    if (!caseName.trim()) {
      showToast('Add a patient or case name to continue');
      return;
    }
    closeModal();
    showToast(`Case “${caseName.trim()}” is ready to review`);
    setCaseName('');
    setComplaint('');
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <main className="dashboard">
        <header className="topbar">
          <button className="brand" type="button" onClick={() => navigate('Home')} data-testid="button-brand-home">
            <Logo />
          </button>
          <nav className="nav-pill" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                className={`nav-item ${activeNav === item ? 'active' : ''}`}
                type="button"
                key={item}
                onClick={() => navigate(item)}
                data-testid={`button-nav-${item.toLowerCase().replaceAll(' ', '-')}`}
              >
                {item}
                {item === 'Tools' && <ChevronDown aria-hidden="true" />}
              </button>
            ))}
          </nav>
          <div className="header-tools">
            <button className="icon-button" type="button" aria-label="Search" onClick={() => showToast('Search is ready for your next remedy')} data-testid="button-search">
              <Search aria-hidden="true" />
            </button>
            <button className="icon-button" type="button" aria-label="Open study tools" onClick={() => showToast('Study view controls opened')} data-testid="button-zoom">
              <GitCompareArrows aria-hidden="true" />
            </button>
            <button className="icon-button" type="button" aria-label="AI tools" onClick={() => openAction('analysis')} data-testid="button-ai-tools">
              <Sparkles aria-hidden="true" />
            </button>
            <button className="icon-button" type="button" aria-label="Help" onClick={() => showToast('Support is available from your Similimum workspace')} data-testid="button-help">
              <CircleHelp aria-hidden="true" />
            </button>
            <button className="avatar" type="button" aria-label="Open profile" onClick={() => showToast('Profile settings opened')} data-testid="button-profile">AR</button>
            <button className="icon-button mobile-menu-button" type="button" aria-label="Toggle navigation" onClick={() => setMobileNavOpen((open) => !open)} data-testid="button-mobile-menu">
              {mobileNavOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </header>

        {mobileNavOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <button className={`nav-item ${activeNav === item ? 'active' : ''}`} type="button" key={item} onClick={() => navigate(item)} data-testid={`button-mobile-nav-${item.toLowerCase().replaceAll(' ', '-')}`}>
                {item}
              </button>
            ))}
          </nav>
        )}

        {activeNav === 'Materia Medica' ? <MateriaMedicaPage onToast={showToast} /> : <>
        <section className="welcome" aria-labelledby="welcome-heading">
          <p className="eyebrow">GOOD EVENING · SUNDAY, AUGUST 23</p>
          <h1 id="welcome-heading">What&apos;s on your mind?</h1>
        </section>

        <section className="quick-actions" aria-label="Quick actions">
          <button className="quick-action mint" type="button" onClick={() => openAction('quick')} data-testid="button-quick-repertorization">
            <Zap aria-hidden="true" /> Quick repertorization
          </button>
          <button className="quick-action primary" type="button" onClick={() => openAction('new-case')} data-testid="button-new-case">
            <FilePlus2 aria-hidden="true" /> New Case
          </button>
          <button className="quick-action secondary" type="button" onClick={() => openAction('analysis')} data-testid="button-ai-analysis">
            <Sparkles aria-hidden="true" /> AI Analysis
          </button>
          <button className="quick-action lilac" type="button" onClick={() => openAction('chat')} data-testid="button-ai-chat">
            <MessageCircle aria-hidden="true" /> AI Chat
          </button>
        </section>

        <section className="module-grid" aria-label="Similimum modules">
          {modules.map(({ name, description, tone, icon: Icon }) => (
            <button className="module-card" type="button" key={name} onClick={() => navigate(name)} data-testid={`card-module-${name.toLowerCase().replaceAll(' ', '-')}`}>
              <span className={`module-icon ${tone}`}><Icon aria-hidden="true" /></span>
              <span>
                <h2>{name}</h2>
                <p>{description}</p>
              </span>
            </button>
          ))}
        </section>

        <section className="content-grid" aria-label="Practice overview">
          <div className="panel recent-panel">
            <div className="panel-heading">
              <h2>Recent Cases</h2>
              <button className="text-link" type="button" onClick={() => navigate('Cases')} data-testid="button-view-all-cases">View all Cases <ChevronRight aria-hidden="true" /></button>
            </div>
            <div className="case-table" role="table" aria-label="Recent cases">
              <div className="case-head" role="row">
                <span role="columnheader">TITLE</span>
                <span role="columnheader">MAIN COMPLAINT</span>
                <span role="columnheader">LAST UPDATED</span>
                <span />
              </div>
              <button className="case-row" type="button" onClick={() => openAction('case-detail')} data-testid="row-case-quick-case-1">
                <strong>Quick case 1</strong>
                <span>Quick repertorization</span>
                <span>Aug 23, 2026</span>
                <span className="row-arrow"><ChevronRight aria-hidden="true" /></span>
              </button>
            </div>
          </div>
          <div className="panel news-panel">
            <div className="panel-heading">
              <h2>New in Similimum</h2>
              <button className="icon-button" type="button" aria-label="Open Similimum news" onClick={() => showToast('You are up to date')} data-testid="button-news-info"><CircleHelp aria-hidden="true" /></button>
            </div>
            <div className="news-list">
              {newsItems.map((item, index) => (
                <button className="news-item" type="button" key={item.title} onClick={() => showToast(`Opening: ${item.title}`)} data-testid={`button-news-${index}`}>
                  <span className="news-date">{item.date}</span>
                  <span className="news-title">{item.title}</span>
                  <span className="news-description">{item.description}</span>
                </button>
              ))}
            </div>
            <button className="news-more" type="button" onClick={() => showToast('More Similimum updates are on the way')} data-testid="button-more-news">View all updates <ArrowRight aria-hidden="true" /></button>
          </div>
        </section>
        <p className="footer-note">A thoughtful workspace for careful practitioners</p>
        </>}
      </main>

      {toast && <div className="toast" role="status" data-testid="status-toast"><Check aria-hidden="true" /> {toast}</div>}
      {modal && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-top">
              <div>
                <h2 id="modal-title">
                  {modal === 'new-case' && 'Open a new case'}
                  {modal === 'quick' && 'Quick repertorization'}
                  {modal === 'analysis' && 'AI Analysis'}
                  {modal === 'chat' && 'AI Chat'}
                  {modal === 'case-detail' && 'Quick case 1'}
                </h2>
                <p>
                  {modal === 'new-case' && 'Start with the details you know. You can add the rest later.'}
                  {modal === 'quick' && 'Search symptoms and find the most relevant rubrics.'}
                  {modal === 'analysis' && 'Review patterns across your notes with a little help.'}
                  {modal === 'chat' && 'Ask a question while you study a remedy or case.'}
                  {modal === 'case-detail' && 'A quick repertorization case, last updated Aug 23, 2026.'}
                </p>
              </div>
              <button className="close-button" type="button" onClick={closeModal} aria-label="Close dialog" data-testid="button-close-dialog"><X /></button>
            </div>
            {modal === 'new-case' && (
              <form onSubmit={(event) => { event.preventDefault(); submitCase(); }}>
                <label className="form-label" htmlFor="case-name">Patient or case name</label>
                <input className="form-field" id="case-name" value={caseName} onChange={(event) => setCaseName(event.target.value)} placeholder="e.g. Evening consultation" data-testid="input-case-name" autoFocus />
                <label className="form-label" htmlFor="main-complaint">Main complaint</label>
                <textarea className="form-field" id="main-complaint" value={complaint} onChange={(event) => setComplaint(event.target.value)} placeholder="What brought them in today?" data-testid="input-main-complaint" />
                <div className="modal-actions">
                  <button className="modal-button" type="button" onClick={closeModal} data-testid="button-cancel-case">Cancel</button>
                  <button className="modal-button submit" type="submit" data-testid="button-save-case">Create case</button>
                </div>
              </form>
            )}
            {modal === 'quick' && (
              <form onSubmit={(event) => { event.preventDefault(); closeModal(); showToast('Repertory search prepared'); }}>
                <label className="form-label" htmlFor="symptoms">Symptoms or rubrics</label>
                <input className="form-field" id="symptoms" placeholder="Start typing a symptom..." data-testid="input-symptoms" autoFocus />
                <div className="modal-actions"><button className="modal-button" type="button" onClick={closeModal} data-testid="button-cancel-quick">Cancel</button><button className="modal-button submit" type="submit" data-testid="button-start-search">Start search</button></div>
              </form>
            )}
            {modal === 'analysis' && (
              <>
                <div className="modal-detail"><Stethoscope aria-hidden="true" size={17} /> AI Analysis can help organize observations and surface connections. Always use your clinical judgment.</div>
                <div className="modal-actions"><button className="modal-button" type="button" onClick={closeModal} data-testid="button-cancel-analysis">Not now</button><button className="modal-button submit" type="button" onClick={() => { closeModal(); showToast('AI analysis workspace opened'); }} data-testid="button-open-analysis">Open analysis</button></div>
              </>
            )}
            {modal === 'chat' && (
              <form onSubmit={(event) => { event.preventDefault(); closeModal(); showToast('AI Chat is ready'); }}>
                <label className="form-label" htmlFor="chat-question">Your question</label>
                <textarea className="form-field" id="chat-question" placeholder="Ask about a remedy, rubric, or study topic..." data-testid="input-chat-question" autoFocus />
                <div className="modal-actions"><button className="modal-button" type="button" onClick={closeModal} data-testid="button-cancel-chat">Cancel</button><button className="modal-button submit" type="submit" data-testid="button-open-chat">Open chat</button></div>
              </form>
            )}
            {modal === 'case-detail' && (
              <>
                <div className="modal-detail"><strong>Main complaint</strong><br />Quick repertorization<br /><br /><strong>Last updated</strong><br />August 23, 2026</div>
                <div className="modal-actions"><button className="modal-button" type="button" onClick={closeModal} data-testid="button-close-case-detail">Close</button><button className="modal-button submit" type="button" onClick={() => { closeModal(); navigate('Cases'); }} data-testid="button-open-case">Open case</button></div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return <Dashboard />;
}
