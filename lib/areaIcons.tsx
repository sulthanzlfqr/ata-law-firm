import type { SVGProps, ReactElement } from "react";

type IconComponent = (props: SVGProps<SVGSVGElement>) => ReactElement;

export const areaIcons: Record<string, IconComponent> = {
  pidana: (p) => (
    <svg {...p} viewBox="0 0 40 40" fill="none">
      <path d="M20 6v22M12 12l-6 3 3 8a5 5 0 0010 0l3-8-7-3zM28 12l6 3-3 8a5 5 0 01-10 0l-3-8 7-3zM11 32h18M20 6a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  perdata: (p) => (
    <svg {...p} viewBox="0 0 40 40" fill="none">
      <rect x="9" y="7" width="22" height="27" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M14 15h12M14 20h12M14 25h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  "hukum-keluarga": (p) => (
    <svg {...p} viewBox="0 0 40 40" fill="none">
      <circle cx="15" cy="14" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="26" cy="14" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M7 33v-3a8 8 0 018-8h0M33 33v-3a8 8 0 00-8-8h0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M17.5 33v-2.5a3.5 3.5 0 117 0V33" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  ketenagakerjaan: (p) => (
    <svg {...p} viewBox="0 0 40 40" fill="none">
      <rect x="7" y="15" width="26" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M15 15v-3a3 3 0 013-3h4a3 3 0 013 3v3" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M7 21h26" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  "properti-pertanahan": (p) => (
    <svg {...p} viewBox="0 0 40 40" fill="none">
      <path d="M8 18L20 8l12 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 17v14h18V17" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M17 31v-8h6v8" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  "perbankan-keuangan": (p) => (
    <svg {...p} viewBox="0 0 40 40" fill="none">
      <path d="M6 15l14-8 14 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 15v14M16 15v14M24 15v14M32 15v14M6 31h28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  "kepailitan-pkpu": (p) => (
    <svg {...p} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M20 13v8l5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "merger-akuisisi": (p) => (
    <svg {...p} viewBox="0 0 40 40" fill="none">
      <circle cx="14" cy="20" r="7" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="26" cy="20" r="7" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  "kekayaan-intelektual": (p) => (
    <svg {...p} viewBox="0 0 40 40" fill="none">
      <path d="M20 7l3.5 8.5L32 17l-6 6 1.5 9-7.5-4.5L12 32l1.5-9-6-6 8.5-1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  "tata-usaha-negara": (p) => (
    <svg {...p} viewBox="0 0 40 40" fill="none">
      <path d="M20 5l13 6v3H7v-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M9 14v14M16 14v14M24 14v14M31 14v14M6 32h28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  "persaingan-usaha": (p) => (
    <svg {...p} viewBox="0 0 40 40" fill="none">
      <path d="M20 6v6M20 28v6M6 20h6M28 20h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
};

export const defaultIcon: IconComponent = (p) => (
  <svg {...p} viewBox="0 0 40 40" fill="none">
    <rect x="9" y="7" width="22" height="27" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M14 15h12M14 20h12M14 25h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

export function getAreaIcon(slug: string): IconComponent {
  return areaIcons[slug] || defaultIcon;
}
