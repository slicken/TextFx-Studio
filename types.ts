
export enum TextStyle {
  TYPE_3D_GLOSSY = '3D Glossy',
  NEON_CYBERPUNK = 'Neon Cyberpunk',
  METALLIC_CHROME = 'Metallic Chrome',
  GRAFFITI_STREET = 'Graffiti Street',
  VINTAGE_RETRO = 'Vintage Retro',
  MINIMAL_LOGO = 'Minimal Logo',
  FIRE_EMBER = 'Fire & Ember',
  ICE_FROST = 'Ice & Frost',
  NATURE_FLORAL = 'Nature Floral',
  CANDY_BUBBLE = 'Candy Bubble',
  STEAMPUNK = 'Steampunk',
  LIQUID_METAL = 'Liquid Metal',
  ORIGAMI = 'Origami Paper',
  GOTHIC = 'Gothic Medieval',
  CYBERNETIC = 'Cybernetic Circuitry',
}

export enum TextEffect {
  GLITCH = 'Glitch Distortion',
  SHADOW_DROP = 'Heavy Drop Shadow',
  GLOW = 'Radiant Glow',
  PARTICLES = 'Floating Particles',
  OUTLINE = 'Bold Outline',
  REFLECTIONS = 'Floor Reflections',
  SMOKE = 'Smoke Wisps',
  SPLASH = 'Liquid Splash',
  METALLIC = 'Metallic Finish',
  LIGHTNING = 'Lightning Bolts',
  HOLOGRAM = 'Holographic Overlay',
  SHATTERED = 'Shattered Glass',
  COSMIC = 'Cosmic Dust',
}

export interface TextConfig {
  text: string;
  style: TextStyle | 'custom';
  customStyle?: string;
  effects: TextEffect[];
  customEffect?: string;
  backgroundMode: 'dark' | 'light' | 'abstract' | 'cyber' | 'space' | 'underwater';
  customBackground?: string;
  creativityLevel: number; // 1-5
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}
