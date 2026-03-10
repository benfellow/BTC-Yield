const Logo = ({ className = "" }) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'rotate(-45deg)' }}
    >
        {/* Bow String (Orange) */}
        <line x1="20" y1="20" x2="20" y2="80" stroke="#f7931a" strokeWidth="2" />

        {/* Bow (Black) */}
        <path
            d="M20,20 C50,20 80,40 80,50 C80,60 50,80 20,80"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
        />

        {/* Arrow (Orange) */}
        <line x1="10" y1="50" x2="85" y2="50" stroke="#f7931a" strokeWidth="3" />
        <path d="M85,50 L75,42 M85,50 L75,58" stroke="#f7931a" strokeWidth="3" strokeLinecap="round" />
        <path d="M10,45 L10,55 M15,45 L15,55" stroke="#f7931a" strokeWidth="2" />
    </svg>
);

export default Logo;
