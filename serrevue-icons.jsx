// Simple stroke icons — inline SVG, 20x20 default viewBox
const Ic = ({ d, size = 18, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={fill} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

const Icons = {
  climate: <Ic size={16} d={<><path d="M10 2v11" /><circle cx="10" cy="15" r="3" /><path d="M10 5h3M10 8h3M10 11h3" /></>} />,
  soil:    <Ic size={16} d={<><path d="M10 2c-3 4-3 7 0 9 3-2 3-5 0-9z" /><path d="M3 15h14M5 18h10" /></>} />,
  camera:  <Ic size={16} d={<><rect x="2" y="5" width="16" height="12" rx="2" /><circle cx="10" cy="11" r="3" /><path d="M7 5l1.5-2h3L13 5" /></>} />,
  note:    <Ic size={16} d={<><rect x="4" y="3" width="12" height="14" rx="2" /><path d="M7 7h6M7 10h6M7 13h4" /></>} />,
  ingest:  <Ic size={16} d={<><path d="M4 10h12M12 6l4 4-4 4" /><circle cx="4" cy="10" r="1.5" fill="currentColor" /></>} />,
  ai:      <Ic size={16} d={<><circle cx="10" cy="10" r="4" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M4.5 15.5l1.4-1.4M14.1 5.9l1.4-1.4" /></>} />,
  risk:    <Ic size={16} d={<><path d="M10 2l8 14H2L10 2z" /><path d="M10 8v4M10 14v0.5" /></>} />,
  policy:  <Ic size={16} d={<><path d="M4 3h12l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 3z" /><path d="M7 8l2 2 4-4" /></>} />,
  pump:    <Ic size={16} d={<><circle cx="10" cy="11" r="5" /><path d="M10 6V2M7 2h6M10 16v1M6 17h8" /></>} />,
  valve:   <Ic size={16} d={<><path d="M4 10h4M12 10h4" /><rect x="8" y="6" width="4" height="8" rx="1" /><path d="M10 3v3M10 14v3" /></>} />,
  fan:     <Ic size={16} d={<><circle cx="10" cy="10" r="1.5" /><path d="M10 8.5c-1-3-3-4-5-3 1 2 2 3 5 3zM10 11.5c1 3 3 4 5 3-1-2-2-3-5-3zM8.5 10c-3 1-4 3-3 5 2-1 3-2 3-5zM11.5 10c3-1 4-3 3-5-2 1-3 2-3 5z" /></>} />,
  alert:   <Ic size={16} d={<><path d="M10 3a7 7 0 017 7v5l1 2H2l1-2v-5a7 7 0 017-7z" /><path d="M8 17a2 2 0 004 0" /></>} />,
  report:  <Ic size={16} d={<><rect x="4" y="3" width="12" height="14" rx="1.5" /><path d="M7 7h6M7 10h6M7 13h3" /></>} />,
  send:    <Ic size={14} d={<><path d="M3 10L17 3l-4 14-3-6-7-1z" /></>} />,
  check:   <Ic size={14} d={<><path d="M4 10l4 4 8-8" /></>} />,
  shield:  <Ic size={20} d={<><path d="M10 2l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V5l7-3z" /><path d="M7 10l2 2 4-4" /></>} />,
  globe:   <Ic size={20} d={<><circle cx="10" cy="10" r="8" /><path d="M2 10h16M10 2c3 3 3 13 0 16M10 2c-3 3-3 13 0 16" /></>} />,
  layers:  <Ic size={20} d={<><path d="M10 3l7 3.5L10 10 3 6.5 10 3z" /><path d="M3 10l7 3.5L17 10M3 13.5l7 3.5 7-3.5" /></>} />,
  lock:    <Ic size={20} d={<><rect x="4" y="9" width="12" height="9" rx="2" /><path d="M7 9V6a3 3 0 016 0v3" /></>} />,
  spark:   <Ic size={14} d={<><path d="M10 2v4M10 14v4M2 10h4M14 10h4M4.5 4.5l2.8 2.8M12.7 12.7l2.8 2.8M4.5 15.5l2.8-2.8M12.7 7.3l2.8-2.8" /></>} />,
  bolt:    <Ic size={14} d={<><path d="M11 2L4 11h4l-1 7 7-9h-4l1-7z" /></>} />,
  search:  <Ic size={14} d={<><circle cx="9" cy="9" r="5" /><path d="M13 13l4 4" /></>} />,
};

window.Icons = Icons;
