import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideOptimus } from '@openng/optimus-ui/config';
import Aura from '@openng/optimus-ui-themes/aura';

import { PrimitiveColors } from './primitive-colors';
import { ThemeDesignerService } from '../services/theme-designer.service';

describe('PrimitiveColors', () => {
  let fixture: ComponentFixture<PrimitiveColors>;
  let component: PrimitiveColors;
  let el: HTMLElement;
  let service: ThemeDesignerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveColors],
      providers: [provideOptimus({ theme: { preset: Aura } })],
    }).compileComponents();

    service = TestBed.inject(ThemeDesignerService);
    service.createThemeFromPreset('Test', structuredClone(Aura));

    fixture = TestBed.createComponent(PrimitiveColors);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render color input elements', () => {
    const colorInputs = el.querySelectorAll('input[type="color"]');
    expect(colorInputs.length).toBeGreaterThan(0);
  });

  it('should render color palette components', () => {
    const palettes = el.querySelectorAll('design-color-palette');
    expect(palettes.length).toBeGreaterThan(0);
  });

  it('should render color key labels', () => {
    const spans = el.querySelectorAll('span.capitalize');
    expect(spans.length).toBeGreaterThan(0);
  });

  it('should not include borderRadius in color keys', () => {
    const spans = el.querySelectorAll('span.capitalize');
    const labels = Array.from(spans).map((s) => s.textContent?.trim());
    expect(labels).not.toContain('borderRadius');
  });

  it('should mark a changed color with a bold label and its original value', () => {
    const input = el.querySelector('input[type="color"]') as HTMLInputElement;
    const key = el.querySelector('span.capitalize')!.textContent!.trim();
    const original = (Aura as any).primitive[key][500];
    expect(el.querySelector('span.capitalize button')).toBeNull();

    input.value = '#123456';
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const labelSpan = el.querySelector('span.capitalize')!;
    expect(labelSpan.classList).toContain('font-bold');
    expect(labelSpan.querySelector('button')?.getAttribute('aria-label')).toBe(
      `Revert to original: ${original}`,
    );
  });

  it('should revert a changed color to its original palette', () => {
    const input = el.querySelector('input[type="color"]') as HTMLInputElement;
    const key = el.querySelector('span.capitalize')!.textContent!.trim();
    input.value = '#123456';
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    (el.querySelector('span.capitalize button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(service.designer().theme!.preset.primitive[key]).toEqual((Aura as any).primitive[key]);
    expect(el.querySelector('span.capitalize')!.classList).not.toContain('font-bold');
    expect(el.querySelector('span.capitalize button')).toBeNull();
  });
});
