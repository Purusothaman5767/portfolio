const sections = ["About", "Skills", "Projects", "Education", "Contact"];

const Nav = () => {
  const handleClick = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-content px-6 py-4 flex items-center justify-between">
        <span className="font-heading text-lg font-semibold tracking-tight">
          Portfolio
        </span>
        <div className="flex gap-6">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => handleClick(s)}
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
