import { TestBed } from '@angular/core/testing';

import { SAVED_THEMES_STORAGE_KEY, SavedTheme, SavedThemesService } from './saved-themes.service';

function makeTheme(overrides: Partial<SavedTheme> = {}): SavedTheme {
  return {
    id: 'theme-1',
    name: 'Ocean',
    preset: { primitive: { blue: { 500: '#3b82f6' } } },
    config: { fontSize: '14px', fontFamily: 'Inter var' },
    updatedAt: 1000,
    ...overrides,
  };
}

describe('SavedThemesService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function create(): SavedThemesService {
    return TestBed.inject(SavedThemesService);
  }

  it('should start empty when nothing is stored', () => {
    expect(create().themes()).toEqual([]);
  });

  it('should save, get, and remove a theme', () => {
    const service = create();
    const theme = makeTheme();

    service.save(theme);
    expect(service.get('theme-1')).toEqual(theme);
    expect(JSON.parse(localStorage.getItem(SAVED_THEMES_STORAGE_KEY)!)).toEqual([theme]);

    service.remove('theme-1');
    expect(service.get('theme-1')).toBeUndefined();
    expect(JSON.parse(localStorage.getItem(SAVED_THEMES_STORAGE_KEY)!)).toEqual([]);
  });

  it('should update an existing theme instead of duplicating it', () => {
    const service = create();
    service.save(makeTheme());
    service.save(makeTheme({ name: 'Renamed', updatedAt: 2000 }));

    expect(service.themes().length).toBe(1);
    expect(service.themes()[0].name).toBe('Renamed');
  });

  it('should order themes newest first', () => {
    const service = create();
    service.save(makeTheme({ id: 'old', updatedAt: 1000 }));
    service.save(makeTheme({ id: 'new', updatedAt: 3000 }));
    service.save(makeTheme({ id: 'mid', updatedAt: 2000 }));

    expect(service.themes().map((theme) => theme.id)).toEqual(['new', 'mid', 'old']);
  });

  it('should load previously stored themes', () => {
    localStorage.setItem(SAVED_THEMES_STORAGE_KEY, JSON.stringify([makeTheme()]));
    expect(create().themes()).toEqual([makeTheme()]);
  });

  it('should ignore corrupt or invalid stored data', () => {
    localStorage.setItem(SAVED_THEMES_STORAGE_KEY, '{not json');
    expect(create().themes()).toEqual([]);

    TestBed.resetTestingModule();
    localStorage.setItem(SAVED_THEMES_STORAGE_KEY, JSON.stringify([{ id: 1 }, makeTheme()]));
    expect(TestBed.inject(SavedThemesService).themes()).toEqual([makeTheme()]);
  });

  it('should set an error instead of throwing when storage fails', () => {
    const service = create();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError');
    });

    expect(() => service.save(makeTheme())).not.toThrow();
    expect(service.error()).toContain('could not be saved');
    expect(service.themes().length).toBe(1);
  });
});
