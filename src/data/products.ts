import type { Product } from "./types";

export const products: Product[] = [
  // ─── Cameras: 35mm SLRs ─────────────────────────────────────

  {
    productId: "CAM-001",
    name: "Canon AE-1 Program (Silver)",
    category: "35mm_slr",
    price: 289.0,
    stockStatus: "in_stock",
    description:
      "The workhorse. Program mode for beginners, full manual for when you're ready. Fresh light seals, new battery, tested shutter speeds. Includes Canon FD 50mm f/1.8 lens.",
  },
  {
    productId: "CAM-002",
    name: "Nikon FM2 (Black)",
    category: "35mm_slr",
    price: 349.0,
    stockStatus: "in_stock",
    description:
      "All-mechanical, no batteries needed. 1/4000s top shutter speed. Titanium shutter curtain. The camera photojournalists swore by. CLA'd and ready to shoot.",
  },
  {
    productId: "CAM-003",
    name: "Minolta X-700",
    category: "35mm_slr",
    price: 219.0,
    stockStatus: "in_stock",
    description:
      "Underrated gem with one of the best metering systems of its era. Program, aperture-priority, and manual modes. Includes MD 50mm f/1.7.",
  },
  {
    productId: "CAM-004",
    name: "Pentax K1000",
    category: "35mm_slr",
    price: 199.0,
    stockStatus: "low_stock",
    description:
      "The camera that taught a generation to shoot. Fully mechanical, dead simple, nearly indestructible. Perfect first film camera. Includes SMC Pentax-M 50mm f/2.",
  },

  // ─── Cameras: 35mm Point & Shoot ───────────────────────────

  {
    productId: "CAM-005",
    name: "Contax T2 (Titanium)",
    category: "35mm_point_and_shoot",
    price: 1149.0,
    stockStatus: "out_of_stock",
    description:
      "The holy grail of point-and-shoots. Carl Zeiss Sonnar 38mm f/2.8 lens. Titanium body. Autofocus with manual override. These come in rarely and go fast.",
  },
  {
    productId: "CAM-006",
    name: "Olympus Stylus Epic (Champagne)",
    category: "35mm_point_and_shoot",
    price: 279.0,
    stockStatus: "in_stock",
    description:
      "Weatherproof, pocketable, and sharp. The 35mm f/2.8 lens punches way above its weight. Slide it open, point, shoot. One of the best carry-everywhere cameras made.",
  },
  {
    productId: "CAM-007",
    name: "Yashica T4 (Black)",
    category: "35mm_point_and_shoot",
    price: 489.0,
    stockStatus: "low_stock",
    description:
      "Carl Zeiss T* 35mm f/3.5 lens in a compact body. Terry Richardson's camera of choice. Super sharp, great flash, weatherproof. A real sleeper.",
  },

  // ─── Cameras: Medium Format ─────────────────────────────────

  {
    productId: "CAM-008",
    name: "Hasselblad 500C/M",
    category: "medium_format",
    price: 1899.0,
    stockStatus: "low_stock",
    description:
      "The system camera. Modular, reliable, legendary optics. Full CLA with Planar 80mm f/2.8 CF lens, waist-level finder, and A12 back. NASA put this on the moon.",
  },
  {
    productId: "CAM-009",
    name: "Mamiya RB67 Pro S",
    category: "medium_format",
    price: 749.0,
    stockStatus: "in_stock",
    description:
      "A tank with incredible optics. 6x7 negatives that you can practically read without a loupe. Rotating back, bellows focusing. The portrait photographer's secret weapon.",
  },
  {
    productId: "CAM-010",
    name: "Yashica Mat 124G",
    category: "medium_format",
    price: 399.0,
    stockStatus: "in_stock",
    description:
      "Twin-lens reflex that shoots gorgeous 6x6 square frames. Yashinon 80mm f/3.5 taking lens. Built-in meter. The most affordable entry into medium format.",
  },

  // ─── Cameras: Instant ───────────────────────────────────────

  {
    productId: "CAM-011",
    name: "Polaroid SX-70 (Brown Leather)",
    category: "instant",
    price: 349.0,
    stockStatus: "in_stock",
    description:
      "The original folding SLR instant camera. SX-70 film produces soft, painterly images. Manual focus, refurbished with new skin. A conversation piece that takes great photos.",
  },
  {
    productId: "CAM-012",
    name: "Polaroid SLR 680",
    category: "instant",
    price: 429.0,
    stockStatus: "out_of_stock",
    description:
      "The SX-70's successor with autofocus and built-in flash. Sonar AF system. Uses 600 film (easier to find). The best Polaroid ever made, if you can find one.",
  },

  // ─── Film: 35mm ─────────────────────────────────────────────

  {
    productId: "FILM-001",
    name: "Kodak Portra 400 3-Pack",
    category: "film_35mm",
    price: 38.97,
    stockStatus: "in_stock",
    description:
      "The gold standard for color negative. Beautiful skin tones, fine grain, incredible latitude. Forgives exposure mistakes. Shoot it at 200-800 and it still looks great.",
  },
  {
    productId: "FILM-002",
    name: "Fuji Superia 400 3-Pack",
    category: "film_35mm",
    price: 23.97,
    stockStatus: "in_stock",
    description:
      "Affordable, reliable, and surprisingly good. Slightly cool tones, punchy greens. A great everyday film when you don't want to think about it.",
  },
  {
    productId: "FILM-003",
    name: "Ilford HP5 Plus 400 3-Pack",
    category: "film_35mm",
    price: 33.97,
    stockStatus: "in_stock",
    description:
      "The classic B&W workhorse. Push it to 1600, pull it to 200, it handles everything. Beautiful grain structure. Pairs well with everything from street to portraits.",
  },
  {
    productId: "FILM-004",
    name: "CineStill 800T (Single Roll)",
    category: "film_35mm",
    price: 15.99,
    stockStatus: "low_stock",
    description:
      "Motion picture film re-spooled for still cameras. Tungsten-balanced for gorgeous neon and night photography. That signature halation glow around highlights. Unique look.",
  },
  {
    productId: "FILM-005",
    name: "Kodak Tri-X 400 5-Pack",
    category: "film_35mm",
    price: 59.95,
    stockStatus: "in_stock",
    description:
      "The B&W film that defined photojournalism. Contrasty, gritty, timeless. If you want that classic documentary look, this is it. Pushes beautifully to 1600.",
  },

  // ─── Film: 120 ──────────────────────────────────────────────

  {
    productId: "FILM-006",
    name: "Kodak Ektar 100 (120)",
    category: "film_120",
    price: 11.49,
    stockStatus: "in_stock",
    description:
      "Ultra-fine grain color negative. Vivid, saturated colors. Incredible for landscapes and product work in medium format. Needs good light — ISO 100, no shortcuts.",
  },
  {
    productId: "FILM-007",
    name: "Kodak Portra 160 (120)",
    category: "film_120",
    price: 10.99,
    stockStatus: "in_stock",
    description:
      "Soft, natural colors with the finest grain in the Portra family. Studio portraits, golden hour, calm light. The medium format portrait film.",
  },
  {
    productId: "FILM-008",
    name: "Ilford Delta 3200 (120)",
    category: "film_120",
    price: 12.49,
    stockStatus: "low_stock",
    description:
      "High-speed B&W for when light isn't cooperating. Pronounced grain adds texture and mood. Concert photography, dim interiors, available-light work.",
  },

  // ─── Film: Instant ──────────────────────────────────────────

  {
    productId: "FILM-009",
    name: "Polaroid 600 Film (Color, 8 Exposures)",
    category: "film_instant",
    price: 18.99,
    stockStatus: "in_stock",
    description:
      "Standard color instant film for 600-series cameras and the SLR 680. Classic Polaroid look with improved chemistry. 8 shots per pack.",
  },
  {
    productId: "FILM-010",
    name: "Polaroid SX-70 Film (Color, 8 Exposures)",
    category: "film_instant",
    price: 18.99,
    stockStatus: "in_stock",
    description:
      "Lower ISO film specifically for SX-70 cameras. Softer, more muted tones than 600 film. Do not use in 600-series cameras without an ND filter.",
  },

  // ─── Film: Super 8 ─────────────────────────────────────────

  {
    productId: "FILM-011",
    name: "Kodak 50D Super 8 Cartridge",
    category: "film_super_8",
    price: 34.99,
    stockStatus: "in_stock",
    description:
      "Daylight-balanced color negative. Fine grain, rich color. The go-to for Super 8 filmmakers who want a clean, cinematic look. 50ft cartridge (~3.5 minutes at 18fps).",
  },
  {
    productId: "FILM-012",
    name: "Kodak Tri-X Reversal Super 8 Cartridge",
    category: "film_super_8",
    price: 29.99,
    stockStatus: "in_stock",
    description:
      "B&W reversal film — projects as a positive without printing. High contrast, iconic grain. The film that home movies were made on. 50ft cartridge.",
  },
];

export function searchProducts(query: string): Product[] {
  const lower = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower)
  );
}

export function getProductById(productId: string): Product | undefined {
  return products.find((p) => p.productId === productId);
}
