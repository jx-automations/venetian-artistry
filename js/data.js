/*
  data.js — all content for Venetian Artistry lives here as plain JS objects.
  ---------------------------------------------------------------------------
  Update copy, prices, or swap images by editing this file only — no HTML/CSS
  changes required. Image paths point at assets/images (curated exports) and
  assets/videos (compressed clips). This shape is intentionally simple so it
  can migrate into a Shopify-backed catalogue later if needed.

  IMPORTANT: every image referenced below is a real photo or a real
  frame pulled from George's own project videos — nothing here is stock
  photography. Where no real asset exists for a category, `image: null`
  is used deliberately and the page renders a labeled placeholder instead
  of a mismatched photo.
*/

// ---------------------------------------------------------------------------
// FINISHES — the 7 standard Venetian plaster techniques offered.
// Descriptions are generic-but-accurate (not copied from any reference site)
// and are not claimed to be unique to this business.
// ---------------------------------------------------------------------------
const FINISHES = [
  {
    slug: "marmorino",
    name: "Marmorino",
    tier: "classic",
    tagline: "Ground marble in slaked lime, the original Venetian plaster",
    description:
      "Marmorino is a lime-based plaster loaded with fine crushed marble aggregate, applied in thin layered coats and burnished to a soft sheen. It reads as a cloudy, mineral surface with gentle depth rather than a flat painted wall. Because it's breathable and naturally antimicrobial, it suits bathrooms, kitchens and feature walls alike.",
    image: "assets/images/finish-marmorino.jpg",
    gallery: ["assets/images/finish-marmorino.jpg", "assets/images/finish-marmorino-macro.jpg"],
  },
  {
    slug: "grassello",
    name: "Grassello (Polished / High-Gloss)",
    tier: "premium",
    tagline: "Multi-coat lime putty, trowel-burnished to a glass-like finish",
    description:
      "Grassello di calce is aged lime putty applied in successive fine coats and compressed with a steel trowel until the surface takes on a deep, glass-like polish. The result catches light the way honed stone does, with subtle cloud-like variation beneath the sheen. It's a slower, more technical finish suited to feature walls and spaces where light is part of the design.",
    image: "assets/images/finish-grassello-detail.jpg",
    gallery: ["assets/images/finish-grassello-detail.jpg", "assets/images/finish-grassello-glossy.jpg"],
  },
  {
    slug: "stucco-italiano",
    name: "Stucco Italiano",
    tier: "premium",
    tagline: "A refined, slightly waxed lime-plaster finish",
    description:
      "Stucco Italiano sits between Marmorino and Grassello — a fine-grain lime plaster applied in multiple coats and finished with a light wax or soap seal for a soft, refined sheen. It's more forgiving to apply evenly across large wall runs than a full high-gloss polish, while still reading as a premium hand-finished surface.",
    image: null,
    gallery: [],
  },
  {
    slug: "exotic-marmorino",
    name: "Exotic Marmorino",
    tier: "exotic",
    tagline: "Hand-burnished, multi-coat Marmorino with metallic or mica detail",
    description:
      "Exotic Marmorino builds on the standard technique with additional hand-worked coats, deeper burnishing, and optional mica flake or metallic mineral additives folded through the mix. The extra coats and hand-finishing time produce a richer, more dimensional surface than standard Marmorino — the tier reserved for feature walls meant to be the room's focal point.",
    image: "assets/images/finish-exotic-dark-column.jpg",
    gallery: ["assets/images/finish-exotic-dark-column.jpg"],
  },
  {
    slug: "tuscano",
    name: "Tuscano",
    tier: "classic",
    tagline: "A rustic, matte, heavily-textured lime finish",
    description:
      "Tuscano is applied with a looser, more expressive trowel technique that leaves visible movement and texture in the surface rather than smoothing it away. Finished matte rather than polished, it reads as warm and tactile — closer to old-world plasterwork than a contemporary polished wall — and suits rustic, Mediterranean or heritage-leaning interiors.",
    image: "assets/images/finish-tuscano-swatch.jpg",
    gallery: ["assets/images/finish-tuscano-swatch.jpg", "assets/images/finish-classic-texture.jpg"],
  },
  {
    slug: "concrete-look",
    name: "Concrete-Look",
    tier: "premium",
    tagline: "The raw, minimal aesthetic of polished concrete — without the slab",
    description:
      "Concrete-look plaster mimics the flat, industrial character of poured concrete — subtle cloud variation, a matte-to-satin surface, fine hairline movement — while remaining a thin, lightweight coating applied over existing walls or ceilings. It suits the pared-back, architectural interiors currently popular in new-build and renovation work alike.",
    image: null,
    gallery: [],
  },
  {
    slug: "microcement",
    name: "Microcement",
    tier: "premium",
    tagline: "A seamless mineral coating for floors, walls and wet areas",
    description:
      "Microcement is a cement-polymer coating applied in a few millimetres over almost any existing substrate — floors, walls, benchtops, even bathroom niches — to create a continuous, joint-free surface. It's dense, wear-resistant and fully waterproofed when sealed, which makes it a common choice for bathrooms and kitchens as well as feature floors.",
    image: "assets/images/process-site-microcement.jpg",
    gallery: ["assets/images/process-site-microcement.jpg"],
  },
];

// ---------------------------------------------------------------------------
// PROJECTS — real completed and in-progress work, pulled from source photos
// and video frames. No client names, addresses or testimonials are used.
// ---------------------------------------------------------------------------
const PROJECTS = [
  {
    slug: "arched-feature-wall",
    title: "Sydney Residence — Arched Feature Wall",
    category: "Residential",
    finishTags: ["marmorino", "exotic-marmorino"],
    description:
      "A run of hand-formed plaster archways finished in a fine polished lime plaster, with a concealed LED strip washing light down the curve of the plasterwork.",
    image: "assets/images/hero-arch-niche.jpg",
    gallery: [
      "assets/images/hero-arch-niche.jpg",
      "assets/images/project-arch-feature.jpg",
      "assets/images/finish-led-edge-detail.jpg",
    ],
    featured: true,
  },
  {
    slug: "olive-plaster-bathroom",
    title: "Sydney Bathroom — Polished Plaster Niche",
    category: "Residential",
    finishTags: ["marmorino"],
    description:
      "A recessed storage niche and toilet surround finished in a deep olive polished plaster, set against stone floor and wall tile with integrated warm lighting.",
    image: "assets/images/project-bathroom-niche.jpg",
    gallery: ["assets/images/project-bathroom-niche.jpg"],
    featured: true,
  },
  {
    slug: "commercial-fitout-ceiling",
    title: "Commercial Fit-Out — Polished Ceiling",
    category: "Commercial",
    finishTags: ["exotic-marmorino", "concrete-look"],
    description:
      "A full ceiling and cornice run finished in a dark, cloud-textured polished plaster for a commercial space — showing the same technique scales from feature walls to full-room application.",
    image: "assets/images/project-commercial-ceiling.jpg",
    gallery: ["assets/images/project-commercial-ceiling.jpg"],
    featured: true,
  },
  {
    slug: "feature-column",
    title: "Feature Column — Hand-Burnished Dark Plaster",
    category: "Residential",
    finishTags: ["exotic-marmorino"],
    description:
      "A free-standing round column hand-finished in a dark, high-burnish plaster — process shot showing the multi-pass trowel technique mid-application.",
    image: "assets/images/process-hand-application.jpg",
    gallery: ["assets/images/process-hand-application.jpg", "assets/images/finish-exotic-dark-column.jpg"],
    featured: true,
  },
  {
    slug: "arched-niche-row-daylight",
    title: "Sydney Build — Arched Niche Row",
    category: "Residential",
    finishTags: ["marmorino", "tuscano"],
    description:
      "A second angle on the same archway build in natural daylight, showing the plasterwork before feature lighting was installed — a clean example of the surface's texture and form on its own.",
    image: "assets/images/project-arch-row.jpg",
    gallery: ["assets/images/project-arch-row.jpg"],
    featured: false,
  },
  {
    slug: "retail-fitout-shelving",
    title: "Retail Fit-Out — Curved Display Shelving",
    category: "Commercial",
    finishTags: ["concrete-look", "microcement"],
    description:
      "Curved, hand-formed plaster shelving for a retail display wall, finished in a raw trowelled texture with integrated LED shelf lighting.",
    image: "assets/images/project-retail-shelving.jpg",
    gallery: ["assets/images/project-retail-shelving.jpg"],
    featured: false,
  },
];

// ---------------------------------------------------------------------------
// PROCESS — how a project runs, start to finish.
// ---------------------------------------------------------------------------
const PROCESS_STEPS = [
  {
    step: 1,
    title: "Consult",
    description:
      "A conversation about the space, the finish you're drawn to, and the practical constraints — surface condition, timeline, budget range.",
  },
  {
    step: 2,
    title: "Sample & Quote",
    description:
      "A physical sample board in the finish and tone under consideration, alongside a written quote based on an on-site inspection.",
  },
  {
    step: 3,
    title: "Surface Preparation",
    description:
      "Existing surfaces are assessed, patched and primed as needed. Plaster only performs as well as the substrate underneath it.",
  },
  {
    step: 4,
    title: "Application",
    description:
      "Multiple thin coats are hand-applied and worked with a steel trowel, with drying time between passes depending on the finish.",
  },
  {
    step: 5,
    title: "Reveal",
    description:
      "Final burnishing, sealing where required, and a walkthrough of the finished surface and any care instructions.",
  },
];

// ---------------------------------------------------------------------------
// VIDEO_GALLERY — "In the Studio" homepage section. One entry per usable
// clip; poster is the keeper still already extracted from that same clip
// so there's never a black box before playback starts.
// ---------------------------------------------------------------------------
const VIDEO_GALLERY = [
  {
    src: "assets/videos/studio-arch-niche.mp4",
    poster: "assets/images/hero-arch-niche.jpg",
    caption: "Arched niche reveal, feature lighting installed",
  },
  {
    src: "assets/videos/studio-column-application.mp4",
    poster: "assets/images/process-hand-application.jpg",
    caption: "Hand-burnishing a column in a dark polished finish",
  },
  {
    src: "assets/videos/studio-arch-row.mp4",
    poster: "assets/images/project-arch-row.jpg",
    caption: "Archway run in natural light, ahead of feature lighting",
  },
  {
    src: "assets/videos/studio-ceiling-commercial.mp4",
    poster: "assets/images/project-commercial-ceiling.jpg",
    caption: "Full ceiling run, commercial fit-out",
  },
  {
    src: "assets/videos/studio-texture-macro.mp4",
    poster: "assets/images/finish-marmorino-macro.jpg",
    caption: "Cross-lit macro detail, polished lime plaster",
  },
  {
    src: "assets/videos/studio-texture-trowel.mp4",
    poster: "assets/images/finish-tuscano-swatch.jpg",
    caption: "Trowel texture, rustic matte finish",
  },
  {
    src: "assets/videos/studio-texture-rustic.mp4",
    poster: "assets/images/finish-classic-texture.jpg",
    caption: "Close detail, classic textured finish",
  },
  {
    src: "assets/videos/studio-cream-application.mp4",
    poster: "assets/images/process-plaster-application.jpg",
    caption: "Coat application in progress",
  },
  {
    src: "assets/videos/studio-microcement-site.mp4",
    poster: "assets/images/process-site-microcement.jpg",
    caption: "Microcement job mid-build",
  },
];

// ---------------------------------------------------------------------------
// PRICING — PLACEHOLDER PRICING based on general Sydney market research.
// Verify with George before going live. All figures are $/m² material +
// labour combined, exclusive of GST, and are indicative only — see the
// mandatory disclaimer rendered alongside every estimate.
// ---------------------------------------------------------------------------
const PRICING = {
  classic: {
    low: 120,
    high: 160,
    label: "Classic",
    finishes: ["Marmorino", "Tuscano", "standard textured finishes"],
  },
  premium: {
    low: 160,
    high: 200,
    label: "Premium",
    finishes: ["Grassello (polished)", "Stucco Italiano", "Concrete-look", "Microcement"],
  },
  exotic: {
    low: 200,
    high: 260,
    label: "Exotic / Master",
    finishes: ["Exotic Marmorino", "mica flake", "complex multi-coat hand-burnished finishes"],
  },
  commercialMultiplier: 1.1, // +10% for commercial access/logistics
};

const PROJECT_TYPES = [
  { value: "feature-wall", label: "Feature Wall" },
  { value: "full-room", label: "Full Room" },
  { value: "multiple-rooms", label: "Multiple Rooms" },
  { value: "commercial-space", label: "Commercial Space" },
];

// ---------------------------------------------------------------------------
// BUSINESS — confirmed real details only. Anything not explicitly provided
// stays marked as a placeholder rather than invented.
// ---------------------------------------------------------------------------
const BUSINESS = {
  name: "Venetian Artistry",
  ownerName: "George",
  phoneDisplay: "0450 787 322",
  phoneHref: "tel:+61450787322",
  instagramHandle: "@venetian.artistry",
  instagramUrl: "https://www.instagram.com/venetian.artistry",
  serviceArea: "Sydney, NSW",
  logo: "assets/logo/venetian-artistry-logo.jpg",
};
