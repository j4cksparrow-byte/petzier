import type { Product } from "./types";

export const products: Product[] = [
  {
    slug: "smart-gps-collar",
    name: "Smart GPS Collar",
    tagline: "Know where they are, always.",
    description:
      "Real-time location tracking with a 4-week battery life. Built for dogs who love to explore.",
    price: 89,
    originalPrice: 129,
    image: "/gps-collar.jpg",
    heroImage: "/hero.jpg",
    badge: "Best Seller",
    dispatchNote: "DISPATCHED IN 1–2 DAYS",
    editorialHeadline: "Peace of mind, wherever they roam.",
    editorialBody:
      "Built for the dog that charges at open gates and disappears into the bush. The Smart GPS Collar gives you a live map view from your phone — no subscription, no monthly fee, no panic.",
    problems: [
      {
        title: "The anxious wait at the gate",
        description:
          "You open the back door and they're gone. The Smart GPS Collar shows you exactly where they are on your phone before you even reach the street.",
      },
      {
        title: "Dead battery at the wrong moment",
        description:
          "Most trackers last 3 days. Ours lasts 4 weeks on a single charge — because the moment you need it most shouldn't be the moment it dies.",
      },
      {
        title: "Uncomfortable for the dog",
        description:
          "A tracker they won't wear is useless. The collar weighs 28g and sits flat against the neck — your dog won't notice it's there.",
      },
    ],
    materials: [
      { name: "Shell", description: "Aircraft-grade aluminium, matte anodised" },
      { name: "Strap", description: "Biothane — waterproof, odour-resistant, soft" },
      { name: "Buckle", description: "Military-spec polymer, single-click release" },
      { name: "Seal", description: "IP67 — submerged to 1m for 30 minutes" },
    ],
    boxItems: [
      { name: "Smart GPS Collar Unit", qty: "×1" },
      { name: "Magnetic USB-C charging cable", qty: "×1" },
      { name: "Quick-start guide", qty: "×1" },
      { name: "Spare biothane strap (S/M/L)", qty: "×1" },
    ],
    specs: [
      { label: "Weight", value: "28 g" },
      { label: "Battery life", value: "Up to 28 days" },
      { label: "Waterproofing", value: "IP67" },
      { label: "Range", value: "Unlimited (4G LTE)" },
      { label: "Update frequency", value: "Every 3 seconds" },
      { label: "Strap width", value: "25 mm" },
      { label: "Neck circumference", value: "30–70 cm" },
      { label: "Charging", value: "USB-C magnetic, 0→100% in 2hr" },
      { label: "Subscription", value: "None required" },
    ],
    reviews: [
      {
        name: "Sarah M.",
        location: "Brisbane, QLD",
        rating: 5,
        text: "Our border collie escaped twice last month. With this on, I had him back within 10 minutes both times. Worth every cent.",
        petName: "Biscuit",
        petType: "Border Collie",
      },
      {
        name: "James T.",
        location: "Sydney, NSW",
        rating: 5,
        text: "Battery life is genuinely 4 weeks. Set it up, forgot about it, still tracking. Remarkable.",
        petName: "Duke",
        petType: "Labrador",
      },
      {
        name: "Priya K.",
        location: "Melbourne, VIC",
        rating: 4,
        text: "Lightweight, the dog doesn't notice it at all. App is clean and fast. Would buy again.",
        petName: "Mochi",
        petType: "Shiba Inu",
      },
    ],
  },
  {
    slug: "automatic-feeder",
    name: "Automatic Pet Feeder",
    tagline: "Dinner at the right time, every time.",
    description:
      "Programmable 6-meal scheduling with portion control. Fresh food, consistent routine — even when you're not home.",
    price: 74,
    originalPrice: 109,
    image: "/auto-feeder.jpg",
    heroImage: "/auto-feeder.jpg",
    dispatchNote: "DISPATCHED IN 1–2 DAYS",
    editorialHeadline: "A consistent routine is the kindest thing you can give them.",
    editorialBody:
      "Pets thrive on routine. The Automatic Feeder delivers the right amount of food at the right time — whether you're stuck at work, travelling, or just need one less thing to worry about.",
    problems: [
      {
        title: "Irregular feeding times",
        description:
          "Late nights and early mornings throw off your pet's biological clock. Consistent meal scheduling improves digestion, mood, and sleep.",
      },
      {
        title: "Overfeeding without realising",
        description:
          "Portion sizes matter more than most owners realise. The feeder measures to the gram — no guesswork, no guilt.",
      },
      {
        title: "Stale food sitting in the bowl",
        description:
          "The sealed hopper keeps kibble fresh for up to 10 days. No moisture, no pests, no waste.",
      },
    ],
    materials: [
      { name: "Hopper body", description: "Food-safe BPA-free ABS, airtight seal" },
      { name: "Bowl", description: "304 stainless steel, dishwasher-safe" },
      { name: "Motor", description: "Silent auger — <35dB at 1m" },
      { name: "Display", description: "LCD with backlight, programmable clock" },
    ],
    boxItems: [
      { name: "Automatic Feeder Unit", qty: "×1" },
      { name: "Stainless steel bowl", qty: "×1" },
      { name: "AC power adapter", qty: "×1" },
      { name: "3×AA battery backup module", qty: "×1" },
      { name: "User manual", qty: "×1" },
    ],
    specs: [
      { label: "Capacity", value: "3.7 litres / ~6kg kibble" },
      { label: "Meals per day", value: "Up to 6 programmable" },
      { label: "Portion size", value: "5–200g per meal" },
      { label: "Power", value: "AC adapter + battery backup" },
      { label: "Noise level", value: "<35 dB" },
      { label: "Compatible food", value: "Dry kibble 2–15mm diameter" },
      { label: "Bowl material", value: "304 stainless steel" },
      { label: "Dimensions", value: "220 × 220 × 380 mm" },
      { label: "Weight (empty)", value: "1.4 kg" },
    ],
    reviews: [
      {
        name: "Amanda L.",
        location: "Perth, WA",
        rating: 5,
        text: "Travelled for 10 days and my cat was perfectly fed on schedule the whole time. Absolute game-changer.",
        petName: "Olive",
        petType: "Domestic Shorthair",
      },
      {
        name: "Chris D.",
        location: "Adelaide, SA",
        rating: 5,
        text: "The portion control has helped my overweight dog drop 2kg in 3 months. Vet is very happy.",
        petName: "Archie",
        petType: "Beagle",
      },
      {
        name: "Yuki S.",
        location: "Melbourne, VIC",
        rating: 5,
        text: "So quiet I forget it's dispensing. The sealed hopper keeps food fresh for weeks.",
        petName: "Nori",
        petType: "Maine Coon",
      },
    ],
  },
  {
    slug: "interactive-laser-toy",
    name: "Interactive Laser Toy",
    tagline: "Endless play, zero effort from you.",
    description:
      "Automatic 360° rotating laser with 5 patterns and adjustable speed. Keeps cats mentally sharp and physically active.",
    price: 39,
    originalPrice: 59,
    image: "/laser-toy.jpg",
    heroImage: "/laser-toy.jpg",
    dispatchNote: "DISPATCHED IN 1–2 DAYS",
    editorialHeadline: "The hunt instinct doesn't switch off — so why should play time?",
    editorialBody:
      "Cats are natural hunters. Without stimulation, they get bored, anxious, and destructive. The Interactive Laser Toy runs automatic sessions so your cat gets the mental exercise they need even when you're busy.",
    problems: [
      {
        title: "Boredom and destructive behaviour",
        description:
          "An unstimulated cat scratches furniture, wakes you at 3am, and meows endlessly. 15 minutes of laser play per session resolves most of this.",
      },
      {
        title: "Not enough time to play",
        description:
          "You're busy. The automatic mode runs 15-minute sessions then stops — so you don't need to remember to turn it off.",
      },
      {
        title: "Same old toys stop working",
        description:
          "5 randomised patterns keep cats engaged. The unpredictability mimics real prey movement — their instincts can't ignore it.",
      },
    ],
    materials: [
      { name: "Housing", description: "ABS plastic, matte finish, anti-slip base" },
      { name: "Laser", description: "Class II 5mW, 650nm — pet-eye safe" },
      { name: "Motor", description: "Brushless DC, whisper-quiet rotation" },
      { name: "Power", description: "USB-C or 3×AA batteries" },
    ],
    boxItems: [
      { name: "Interactive Laser Unit", qty: "×1" },
      { name: "USB-C charging cable", qty: "×1" },
      { name: "User guide", qty: "×1" },
    ],
    specs: [
      { label: "Patterns", value: "5 randomised modes" },
      { label: "Session timer", value: "15-minute auto-off" },
      { label: "Laser class", value: "Class II — pet-safe" },
      { label: "Rotation", value: "360° automatic" },
      { label: "Speed settings", value: "3 levels" },
      { label: "Power", value: "USB-C or 3×AA" },
      { label: "Noise level", value: "<25 dB" },
      { label: "Dimensions", value: "95 × 95 × 120 mm" },
      { label: "Weight", value: "185 g" },
    ],
    reviews: [
      {
        name: "Lena P.",
        location: "Sydney, NSW",
        rating: 5,
        text: "My two cats chase this thing for 20 minutes straight. The scratching has stopped entirely. Best $39 I've spent.",
        petName: "Fig & Pepper",
        petType: "Domestic Cats",
      },
      {
        name: "Tom W.",
        location: "Canberra, ACT",
        rating: 4,
        text: "The auto-off timer is a godsend — I was worried about overstimulation. Works perfectly.",
        petName: "Jasper",
        petType: "Ragdoll",
      },
      {
        name: "Michelle C.",
        location: "Brisbane, QLD",
        rating: 5,
        text: "My elderly cat started playing again. First time in two years. I'm genuinely emotional about it.",
        petName: "Miso",
        petType: "Persian",
      },
    ],
  },
  {
    slug: "orthopedic-pet-bed",
    name: "Orthopedic Pet Bed",
    tagline: "Real rest for the body that works for you.",
    description:
      "4-inch memory foam with washable linen cover. Supports joints, regulates temperature, and lasts for years.",
    price: 129,
    originalPrice: 189,
    image: "/ortho-bed.jpg",
    heroImage: "/ortho-bed.jpg",
    badge: "Vet Recommended",
    dispatchNote: "DISPATCHED IN 2–3 DAYS",
    editorialHeadline: "They spend 14 hours a day sleeping. The surface matters.",
    editorialBody:
      "Dogs spend more time asleep than awake. A flat cushion doesn't support joints — it compresses and degrades within months. The Orthopedic Bed is built with the same memory foam specification used in premium human mattresses.",
    problems: [
      {
        title: "Stiff joints in the morning",
        description:
          "If your dog struggles to get up after sleeping, the sleep surface is likely the cause. Memory foam distributes weight evenly, reducing pressure on hips and elbows.",
      },
      {
        title: "Beds that flatten in months",
        description:
          "Cheap fill collapses within 90 days. The 4-inch HR memory foam core maintains its shape for 5+ years under daily use.",
      },
      {
        title: "Smell and hygiene",
        description:
          "The linen cover zips off and goes in the washing machine. The foam itself is treated with a micro-silver antibacterial finish.",
      },
    ],
    materials: [
      { name: "Core", description: "4-inch HR memory foam, 60kg/m³ density" },
      { name: "Cover", description: "100% linen, pre-washed, machine washable" },
      { name: "Base", description: "Non-slip TPR dot-matrix grip, no-shift on hard floors" },
      { name: "Treatment", description: "Micro-silver antibacterial foam finish" },
    ],
    boxItems: [
      { name: "Memory foam base (compressed)", qty: "×1" },
      { name: "Linen cover (pre-washed)", qty: "×1" },
      { name: "Care & warranty card", qty: "×1" },
    ],
    specs: [
      { label: "Foam thickness", value: "4 inches (100mm)" },
      { label: "Foam density", value: "60 kg/m³ HR memory foam" },
      { label: "Cover material", value: "100% linen" },
      { label: "Available sizes", value: "S (60×45cm), M (90×65cm), L (110×80cm)" },
      { label: "Cover washing", value: "Machine wash 40°C, tumble dry low" },
      { label: "Base", value: "Non-slip TPR dot matrix" },
      { label: "Lifespan", value: "5+ years daily use" },
      { label: "Antibacterial", value: "Micro-silver foam treatment" },
    ],
    reviews: [
      {
        name: "Dr. Rachel B.",
        location: "Melbourne, VIC",
        rating: 5,
        text: "As a vet, I recommend orthopedic bedding for all dogs over 5 years. This one specifically has the foam density I look for. Excellent product.",
        petName: "Hazel",
        petType: "Golden Retriever",
      },
      {
        name: "Mark F.",
        location: "Gold Coast, QLD",
        rating: 5,
        text: "Our 12-year-old staffy has hip dysplasia. Within two weeks on this bed she stopped limping in the mornings. I cannot recommend it highly enough.",
        petName: "Ruby",
        petType: "Staffy",
      },
      {
        name: "Nina T.",
        location: "Sydney, NSW",
        rating: 5,
        text: "Washing the cover is so easy and it comes out looking perfect every time. The foam itself is still like new after 8 months.",
        petName: "Benji",
        petType: "Spoodle",
      },
    ],
  },
  {
    slug: "filtered-water-fountain",
    name: "Filtered Water Fountain",
    tagline: "Fresh, filtered water. All day, every day.",
    description:
      "Triple-stage filtration with a silent pump. Encourages hydration in cats and dogs who ignore still water.",
    price: 59,
    originalPrice: 85,
    image: "/water-fountain.jpg",
    heroImage: "/water-fountain.jpg",
    dispatchNote: "DISPATCHED IN 1–2 DAYS",
    editorialHeadline: "Most pets are chronically dehydrated. Running water changes that.",
    editorialBody:
      "Cats evolved to distrust still water — a survival instinct that carries into domestic life. Moving water signals freshness. The Filtered Water Fountain triggers that instinct while the triple-stage filter removes chlorine, hair, and sediment.",
    problems: [
      {
        title: "Not drinking enough water",
        description:
          "Dehydration causes UTIs, kidney disease, and digestive issues in cats. Moving water encourages them to drink 50–70% more than a static bowl.",
      },
      {
        title: "Noisy, disruptive pumps",
        description:
          "The brushless pump operates at <30dB — quieter than a whisper. You won't hear it from the next room.",
      },
      {
        title: "Frequent, messy filter changes",
        description:
          "Triple-stage filters last 4–6 weeks and cost $6 to replace. No tools, no mess — twist and swap in 30 seconds.",
      },
    ],
    materials: [
      { name: "Bowl", description: "BPA-free Tritan co-polyester, food-safe" },
      { name: "Pump", description: "Brushless ceramic-bearing motor, <30dB" },
      { name: "Filter stage 1", description: "Ion-exchange resin — removes heavy metals" },
      { name: "Filter stage 2", description: "Activated carbon — removes chlorine, taste" },
      { name: "Filter stage 3", description: "Cotton pre-filter — removes hair & sediment" },
    ],
    boxItems: [
      { name: "Fountain bowl & tower", qty: "×1" },
      { name: "Silent brushless pump", qty: "×1" },
      { name: "Triple-stage filter (installed)", qty: "×1" },
      { name: "Spare filter", qty: "×1" },
      { name: "USB power adapter", qty: "×1" },
      { name: "User guide", qty: "×1" },
    ],
    specs: [
      { label: "Capacity", value: "2.5 litres" },
      { label: "Flow rate", value: "1.5 L/min" },
      { label: "Pump noise", value: "<30 dB" },
      { label: "Filter lifespan", value: "4–6 weeks" },
      { label: "Filter stages", value: "3 (resin, carbon, cotton)" },
      { label: "Power", value: "USB-A, 5V / 1A" },
      { label: "Material", value: "BPA-free Tritan" },
      { label: "Dimensions", value: "Ø 200mm × 180mm tall" },
      { label: "Compatible", value: "Cats and dogs up to 20kg" },
    ],
    reviews: [
      {
        name: "Cath H.",
        location: "Hobart, TAS",
        rating: 5,
        text: "My cat refused to drink from any bowl. Within an hour of setting this up she was drinking constantly. Her vet said her kidney markers improved at her next check-up.",
        petName: "Luna",
        petType: "Burmese",
      },
      {
        name: "Daniel K.",
        location: "Melbourne, VIC",
        rating: 4,
        text: "Genuinely silent. My old fountain woke me at 3am. This one I can barely hear with my ear to it. Filter change is incredibly easy.",
        petName: "Gus",
        petType: "Domestic Shorthair",
      },
      {
        name: "Fiona R.",
        location: "Brisbane, QLD",
        rating: 5,
        text: "Beautiful object — it doesn't look like a pet product. Sits on my kitchen floor and actually looks like it belongs there.",
        petName: "Toast",
        petType: "Scottish Fold",
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
