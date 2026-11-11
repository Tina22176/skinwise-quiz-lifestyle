export const SiteFooter = () => (
      <footer className="bg-foreground text-background" role="contentinfo">
        <div className="max-w-[1100px] mx-auto px-6 pt-14 pb-8">
          <p className="font-heading italic text-[2.4rem] leading-none">Majoliepeau</p>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-background/70 max-w-[28rem]">
            Des routines simples pour comprendre ta peau, au rythme de ta vie.
          </p>

          <nav aria-label="Liens externes" className="mt-10 border-t border-background/15">
            {[
              { label: "La boutique", href: "https://majoliepeau.com" },
              { label: "Instagram", href: "https://instagram.com/majolie_peau" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center py-4 border-b border-background/15 font-heading text-[1.5rem] hover:text-gold transition-colors"
              >
                {l.label}
                <span aria-hidden="true" className="font-body text-[14px]">↗</span>
              </a>
            ))}
          </nav>

          <div className="mt-10 flex flex-col sm:flex-row justify-between gap-2 font-body text-[12px] text-background/50">
            <p>© 2026 Majoliepeau</p>
            <p>Ce diagnostic ne remplace pas l'avis d'un professionnel de santé.</p>
          </div>
        </div>
      </footer>
);
