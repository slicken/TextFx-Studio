import { TextStyle, TextEffect } from './types';

export const STYLE_OPTIONS = [
  { value: TextStyle.TYPE_3D_GLOSSY, label: '3D Glossy', description: 'Smooth, shiny, dimensional look', icon: '💎' },
  { value: TextStyle.NEON_CYBERPUNK, label: 'Neon Cyberpunk', description: 'Glowing lights, futuristic vibes', icon: '🌆' },
  { value: TextStyle.METALLIC_CHROME, label: 'Metallic Chrome', description: 'Polished silver/gold reflections', icon: '🔩' },
  { value: TextStyle.GRAFFITI_STREET, label: 'Graffiti', description: 'Urban street art style', icon: '🎨' },
  { value: TextStyle.VINTAGE_RETRO, label: 'Vintage Retro', description: 'Old school 70s/80s typography', icon: '📼' },
  { value: TextStyle.MINIMAL_LOGO, label: 'Minimal Logo', description: 'Clean, vector-like, professional', icon: '✒️' },
  { value: TextStyle.FIRE_EMBER, label: 'Fire & Ember', description: 'Burning hot aesthetics', icon: '🔥' },
  { value: TextStyle.ICE_FROST, label: 'Ice & Frost', description: 'Frozen, crystalline textures', icon: '❄️' },
  { value: TextStyle.NATURE_FLORAL, label: 'Nature', description: 'Intertwined with leaves and vines', icon: '🌿' },
  { value: TextStyle.CANDY_BUBBLE, label: 'Candy Bubble', description: 'Soft, inflated, colorful', icon: '🍬' },
];

export const EFFECT_OPTIONS = [
  { value: TextEffect.GLOW, label: 'Glow' },
  { value: TextEffect.SHADOW_DROP, label: 'Drop Shadow' },
  { value: TextEffect.GLITCH, label: 'Glitch' },
  { value: TextEffect.PARTICLES, label: 'Particles' },
  { value: TextEffect.METALLIC, label: 'Metallic' },
  { value: TextEffect.OUTLINE, label: 'Outline' },
  { value: TextEffect.REFLECTIONS, label: 'Reflections' },
  { value: TextEffect.SMOKE, label: 'Smoke' },
  { value: TextEffect.SPLASH, label: 'Splash' },
];

export const BACKGROUND_OPTIONS = [
  { value: 'dark', label: 'Dark Studio', color: 'bg-neutral-900' },
  { value: 'light', label: 'Bright Studio', color: 'bg-gray-100' },
  { value: 'abstract', label: 'Abstract Art', color: 'bg-red-900' },
];