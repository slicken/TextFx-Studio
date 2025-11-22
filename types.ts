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
  CANDY_BUBBLE = 'Candy Bubble'
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
  METALLIC = 'Metallic Finish'
}

export interface TextConfig {
  text: string;
  style: TextStyle;
  customStyle?: string;
  effects: TextEffect[];
  customEffect?: string;
  backgroundMode: 'dark' | 'light' | 'abstract';
  customBackground?: string;
  creativityLevel: number; // 1-5
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}