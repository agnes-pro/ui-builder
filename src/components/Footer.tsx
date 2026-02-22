import { Link } from "react-router-dom";
import { Github, Twitter } from "lucide-react";

const navLinks = [
  { label: "Campaigns", href: "/campaigns" },
  { label: "Create", href: "/create" },
  { label: "My Profile", href: "/profile" },
];

const legalLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-orange">
                <span className="text-sm font-bold text-primary-foreground">₿</span>
              </div>
              <span className="font-display text-lg font-bold">sBTC<span className="text-primary">Fund</span></span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Decentralized crowdfunding powered by Stacks and secured by Bitcoin.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Community</h4>
            <div className="flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-success" />
              Built on Stacks
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 flex flex-col items-center gap-2 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>© 2026 sBTCFund. Powered by Stacks · Secured by Bitcoin</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
