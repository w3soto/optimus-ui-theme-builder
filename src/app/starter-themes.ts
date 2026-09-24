import Aura from '@openng/optimus-ui-themes/aura';
import Material from '@openng/optimus-ui-themes/material';
import { definePreset } from '@openng/optimus-ui-themes';
import type { Preset } from '@openng/optimus-ui-themes/types';

const paletteRef = (name: string) => ({
  50: `{${name}.50}`,
  100: `{${name}.100}`,
  200: `{${name}.200}`,
  300: `{${name}.300}`,
  400: `{${name}.400}`,
  500: `{${name}.500}`,
  600: `{${name}.600}`,
  700: `{${name}.700}`,
  800: `{${name}.800}`,
  900: `{${name}.900}`,
  950: `{${name}.950}`,
});

const bootstrapButton = (
  background: string,
  hoverBackground: string,
  activeBackground: string,
  color = '#ffffff',
) => ({
  background,
  hoverBackground,
  activeBackground,
  borderColor: background,
  hoverBorderColor: hoverBackground,
  activeBorderColor: activeBackground,
  color,
  hoverColor: color,
  activeColor: color,
  focusRing: {
    color: 'color-mix(in srgb, {primary.500}, transparent 75%)',
    shadow: '0 0 0 0.25rem color-mix(in srgb, {primary.500}, transparent 75%)',
  },
});

const Shadcn = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: '0',
      xs: '0.25rem',
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.625rem',
      xl: '0.75rem',
    },
  },
  semantic: {
    primary: paletteRef('zinc'),
    formField: {
      paddingX: '0.75rem',
      paddingY: '0.5rem',
      borderRadius: '{border.radius.md}',
      focusRing: {
        width: '3px',
        style: 'solid',
        color: 'color-mix(in srgb, {text.color}, transparent 82%)',
        offset: '0',
        shadow: 'none',
      },
    },
    focusRing: {
      width: '3px',
      style: 'solid',
      color: 'color-mix(in srgb, {text.color}, transparent 82%)',
      offset: '0',
      shadow: 'none',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}',
        },
        primary: {
          color: '{zinc.950}',
          contrastColor: '#ffffff',
          hoverColor: '{zinc.800}',
          activeColor: '{zinc.700}',
        },
        highlight: {
          background: '{zinc.100}',
          focusBackground: '{zinc.200}',
          color: '{zinc.950}',
          focusColor: '{zinc.950}',
        },
        formField: {
          background: '#ffffff',
          disabledBackground: '{zinc.100}',
          filledBackground: '{zinc.50}',
          filledHoverBackground: '{zinc.100}',
          filledFocusBackground: '#ffffff',
          borderColor: '{zinc.300}',
          hoverBorderColor: '{zinc.400}',
          focusBorderColor: '{zinc.400}',
          color: '{zinc.950}',
          disabledColor: '{zinc.500}',
          placeholderColor: '{zinc.500}',
          iconColor: '{zinc.500}',
          shadow: 'none',
        },
        text: {
          color: '{zinc.950}',
          hoverColor: '{zinc.900}',
          mutedColor: '{zinc.500}',
          hoverMutedColor: '{zinc.600}',
        },
        content: {
          background: '#ffffff',
          hoverBackground: '{zinc.100}',
          borderColor: '{zinc.200}',
          color: '{zinc.950}',
          hoverColor: '{zinc.950}',
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}',
        },
        primary: {
          color: '{zinc.50}',
          contrastColor: '{zinc.950}',
          hoverColor: '{zinc.200}',
          activeColor: '{zinc.300}',
        },
        highlight: {
          background: '{zinc.800}',
          focusBackground: '{zinc.700}',
          color: '{zinc.50}',
          focusColor: '{zinc.50}',
        },
        formField: {
          background: '{zinc.950}',
          disabledBackground: '{zinc.800}',
          filledBackground: '{zinc.900}',
          filledHoverBackground: '{zinc.800}',
          filledFocusBackground: '{zinc.950}',
          borderColor: '{zinc.700}',
          hoverBorderColor: '{zinc.600}',
          focusBorderColor: '{zinc.500}',
          color: '{zinc.50}',
          disabledColor: '{zinc.500}',
          placeholderColor: '{zinc.500}',
          iconColor: '{zinc.400}',
          shadow: 'none',
        },
        text: {
          color: '{zinc.50}',
          hoverColor: '#ffffff',
          mutedColor: '{zinc.400}',
          hoverMutedColor: '{zinc.300}',
        },
        content: {
          background: '{zinc.950}',
          hoverBackground: '{zinc.800}',
          borderColor: '{zinc.800}',
          color: '{zinc.50}',
          hoverColor: '#ffffff',
        },
      },
    },
  },
  components: {
    button: {
      root: {
        borderRadius: '{border.radius.md}',
        paddingX: '1rem',
        paddingY: '0.5rem',
        iconOnlyWidth: '2.25rem',
        label: { fontWeight: '500' },
        raisedShadow: 'none',
      },
    },
    card: {
      root: {
        borderRadius: '{border.radius.lg}',
        shadow: '0 1px 2px rgba(0, 0, 0, 0.05), 0 0 0 1px {content.border.color}',
      },
      body: {
        padding: '1.5rem',
        gap: '0.5rem',
      },
      title: {
        fontSize: '1rem',
        fontWeight: '600',
      },
    },
    checkbox: {
      root: {
        width: '1rem',
        height: '1rem',
        borderRadius: '{border.radius.xs}',
      },
    },
    tabs: {
      tablist: {
        borderWidth: '0',
        background: '{surface.100}',
        borderColor: 'transparent',
      },
      tab: {
        activeBackground: '{content.background}',
        borderWidth: '0',
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        activeBorderColor: 'transparent',
        color: '{text.muted.color}',
        activeColor: '{text.color}',
        padding: '0.5rem 0.75rem',
        fontWeight: '500',
      },
      activeBar: {
        height: '0',
      },
    },
    datatable: {
      columnTitle: {
        fontWeight: '500',
      },
      colorScheme: {
        light: {
          headerCell: {
            background: '{surface.50}',
            color: '{text.muted.color}',
          },
        },
        dark: {
          headerCell: {
            background: '{surface.950}',
            color: '{text.muted.color}',
          },
        },
      },
    },
  },
});

const Bootstrap = definePreset(Aura, {
  primitive: {
    bsblue: {
      50: '#e7f1ff',
      100: '#cfe2ff',
      200: '#9ec5fe',
      300: '#6ea8fe',
      400: '#3d8bfd',
      500: '#0d6efd',
      600: '#0b5ed7',
      700: '#0a58ca',
      800: '#084298',
      900: '#052c65',
      950: '#031633',
    },
    bsgray: {
      50: '#f8f9fa',
      100: '#e9ecef',
      200: '#dee2e6',
      300: '#ced4da',
      400: '#adb5bd',
      500: '#6c757d',
      600: '#495057',
      700: '#343a40',
      800: '#212529',
      900: '#161719',
      950: '#0b0c0d',
    },
    borderRadius: {
      none: '0',
      xs: '0.2rem',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '1rem',
    },
  },
  semantic: {
    primary: paletteRef('bsblue'),
    formField: {
      paddingX: '0.75rem',
      paddingY: '0.375rem',
      borderRadius: '{border.radius.md}',
      focusRing: {
        width: '0',
        style: 'none',
        color: 'transparent',
        offset: '0',
        shadow: '0 0 0 0.25rem color-mix(in srgb, {primary.500}, transparent 75%)',
      },
    },
    focusRing: {
      width: '0',
      style: 'none',
      color: 'transparent',
      offset: '0',
      shadow: '0 0 0 0.25rem color-mix(in srgb, {primary.500}, transparent 75%)',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{bsgray.50}',
          100: '{bsgray.100}',
          200: '{bsgray.200}',
          300: '{bsgray.300}',
          400: '{bsgray.400}',
          500: '{bsgray.500}',
          600: '{bsgray.600}',
          700: '{bsgray.700}',
          800: '{bsgray.800}',
          900: '{bsgray.900}',
          950: '{bsgray.950}',
        },
        primary: {
          color: '{primary.500}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}',
        },
        highlight: {
          background: '{primary.100}',
          focusBackground: '{primary.200}',
          color: '{primary.900}',
          focusColor: '{primary.900}',
        },
        formField: {
          background: '#ffffff',
          disabledBackground: '{bsgray.100}',
          filledBackground: '{bsgray.50}',
          filledHoverBackground: '{bsgray.100}',
          filledFocusBackground: '#ffffff',
          borderColor: '{bsgray.200}',
          hoverBorderColor: '{bsgray.400}',
          focusBorderColor: 'color-mix(in srgb, {primary.500}, #ffffff 50%)',
          color: '{bsgray.800}',
          disabledColor: '{bsgray.500}',
          placeholderColor: '{bsgray.500}',
          iconColor: '{bsgray.500}',
          shadow: 'none',
        },
        text: {
          color: '{bsgray.800}',
          hoverColor: '#000000',
          mutedColor: '{bsgray.500}',
          hoverMutedColor: '{bsgray.600}',
        },
        content: {
          background: '#ffffff',
          hoverBackground: '{bsgray.50}',
          borderColor: '{bsgray.200}',
          color: '{bsgray.800}',
          hoverColor: '#000000',
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{bsgray.50}',
          100: '{bsgray.100}',
          200: '{bsgray.200}',
          300: '{bsgray.300}',
          400: '{bsgray.400}',
          500: '{bsgray.500}',
          600: '{bsgray.600}',
          700: '{bsgray.700}',
          800: '{bsgray.800}',
          900: '{bsgray.900}',
          950: '{bsgray.950}',
        },
        primary: {
          color: '{primary.300}',
          contrastColor: '{primary.900}',
          hoverColor: '{primary.200}',
          activeColor: '{primary.100}',
        },
        formField: {
          background: '{bsgray.800}',
          disabledBackground: '{bsgray.700}',
          filledBackground: '#2b3035',
          filledHoverBackground: '{bsgray.700}',
          filledFocusBackground: '{bsgray.800}',
          borderColor: '{bsgray.600}',
          hoverBorderColor: '{bsgray.500}',
          focusBorderColor: '{primary.300}',
          color: '{bsgray.200}',
          disabledColor: '{bsgray.500}',
          placeholderColor: '{bsgray.400}',
          iconColor: '{bsgray.400}',
          shadow: 'none',
        },
        text: {
          color: '{bsgray.200}',
          hoverColor: '#ffffff',
          mutedColor: '{bsgray.400}',
          hoverMutedColor: '{bsgray.300}',
        },
        content: {
          background: '{bsgray.800}',
          hoverBackground: '{bsgray.700}',
          borderColor: '{bsgray.600}',
          color: '{bsgray.200}',
          hoverColor: '#ffffff',
        },
      },
    },
  },
  components: {
    button: {
      root: {
        borderRadius: '{border.radius.md}',
        paddingX: '0.75rem',
        paddingY: '0.375rem',
        label: { fontWeight: '400' },
        raisedShadow: 'none',
      },
      colorScheme: {
        light: {
          root: {
            primary: bootstrapButton('{primary.500}', '{primary.600}', '{primary.700}'),
            secondary: bootstrapButton('#6c757d', '#5c636a', '#565e64'),
            success: bootstrapButton('#198754', '#157347', '#146c43'),
            info: bootstrapButton('#0dcaf0', '#31d2f2', '#3dd5f3', '#000000'),
            warn: bootstrapButton('#ffc107', '#ffca2c', '#ffcd39', '#000000'),
            danger: bootstrapButton('#dc3545', '#bb2d3b', '#b02a37'),
          },
        },
        dark: {
          root: {
            primary: bootstrapButton('{primary.500}', '{primary.600}', '{primary.700}'),
            secondary: bootstrapButton('#6c757d', '#5c636a', '#565e64'),
            success: bootstrapButton('#198754', '#157347', '#146c43'),
            info: bootstrapButton('#0dcaf0', '#31d2f2', '#3dd5f3', '#000000'),
            warn: bootstrapButton('#ffc107', '#ffca2c', '#ffcd39', '#000000'),
            danger: bootstrapButton('#dc3545', '#bb2d3b', '#b02a37'),
          },
        },
      },
    },
    card: {
      root: {
        borderRadius: '{border.radius.md}',
        shadow: '0 0 0 1px {content.border.color}',
      },
      body: {
        padding: '1rem',
        gap: '0.5rem',
      },
      title: {
        fontSize: '1.25rem',
        fontWeight: '500',
      },
    },
    checkbox: {
      root: {
        width: '1rem',
        height: '1rem',
        borderRadius: '{border.radius.sm}',
      },
    },
    toggleswitch: {
      root: {
        width: '2rem',
        height: '1rem',
        gap: '0.125rem',
      },
      handle: {
        size: '0.75rem',
      },
    },
    datatable: {
      columnTitle: {
        fontWeight: '600',
      },
      colorScheme: {
        light: {
          headerCell: {
            background: '{surface.50}',
          },
        },
        dark: {
          headerCell: {
            background: '{content.background}',
          },
        },
      },
    },
  },
});

const MaterialStarter = definePreset(Material, {
  primitive: {
    materialpurple: {
      50: '#f7f2fa',
      100: '#f3edf7',
      200: '#eaddff',
      300: '#d0bcff',
      400: '#b69df8',
      500: '#6750a4',
      600: '#5f479c',
      700: '#4f378b',
      800: '#381e72',
      900: '#21005d',
      950: '#1d0054',
    },
  },
  semantic: {
    primary: paletteRef('materialpurple'),
  },
});

export const STARTER_THEME_IDS = ['custom', 'shadcn', 'bootstrap', 'material'] as const;
export type StarterThemeId = (typeof STARTER_THEME_IDS)[number];

export interface StarterTheme {
  id: StarterThemeId;
  name: string;
  description: string;
  bestFor: string;
  accent: string;
  accentSoft: string;
  surface: string;
  radius: string;
  fontFamily: string;
  fontSize: string;
  preset: Preset;
}

export const CUSTOM_STARTER_THEME: StarterTheme = {
  id: 'custom',
  name: 'Custom',
  description: 'A neutral Optimus foundation ready for your own tokens and visual language.',
  bestFor: 'Your design system',
  accent: '#64748b',
  accentSoft: '#f1f5f9',
  surface: '#ffffff',
  radius: '0.5rem',
  fontFamily: 'Inter var',
  fontSize: '14px',
  preset: {
    ...Aura,
    primitive: {
      ...Aura.primitive,
    }
  },
};

export const STARTER_THEMES: readonly StarterTheme[] = [
  {
    id: 'shadcn',
    name: 'shadcn',
    description: 'Clean, neutral and content-first with crisp borders and restrained depth.',
    bestFor: 'SaaS & internal tools',
    accent: '#18181b',
    accentSoft: '#f4f4f5',
    surface: '#ffffff',
    radius: '0.625rem',
    fontFamily: 'Inter var',
    fontSize: '14px',
    preset: Shadcn,
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    description: 'Familiar blue controls, practical spacing and approachable interface patterns.',
    bestFor: 'Business applications',
    accent: '#0d6efd',
    accentSoft: '#e7f1ff',
    surface: '#ffffff',
    radius: '0.375rem',
    fontFamily: 'system-ui',
    fontSize: '16px',
    preset: Bootstrap,
  },
  {
    id: 'material',
    name: 'Material',
    description: 'Expressive indigo accents, layered surfaces and comfortable rounded controls.',
    bestFor: 'Product experiences',
    accent: '#6750a4',
    accentSoft: '#f3edf7',
    surface: '#ffffff',
    radius: '0.375rem',
    fontFamily: 'Roboto',
    fontSize: '14px',
    preset: MaterialStarter,
  },
] as const;

export function getStarterTheme(id: string | null): StarterTheme | undefined {
  return [CUSTOM_STARTER_THEME, ...STARTER_THEMES].find((theme) => theme.id === id);
}
