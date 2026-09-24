import { Injectable, signal } from '@angular/core';

import type { ThemeConfig } from './theme-designer.service';

export interface ThemeSnapshot {
  preset: unknown;
  config: ThemeConfig;
}

export interface SavedTheme extends ThemeSnapshot {
  id: string;
  name: string;
  updatedAt: number;
  /** The starting point that Reset returns to. */
  original?: ThemeSnapshot;
}

export const SAVED_THEMES_STORAGE_KEY = 'theme-studio.saved-themes';

@Injectable({ providedIn: 'root' })
export class SavedThemesService {
  readonly themes = signal<SavedTheme[]>(this.read());
  readonly error = signal<string | null>(null);

  get(id: string): SavedTheme | undefined {
    return this.themes().find((theme) => theme.id === id);
  }

  save(theme: SavedTheme): void {
    const others = this.themes().filter((saved) => saved.id !== theme.id);
    this.persist(sortNewestFirst([theme, ...others]));
  }

  remove(id: string): void {
    this.persist(this.themes().filter((theme) => theme.id !== id));
  }

  private persist(themes: SavedTheme[]): void {
    this.themes.set(themes);
    try {
      const json = JSON.stringify(themes, (_key, value) =>
        typeof value === 'function' ? undefined : (value as unknown),
      );
      localStorage.setItem(SAVED_THEMES_STORAGE_KEY, json);
      this.error.set(null);
    } catch {
      this.error.set('Themes could not be saved in this browser. Export your theme to keep it.');
    }
  }

  private read(): SavedTheme[] {
    try {
      const json = localStorage.getItem(SAVED_THEMES_STORAGE_KEY);
      const parsed: unknown = json ? JSON.parse(json) : [];
      return Array.isArray(parsed) ? sortNewestFirst(parsed.filter(isSavedTheme)) : [];
    } catch {
      return [];
    }
  }
}

function sortNewestFirst(themes: SavedTheme[]): SavedTheme[] {
  return [...themes].sort((a, b) => b.updatedAt - a.updatedAt);
}

function isSavedTheme(value: unknown): value is SavedTheme {
  const theme = value as Partial<SavedTheme> | null;
  return (
    typeof theme?.id === 'string' &&
    typeof theme.name === 'string' &&
    typeof theme.preset === 'object' &&
    theme.preset !== null &&
    typeof theme.config === 'object' &&
    typeof theme.updatedAt === 'number'
  );
}
