import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideOptimus } from '@openng/optimus-ui/config';
import Aura from '@openng/optimus-ui-themes/aura';

import { ComponentEditor } from './component-editor';
import { ThemeDesignerService } from '../services/theme-designer.service';

describe('ComponentEditor', () => {
  let fixture: ComponentFixture<ComponentEditor>;
  let component: ComponentEditor;
  let el: HTMLElement;
  let service: ThemeDesignerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentEditor],
      providers: [provideOptimus({ theme: { preset: Aura } })],
    }).compileComponents();

    service = TestBed.inject(ThemeDesignerService);
    service.createThemeFromPreset('Test', structuredClone(Aura));

    fixture = TestBed.createComponent(ComponentEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the component select dropdown', () => {
    const select = el.querySelector('[data-pc-name="select"]');
    expect(select).toBeTruthy();
  });

  it('should not render component tokens before selection', () => {
    const fieldsets = el.querySelectorAll('[data-pc-name="fieldset"]');
    expect(fieldsets.length).toBe(0);
  });

  describe('CSS section', () => {
    function select(key: string): void {
      component['selectedComponent'].set(key);
      fixture.detectChanges();
    }

    function textarea(): HTMLTextAreaElement {
      return el.querySelector('#component-css') as HTMLTextAreaElement;
    }

    function type(value: string): void {
      textarea().value = value;
      textarea().dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }

    it('should show the component CSS', () => {
      select('datatable');
      expect(textarea().value).toBe((Aura as any).components.datatable.css);
    });

    it('should show an empty editor for components without CSS', () => {
      select('button');
      expect(textarea().value).toBe('');
    });

    it('should update the preset when CSS is edited', () => {
      select('button');
      type('.p-button { letter-spacing: 1px; }');

      expect(service.designer().theme!.preset.components.button.css).toBe(
        '.p-button { letter-spacing: 1px; }',
      );
    });

    it('should remove the css property when cleared', () => {
      select('datatable');
      type('');

      expect('css' in service.designer().theme!.preset.components.datatable).toBe(false);
    });

    it('should mark changed CSS and revert it to the original', () => {
      select('datatable');
      expect(el.querySelector('button[aria-label="Revert CSS to original"]')).toBeNull();

      type('.p-datatable { color: red; }');
      const revert = el.querySelector(
        'button[aria-label="Revert CSS to original"]',
      ) as HTMLButtonElement;
      expect(el.querySelector('label[for="component-css"]')!.classList).toContain('font-bold');

      revert.click();
      fixture.detectChanges();

      expect(service.designer().theme!.preset.components.datatable.css).toBe(
        (Aura as any).components.datatable.css,
      );
      expect(el.querySelector('button[aria-label="Revert CSS to original"]')).toBeNull();
    });
  });
});
