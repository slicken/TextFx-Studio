
import { TextStyle, TextEffect } from './types';

export const STYLE_OPTIONS = [
  { value: TextStyle.TYPE_3D_GLOSSY, label: '3D Glossy', description: 'Smooth, dimensional', icon: '💎' },
  { value: TextStyle.NEON_CYBERPUNK, label: 'Cyberpunk', description: 'Glowing futuristic', icon: '🌆' },
  { value: TextStyle.METALLIC_CHROME, label: 'Chrome', description: 'Polished silver', icon: '🔩' },
  { value: TextStyle.GRAFFITI_STREET, label: 'Graffiti', description: 'Urban street art', icon: '🎨' },
  { value: TextStyle.VINTAGE_RETRO, label: 'Retro', description: '80s VHS style', icon: '📼' },
  { value: TextStyle.MINIMAL_LOGO, label: 'Minimal', description: 'Clean vector', icon: '✒️' },
  { value: TextStyle.FIRE_EMBER, label: 'Fire', description: 'Burning flames', icon: '🔥' },
  { value: TextStyle.ICE_FROST, label: 'Ice', description: 'Frozen crystal', icon: '❄️' },
  { value: TextStyle.NATURE_FLORAL, label: 'Nature', description: 'Vines & leaves', icon: '🌿' },
  { value: TextStyle.CANDY_BUBBLE, label: 'Candy', description: 'Soft & inflated', icon: '🍬' },
  { value: TextStyle.STEAMPUNK, label: 'Steampunk', description: 'Gears & brass', icon: '⚙️' },
  { value: TextStyle.LIQUID_METAL, label: 'Liquid', description: 'Molten flow', icon: '💧' },
  { value: TextStyle.ORIGAMI, label: 'Origami', description: 'Folded paper', icon: '🦢' },
  { value: TextStyle.GOTHIC, label: 'Gothic', description: 'Dark medieval', icon: '🏰' },
  { value: TextStyle.CYBERNETIC, label: 'Circuit', description: 'Tech wires', icon: '🔌' },
];

export const EFFECT_OPTIONS = [
  { value: TextEffect.GLOW, label: 'Glow' },
  { value: TextEffect.SHADOW_DROP, label: 'Shadow' },
  { value: TextEffect.GLITCH, label: 'Glitch' },
  { value: TextEffect.PARTICLES, label: 'Particles' },
  { value: TextEffect.METALLIC, label: 'Metallic' },
  { value: TextEffect.OUTLINE, label: 'Outline' },
  { value: TextEffect.REFLECTIONS, label: 'Reflect' },
  { value: TextEffect.SMOKE, label: 'Smoke' },
  { value: TextEffect.SPLASH, label: 'Splash' },
  { value: TextEffect.LIGHTNING, label: 'Lightning' },
  { value: TextEffect.HOLOGRAM, label: 'Hologram' },
  { value: TextEffect.SHATTERED, label: 'Shatter' },
  { value: TextEffect.COSMIC, label: 'Cosmic' },
];

export const BACKGROUND_OPTIONS = [
  { value: 'dark', label: 'Dark Studio', color: 'bg-neutral-900' },
  { value: 'light', label: 'Bright Studio', color: 'bg-gray-100' },
  { value: 'abstract', label: 'Abstract', color: 'bg-indigo-900' },
  { value: 'cyber', label: 'Cyber Grid', color: 'bg-cyan-900' },
  { value: 'space', label: 'Deep Space', color: 'bg-black' },
  { value: 'underwater', label: 'Underwater', color: 'bg-blue-800' },
];
