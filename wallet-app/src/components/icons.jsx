const svg = (props, children) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
);

export const HomeIcon = (p) =>
  svg(p, (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </>
  ));

export const TaskIcon = (p) =>
  svg(p, (
    <>
      <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 7.7l5.4-.8z" />
    </>
  ));

export const CrownIcon = (p) =>
  svg(p, (
    <>
      <path d="M3 7l4 4 5-6 5 6 4-4v9H3z" />
      <path d="M3 19h18" />
    </>
  ));

export const DepositIcon = (p) =>
  svg(p, (
    <>
      <path d="M12 5v14" />
      <path d="M19 12l-7 7-7-7" />
    </>
  ));

export const WithdrawIcon = (p) =>
  svg(p, (
    <>
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </>
  ));

export const WalletIcon = (p) =>
  svg(p, (
    <>
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
    </>
  ));

export const HistoryIcon = (p) =>
  svg(p, (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l3 2" />
    </>
  ));

export const HotelIcon = (p) =>
  svg(p, (
    <>
      <path d="M3 21V7l6 4V7l6 4V3h6v18" />
      <path d="M7 21v-4m6 4v-4m6 4v-4" />
    </>
  ));

export const MapPinIcon = (p) =>
  svg(p, (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ));

export const StarIcon = (p) =>
  svg(p, (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
  ));

export const MoonIcon = (p) =>
  svg(p, (
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  ));

export const SunIcon = (p) =>
  svg(p, (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </>
  ));

export const UserIcon = (p) =>
  svg(p, (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </>
  ));

export const KeyIcon = (p) =>
  svg(p, (
    <>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="M21 2l-9.6 9.6" />
      <path d="M15.5 7.5l3 3L22 7l-3-3" />
    </>
  ));

export const InviteIcon = (p) =>
  svg(p, (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </>
  ));
