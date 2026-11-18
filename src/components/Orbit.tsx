// Project each circular path onto the same inclined plane. Only the small
// markers rotate. The drawing and its registration marks stay in focus.
const tracks = [
  { radius: 125, phase: 162, duration: '21s' },
  { radius: 177, phase: 256, duration: '32s', reverse: true },
  { radius: 234, phase: 14, duration: '46s' },
];

export function Orbit() {
  return (
    <div className="orbit-plate">
      <svg className="orbit-drawing" viewBox="0 0 580 450" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="plot-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".8" fill="#5D7E98" opacity=".52" />
          </pattern>
        </defs>
        <rect x="20" y="20" width="540" height="410" fill="url(#plot-dots)" />
        <g className="registration" fill="none">
          <path d="M20 34V20h14m512 0h14v14M20 416v14h14m512 0h14v-14" />
          <path d="M40 333 540 116M142 44l296 362" strokeDasharray="3 8" opacity=".65" />
        </g>
        <g transform="translate(290 230) rotate(-23) scale(1 .56)">
          {tracks.map(({ radius, phase, duration, reverse }) => (
            <g key={radius}>
              <circle className="orbit-track" r={radius} />
              <g transform={`rotate(${phase})`}>
                <g className="traveller" style={{ animationDuration: duration, animationDirection: reverse ? 'reverse' : 'normal' }}>
                  <path
                    d={`M ${radius} 0 A ${radius} ${radius} 0 0 ${reverse ? 1 : 0} ${radius * .866} ${(reverse ? radius : -radius) / 2}`}
                    className="orbit-trail"
                  />
                  <ellipse cx={radius} rx="5" ry="8" fill="#F4F4F1" />
                </g>
              </g>
            </g>
          ))}
          {Array.from({ length: 60 }, (_, tick) => (
            <path key={tick} d={tick % 5 === 0 ? 'M243 0h8' : 'M243 0h3'} transform={`rotate(${tick * 6})`} className="dial-tick" />
          ))}
        </g>
        <g className="core">
          {[22, 11].map((offset) => (
            <path key={offset} d="M209 217l80-36 83 35-80 39z" transform={`translate(0 ${offset})`} fill="#262A30" stroke="#5D7E98" />
          ))}
          <path d="m209 209 80-36 83 35-80 39z" fill="#5D7E98" />
          <path d="m209 209 83 38v10l-83-38z" fill="#466278" />
          <path d="m292 247 80-39v10l-80 39z" fill="#354D61" />
          <image href="/marca/isotipo.svg" width="92" height="92" transform="matrix(.81 .36 -.71 .33 285 178)" />
        </g>
      </svg>
    </div>
  );
}
