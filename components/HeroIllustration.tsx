export function HeroIllustration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="210" cy="210" r="190" stroke="#CA7D84" strokeWidth="1" opacity="0.28" />
      <circle cx="210" cy="210" r="150" stroke="#CA7D84" strokeWidth="1" opacity="0.18" />

      <rect x="192" y="56" width="36" height="20" rx="2" stroke="#E3C9B0" strokeWidth="1.6" />
      <circle cx="210" cy="66" r="3" fill="#E3C9B0" />

      <path d="M210 76v168" stroke="#E3C9B0" strokeWidth="1.8" strokeLinecap="round" />

      <path
        d="M210 96L108 124M210 96L312 124"
        stroke="#E3C9B0"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <g>
        <path d="M86 124h60" stroke="#C9A66B" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M91 124l-18 40c0 14 12 24 25 24s25-10 25-24l-18-40"
          stroke="#C9A66B"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </g>
      <g>
        <path d="M282 124h60" stroke="#C9A66B" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M287 124l-18 40c0 14 12 24 25 24s25-10 25-24l-18-40"
          stroke="#C9A66B"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </g>

      <path
        d="M162 330c0-19 20-32 48-32s48 13 48 32"
        stroke="#CA7D84"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect x="148" y="330" width="124" height="12" rx="2" stroke="#CA7D84" strokeWidth="1.8" />

      <g opacity="0.95">
        <rect
          x="98"
          y="206"
          width="76"
          height="94"
          rx="3"
          fill="#2E0F12"
          stroke="#E3C9B0"
          strokeWidth="1.5"
          transform="rotate(-8 98 206)"
        />
        <path
          d="M113 226l44-7M117 245l44-7M121 264l34-6"
          stroke="#E3C9B0"
          strokeWidth="1.4"
          strokeLinecap="round"
          transform="rotate(-8 98 206)"
        />
      </g>

      <g opacity="0.98">
        <rect
          x="228"
          y="210"
          width="76"
          height="94"
          rx="3"
          fill="#4A1D22"
          stroke="#E3C9B0"
          strokeWidth="1.5"
          transform="rotate(7 228 210)"
        />
        <path
          d="M243 230l44-7M247 249l44-7M251 268l34-6"
          stroke="#E3C9B0"
          strokeWidth="1.4"
          strokeLinecap="round"
          transform="rotate(7 228 210)"
        />
        <circle
          cx="282"
          cy="286"
          r="10"
          fill="none"
          stroke="#C9A66B"
          strokeWidth="1.6"
          transform="rotate(7 228 210)"
        />
        <path
          d="M278 286l3 3 6-7"
          stroke="#C9A66B"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="rotate(7 228 210)"
        />
      </g>

      <g stroke="#CA7D84" strokeWidth="1.4" opacity="0.7">
        <path d="M70 70l10 10M78 62l10 10" strokeLinecap="round" />
        <path d="M340 340l10 10M348 332l10 10" strokeLinecap="round" />
      </g>
    </svg>
  );
}
