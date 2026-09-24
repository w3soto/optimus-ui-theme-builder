import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TokenField } from './token-field';
import { SavedThemesService } from '../services/saved-themes.service';
import { ThemeDesignerService } from '../services/theme-designer.service';

@Component({
  standalone: true,
  imports: [TokenField],
  template: `
    <design-token-field
      [label]="label()"
      [type]="type()"
      [path]="path()"
      [(modelValue)]="value"
    />
  `,
})
class TestHost {
  label = signal('Background Color');
  type = signal<string | undefined>(undefined);
  value = signal<string | undefined>('#ff0000');
  path = signal<string | undefined>(undefined);
}

describe('TokenField', () => {
  let fixture: ComponentFixture<TestHost>;
  let host: TestHost;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(el.querySelector('design-token-field')).toBeTruthy();
  });

  it('should display the label', () => {
    const label = el.querySelector('label');
    expect(label?.textContent?.trim()).toBe('Background Color');
  });

  it('should render the input with the model value', () => {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe('#ff0000');
  });

  it('should show color preview when label contains color keyword', () => {
    const colorPreview = el.querySelector('[style*="background"]');
    expect(colorPreview).toBeTruthy();
  });

  it('should show color preview when type is explicitly color', () => {
    host.label.set('some field');
    host.type.set('color');
    fixture.detectChanges();
    const colorPreview = el.querySelector('[style*="background"]');
    expect(colorPreview).toBeTruthy();
  });

  it('should not show color preview for non-color fields', () => {
    host.label.set('Width');
    host.type.set(undefined);
    fixture.detectChanges();
    const previewDivs = el.querySelectorAll('.absolute.right-1');
    expect(previewDivs.length).toBe(0);
  });

  it('should render a datalist element', () => {
    const datalist = el.querySelector('datalist');
    expect(datalist).toBeTruthy();
    expect(datalist?.id).toContain('token-field-list-');
  });

  it('should link input to datalist via list attribute', () => {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement;
    const datalist = el.querySelector('datalist');
    expect(input.getAttribute('list')).toBe(datalist?.id);
  });

  it('should have maxlength 100', () => {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input.maxLength).toBe(100);
  });

  describe('changed marker', () => {
    function label(): HTMLLabelElement {
      return el.querySelector('label') as HTMLLabelElement;
    }

    function revertButton(): HTMLButtonElement | null {
      return el.querySelector('label button');
    }

    beforeEach(() => {
      TestBed.inject(ThemeDesignerService).createThemeFromPreset('Marker', {
        semantic: { primary: { 500: '{emerald.500}' } },
      });
    });

    it('should not mark fields without a token path', () => {
      fixture.detectChanges();
      expect(label().classList).not.toContain('font-bold');
      expect(revertButton()).toBeNull();
    });

    it('should not mark a token that still has its original value', () => {
      host.path.set('semantic.primary.500');
      host.value.set('{emerald.500}');
      fixture.detectChanges();

      expect(label().classList).not.toContain('font-bold');
      expect(revertButton()).toBeNull();
    });

    it('should bold the label and show the original value for a changed token', () => {
      host.path.set('semantic.primary.500');
      host.value.set('{blue.500}');
      fixture.detectChanges();

      expect(label().classList).toContain('font-bold');
      expect(revertButton()?.getAttribute('aria-label')).toBe('Revert to original: {emerald.500}');
    });

    it('should show an undo icon on the revert button', () => {
      host.path.set('semantic.primary.500');
      host.value.set('{blue.500}');
      fixture.detectChanges();

      expect(revertButton()?.querySelector('.pi-undo')).toBeTruthy();
    });

    it('should revert to the original value when clicked', () => {
      host.path.set('semantic.primary.500');
      host.value.set('{blue.500}');
      fixture.detectChanges();

      revertButton()!.click();
      fixture.detectChanges();

      expect(host.value()).toBe('{emerald.500}');
      expect(label().classList).not.toContain('font-bold');
      expect(revertButton()).toBeNull();
    });

    it('should describe tokens that did not exist originally', () => {
      host.path.set('semantic.primary.600');
      host.value.set('{blue.600}');
      fixture.detectChanges();

      expect(revertButton()?.getAttribute('aria-label')).toBe('Revert to original: (not set)');
    });

    it('should not mark tokens when the starting point is unknown', () => {
      // A theme saved before Reset existed has no recorded starting point.
      TestBed.inject(SavedThemesService).save({
        id: 'legacy',
        name: 'Legacy',
        preset: { semantic: { primary: { 500: '{emerald.500}' } } },
        config: { fontSize: '14px', fontFamily: 'Inter var' },
        updatedAt: 1,
      });
      TestBed.inject(ThemeDesignerService).openSavedTheme('legacy');
      host.path.set('semantic.primary.500');
      host.value.set('{blue.500}');
      fixture.detectChanges();

      expect(revertButton()).toBeNull();
    });
  });
});
