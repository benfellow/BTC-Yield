import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Smooth scrolling logic for internal links
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const navbarHeight = document.querySelector('.navbar')?.clientHeight || 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleNavClick);

    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll('.engine-card, .fee-statement');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.transitionDelay = `${index * 0.15}s`;
      sectionObserver.observe(card);
    });

    return () => {
      document.removeEventListener('click', handleNavClick);
      sectionObserver.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubmitting(true);
      // Mock API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        setEmail('');
        setTimeout(() => setShowSuccess(false), 5000);
      }, 1500);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">
            <div className="logo-icon"></div>
            <span>HODL<span className="highlight">Yield</span></span>
          </div>
          <ul className="nav-links">
            <li><a href="#hero">The Problem</a></li>
            <li><a href="#engine">The Engine</a></li>
            <li><a href="#fees">Transparency</a></li>
            <li><a href="#cta" className="nav-cta">Verify Now</a></li>
          </ul>
        </div>
      </nav>

      <main>
        {/* Section 1: The Hero */}
        <section id="hero" className="hero-section">
          <div className="animated-bg"></div>
          <div className="container hero-content">
            <div className="hero-text-content">
              <h1 className="hero-title">Stop Settling for <span className="highlight break-word">Boring Stablecoin Yields.</span></h1>
              <p className="hero-subtitle">
                Current DeFi offers give you 4-5% while keeping you on the sidelines. We generate <span className="highlight">30%+</span> USDC returns through automated, concentrated liquidity management.
              </p>
              <ul className="hero-benefits">
                <li>
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Best in class asset : WBTC
                </li>
                <li>
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Fees paid in USDC
                </li>
                <li>
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Personalized account management available
                </li>
              </ul>
              <a href="#cta" className="btn btn-primary hero-btn">Explore The Vault</a>
            </div>
          </div>
        </section>

        {/* Section 2: The Engine */}
        <section id="engine" className="engine-section">
          <div className="container">
            <div className="section-header">
              <h2>How We Generate Premium Yield</h2>
            </div>

            <div className="cards-grid">
              {/* Step 1 */}
              <div className="engine-card">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6"></path><path d="M18 20v-5a2 2 0 0 1 2-2h4v7a2 2 0 0 1-2 2h-4"></path><path d="M18 22h-4"></path><path d="M18 13h-4"></path></svg>
                </div>
                <h3>Deposit USDC</h3>
                <p>You supply USDC into our secure, audited ERC-4626 standard smart contract vault. Your funds remain entirely under your control. Our contract only has the authority to direct the liquidity position, meaning you can withdraw your capital at any time without restriction.</p>
              </div>

              {/* Step 2 */}
              <div className="engine-card">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18 9l-5 5-4-4-5 5"></path><path d="M18 9h-5"></path><path d="M18 9v5"></path></svg>
                </div>
                <h3>Active LP Management</h3>
                <p>The vault deploys capital into a high-efficiency WBTC/USDC concentrated liquidity position on Uniswap. By keeping the range tight around current price action, we capture maximum trading fees.</p>
              </div>

              {/* Step 3 */}
              <div className="engine-card">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M14.83 9.17c-1.12-1-2.9-1.25-4.56-.83-1.65.42-2.9 1.77-3.1 3.44a3.86 3.86 0 0 0 .83 3.32c1 1.25 2.7 1.66 4.3 1.25 1.66-.4 3.1-1.6 3.3-3.05.2-1.3-.3-2.6-1.1-3.6z"></path><path d="M10 5.5v2"></path><path d="M14 5.5v2"></path><path d="M10 16.5v2"></path><path d="M14 16.5v2"></path><path d="M8 12h8"></path></svg>
                </div>
                <h3>The Strategy</h3>
                <p>Market flat or up? You keep stacking high USDC yields. Market dips? The vault automatically uses your USDC to buy WBTC at a discount—exactly when you want to be DCAing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Transparency & Fees */}
        <section id="fees" className="fees-section">
          <div className="container">
            <div className="section-header">
              <h2>Transparent Automation. <span className="highlight">Transparent Fees.</span></h2>
              <p className="section-description">Managing high-yield concentrated liquidity requires constant monitoring, rebalancing, and gas management. We handle the heavy lifting so you don't have to.</p>
            </div>

            <div className="fee-statement">
              <h3>We only make money when you make money.</h3>
            </div>
          </div>
        </section>

        {/* Section 4: The Call to Action */}
        <section id="cta" className="cta-section">
          <div className="pulse-ring"></div>
          <div className="container cta-content-wrapper">
            <div className="cta-content">
              <h2>Don't Trust. <span className="highlight">Verify.</span></h2>
              <p className="cta-body">
                We believe in proving our returns before asking for your capital. Enter your email below, and we will immediately send you a direct link to the live, on-chain vault. Check the current APY, verify the history, and see the mechanics for yourself.
              </p>

              <p className="cta-hook">
                <strong className="highlight">As an early supporter, signing up today whitelists your wallet for a 40% discount on all vault fees once you deposit.</strong>
              </p>

              <form id="lead-form" className="lead-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address to get the link..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Verifying...' : 'Get Vault Link & Claim Discount'}
                </button>
              </form>
              {showSuccess && (
                <div id="form-message" className="form-message">Verification link sent to your email!</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
