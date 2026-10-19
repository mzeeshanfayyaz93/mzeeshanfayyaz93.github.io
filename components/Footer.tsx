import { Mail, MapPin, Phone } from "lucide-react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./Icons";
import { profile } from "@/lib/content";

const nav = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Client work", "#work"],
  ["Reviews", "#reviews"],
  ["Contact", "#contact"],
] as const;

export default function Footer() {
  return (
    <footer className="mt-4 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-xl font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-accent">{profile.title}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Building fast, multilingual websites, Shopify and WordPress themes, trading integrations and automation for clients in Dubai and around the world.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { href: profile.linkedin, label: "LinkedIn", icon: <LinkedInIcon className="h-[18px] w-[18px]" /> },
              { href: profile.github, label: "GitHub", icon: <GitHubIcon className="h-[18px] w-[18px]" /> },
              { href: profile.whatsapp, label: "WhatsApp", icon: <WhatsAppIcon className="h-[18px] w-[18px]" /> },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="glass grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:text-accent">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {nav.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-muted transition-colors hover:text-accent">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Get in touch</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-accent">
                <Mail className="h-4 w-4 text-accent" /> {profile.email}
              </a>
            </li>
            <li>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-accent">
                <Phone className="h-4 w-4 text-accent" /> {profile.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-muted">
              <MapPin className="h-4 w-4 text-accent" /> {profile.location} · {profile.jobType}
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-line pb-24 pt-6 text-center text-xs text-muted sm:pb-6">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <a href="#top" className="mt-2 inline-block text-accent hover:underline">
          Back to top
        </a>
      </div>
    </footer>
  );
}
