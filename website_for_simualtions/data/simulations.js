/* =========================================================================
   SIMULATIONS MANIFEST: the single source of truth for the whole site.
   To add a YouTube video to a simulation, just paste its video ID into the
   `youtube` field below (the ID is the part after "v=" in a YouTube URL,
   e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  'dQw4w9WgXcQ').
   No other file needs editing.
   ========================================================================= */

/* -------------------------------------------------------------------------
   ⭐ WHAT IS LIVE RIGHT NOW
   Only the simulation ids listed below actually appear on the website.
   Everything else stays safely in the manifest, ready and waiting. To
   publish one, just add its id to this list and refresh.
   Put the string 'all' instead of the list to publish everything again:
       const PUBLISHED = 'all';
   ------------------------------------------------------------------------- */
const PUBLISHED = ['magnets-grade-10', 'projectile-motion', 'constrained-motion'];

/* -------------------------------------------------------------------------
   GRADES: the top level of the site. Every grade gets its own dropdown on
   the home page, even before anything is published inside it. A simulation
   lands in a grade through its own `grade:` field below.
   ------------------------------------------------------------------------- */
const GRADES = [
  { grade: 10, name: 'Grade 10', color: '#4f9dff',
    tagline: 'Where it begins: magnets, light and the first big ideas.' },
  { grade: 11, name: 'Grade 11', color: '#a06bff',
    tagline: 'Mechanics and vectors: motion, forces and machines in full.' },
  { grade: 12, name: 'Grade 12', color: '#ff5d8f',
    tagline: 'Fields, circuits and the invisible made visible.' },
];

const TOPICS = [
  { id: 'mechanics',      name: 'Mechanics',      emoji: '⚙️', color: '#ff7a59',
    tagline: 'Forces, friction & motion you can feel.' },
  { id: 'vectors',        name: 'Vectors',        emoji: '➡️', color: '#12b5b0',
    tagline: 'Arrows with attitude: direction meets magnitude.' },
  { id: 'ac-circuits',    name: 'AC Circuits',    emoji: '🔌', color: '#a06bff',
    tagline: 'Currents that dance back and forth.' },
  { id: 'electricity',    name: 'Electricity',    emoji: '⚡', color: '#f5a623',
    tagline: 'Follow the charge through the network.' },
  { id: 'electrostatics', name: 'Electrostatics', emoji: '🧲', color: '#ff5d8f',
    tagline: 'Invisible fields, visible at last.' },
  { id: 'magnetism',      name: 'Magnetism',      emoji: '🌀', color: '#4f9dff',
    tagline: 'Where moving charges make magic.' },
  { id: 'optics',         name: 'Optics',         emoji: '🔭', color: '#2ecc71',
    tagline: 'Bend light, trick the eye, form an image.' },
];

const SIMS = [
  /* ---------------- MECHANICS ---------------- */
  { id: 'projectile-motion', topic: 'mechanics', grade: 11, title: 'Projectile Motion',
    blurb: 'One arc, two independent motions. Set the launch and watch.',
    story: 'Horizontal motion is steady, vertical motion is pulled by gravity, and together they draw the arc. Choose a case (level ground, a tower down to a platform, or a slope), set the speed and angle, then scrub through the flight and read T, H and R straight off the picture. Turn on the components, the twin angle and the predicted path to see why 30° and 60° land in the same place.',
    path: '../projectile_motion/index.html',
    thumb: '',
    youtube: '' },

  { id: 'friction-lab', topic: 'mechanics', grade: 11, title: 'Friction Lab',
    blurb: 'Friction always opposes RELATIVE motion. See it in action.',
    story: 'Push a block, tilt the surface, change the grip. Watch how friction is never a fixed number, it grows and shrinks to fight relative sliding, right up until things break loose.',
    path: '../friction/friction_lab.html',
    thumb: '../friction/Screenshot 2026-07-20 221114.png',
    youtube: '' },

  { id: 'pseudo-force', topic: 'mechanics', grade: 11, title: 'Pseudo Force',
    blurb: 'Why you lurch when the bus brakes: forces in an accelerating frame.',
    story: 'Step inside an accelerating box. Suddenly a "ghost" force appears that isn\'t really there. Learn when you\'re allowed to invent pseudo forces and how they make non-inertial frames behave.',
    path: '../pseudo_force/pseudo_force.html',
    thumb: '../pseudo_force/Screenshot 2025-07-20 112810 (1).png',
    youtube: '' },

  { id: 'constrained-motion', topic: 'mechanics', grade: 11, title: 'Movable Pulley Constraint',
    blurb: 'Strings, pulleys and wedges: how motion gets linked together.',
    story: 'When bodies are tied by strings or ride on wedges, their motions are locked to each other. Play with the constraints and discover the hidden relationships between their velocities and accelerations.',
    path: '../constrained_motion/constrained_motion_lab.html',
    thumb: '',
    youtube: '' },

  { id: 'movable-pulley', topic: 'mechanics', grade: 11, title: 'Movable Pulley',
    blurb: 'The classic 2:1 machine, trade force for distance.',
    story: 'A movable pulley halves the force but doubles the distance. Pull the rope and watch the mechanical advantage appear before your eyes.',
    path: '../constrained_motion/movable_pulley_simulation.html',
    thumb: '../constrained_motion/Screenshot 2026-07-17 181435.png',
    youtube: '' },

  /* ---------------- VECTORS ---------------- */
  { id: 'draw-a-vector', topic: 'vectors', grade: 11, title: 'Draw a Vector',
    blurb: 'Your first arrow: magnitude, direction and components.',
    story: 'Grab the tip and drag. See how any vector breaks into x and y components, and how its length and angle are tied together.',
    path: '../intro%20to%20vectors/draw-a-vector/index.html',
    thumb: '',
    youtube: '' },

  { id: 'vector-addition', topic: 'vectors', grade: 11, title: 'Vector Addition',
    blurb: 'Tip-to-tail and the parallelogram rule, live.',
    story: 'Add two arrows and watch the resultant form. Switch between the triangle and parallelogram methods and see why they always agree.',
    path: '../intro%20to%20vectors/vector-addition/index.html',
    thumb: '',
    youtube: '' },

  { id: 'dot-product', topic: 'vectors', grade: 11, title: 'Dot Product',
    blurb: 'How much of B points along A? Rotate and watch A·B swing.',
    story: 'The scalar product measures alignment. Spin one vector and watch the dot product peak, vanish at 90°, and go negative when they oppose.',
    path: '../intro%20to%20vectors/dot-product/index.html',
    thumb: '',
    youtube: '' },

  { id: 'cross-product', topic: 'vectors', grade: 11, title: 'Cross Product',
    blurb: 'The area, the perpendicular, and the right-hand rule.',
    story: 'The cross product points out of the plane and its length is the area of the parallelogram. Rotate the vectors and feel the right-hand rule click into place.',
    path: '../intro%20to%20vectors/cross-product/index.html',
    thumb: '',
    youtube: '' },

  /* ---------------- AC CIRCUITS ---------------- */
  { id: 'lc-circuit', topic: 'ac-circuits', grade: 12, title: 'LC Circuit',
    blurb: 'Energy sloshing between capacitor and inductor, pure oscillation.',
    story: 'No resistor, no losses. Charge sloshes back and forth between the capacitor\'s field and the inductor\'s field forever, the electrical version of a swinging pendulum.',
    path: '../AC/lc-circuit.html',
    thumb: '',
    youtube: '' },

  { id: 'lcr-circuit', topic: 'ac-circuits', grade: 12, title: 'LCR Circuit',
    blurb: 'Resonance, damping and phase: the full orchestra.',
    story: 'Add a resistor and drive it with AC. Sweep the frequency to find resonance, watch the current lead or lag the voltage, and see damping eat the oscillations.',
    path: '../AC/lcr-circuit.html',
    thumb: '',
    youtube: '' },

  { id: 'lr-circuit', topic: 'ac-circuits', grade: 12, title: 'LR Circuit',
    blurb: 'Inductors resist change, watch current ramp up.',
    story: 'An inductor hates sudden change. Flip the switch and watch current rise gradually, governed by the time constant L/R.',
    path: '../AC/lr-circuit.html',
    thumb: '',
    youtube: '' },

  { id: 'rc-circuit', topic: 'ac-circuits', grade: 12, title: 'RC Circuit',
    blurb: 'Charging and discharging: the exponential curve, live.',
    story: 'Capacitors fill and empty on an exponential curve set by RC. Charge it, discharge it, and read the time constant straight off the graph.',
    path: '../AC/rc-circuit.html',
    thumb: '',
    youtube: '' },

  /* ---------------- ELECTRICITY ---------------- */
  { id: 'resistor-cube', topic: 'electricity', grade: 12, title: 'Resistor Cube Network',
    blurb: 'The legendary cube of resistors, solved visually.',
    story: 'Twelve equal resistors on the edges of a cube. Use symmetry to fold the network flat and find the equivalent resistance across a diagonal, a classic that stumps many.',
    path: '../electrcity/index.html',
    thumb: '../electrcity/Screenshot 2026-05-26 221503.png',
    youtube: '' },

  /* ---------------- ELECTROSTATICS ---------------- */
  { id: 'dipole', topic: 'electrostatics', grade: 12, title: 'Electric Dipole',
    blurb: 'Two opposite charges and the field they weave.',
    story: 'Place a positive and negative charge side by side and reveal the beautiful looping field of a dipole, the building block of molecules and antennas.',
    path: '../electrostatics/dipole/index.html',
    thumb: '',
    youtube: '' },

  { id: 'flux', topic: 'electrostatics', grade: 12, title: 'Electric Flux',
    blurb: 'Counting field lines through a surface: Gauss made visual.',
    story: 'Flux is just field lines poking through a surface. Tilt and resize the surface to see how flux changes, and build intuition for Gauss\'s law.',
    path: '../electrostatics/flux/index.html',
    thumb: '',
    youtube: '' },

  { id: 'fields-produced', topic: 'electrostatics', grade: 12, title: 'Fields Produced',
    blurb: 'Drop charges, watch the field they create bloom.',
    story: 'Add charges anywhere and instantly see the electric field they produce. Combine them to sculpt complex field patterns.',
    path: '../electrostatics/flux/fields-produced/index.html',
    thumb: '',
    youtube: '' },

  /* ---------------- MAGNETISM ---------------- */
  { id: 'biot-savart', topic: 'magnetism', grade: 12, title: 'Biot-Savart: Straight Wire',
    blurb: 'The field curling around a current-carrying wire.',
    story: 'Send current down a wire and watch circular magnetic field loops form around it. See how the field weakens with distance, straight from the Biot-Savart law.',
    path: '../magnetics/biot_savart_straight/index.html',
    thumb: '',
    youtube: '' },

  { id: 'lorentz-motion', topic: 'magnetism', grade: 12, title: 'Lorentz Motion',
    blurb: 'Charges spiralling under the magnetic force.',
    story: 'Fire a charged particle into a magnetic field and watch it curve, circle, or spiral. Change the field and velocity to control the dance.',
    path: '../magnetics/lorentz_motion/index.html',
    thumb: '',
    youtube: '' },

  { id: 'magnets-grade-10', topic: 'magnetism', grade: 10, title: 'Magnets (Grade 10)',
    blurb: 'Poles, field lines and the basics of magnetism.',
    story: 'Explore bar magnets, their poles, and the field lines that flow from north to south, the friendly starting point for magnetism.',
    path: '../magnetics/magnets_grade_10/index.html',
    thumb: '',
    youtube: '' },

  /* ---------------- OPTICS ---------------- */
  { id: 'concave-mirror', topic: 'optics', grade: 10, title: 'Concave Mirror',
    blurb: 'Move the object, watch the image flip, shrink and grow.',
    story: 'Slide an object along the axis of a concave mirror and trace the rays. Cross the focus and centre of curvature to see real, virtual, magnified and inverted images appear.',
    path: '../geometrical_optics/concave_mirror/index.html',
    thumb: '',
    youtube: '' },

  { id: 'human-eye', topic: 'optics', grade: 10, title: 'The Human Eye',
    blurb: 'How your eye focuses, and what goes wrong.',
    story: 'See how the lens of the eye focuses light onto the retina, and explore what happens in near sightedness and far sightedness, and how glasses fix it.',
    path: '../geometrical_optics/eye/index.html',
    thumb: '',
    youtube: '' },
];

/* Expose to the page (works from file:// and GitHub Pages, no build step).
   Only PUBLISHED simulations are handed to the site; topics with nothing
   published simply don't render. SIMS_ALL keeps the full list around. */
const isLive = (s) => PUBLISHED === 'all' || PUBLISHED.indexOf(s.id) !== -1;
const LIVE_SIMS = SIMS.filter(isLive);

window.SIMS_ALL = SIMS;
window.SIMS = LIVE_SIMS;
window.TOPICS = TOPICS.filter(t => LIVE_SIMS.some(s => s.topic === t.id));
// every grade shows up, published or not: an empty one says "on the way"
window.GRADES = GRADES;
