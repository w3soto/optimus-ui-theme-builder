import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Fieldset } from '@openng/optimus-ui/fieldset';
import { Tooltip } from '@openng/optimus-ui/tooltip';

import { ThemeDesignerService } from '../services/theme-designer.service';
import { ColorPalette } from './color-palette';
import { palette } from "@openng/optimus-ui-themes";

@Component({
  selector: 'design-primitive-colors',
  standalone: true,
  imports: [Fieldset, ColorPalette, Tooltip],
  template: `
    <p-fieldset legend="Colors" [toggleable]="true">
      @for (key of colorKeys(); track key) {
        <section class="flex justify-between items-center mb-3 gap-6">
          <div class="flex gap-2 items-center">
            <span
              class="flex items-center gap-1 text-sm capitalize w-20"
              [class.font-bold]="isChanged(key)"
            >
              {{ key }}
              @if (isChanged(key)) {
                <button
                  type="button"
                  class="inline-flex items-center p-0 border-0 bg-transparent text-inherit
                    cursor-pointer rounded hover:text-[var(--p-primary-color)]"
                  [attr.aria-label]="originalTooltip(key)"
                  [pTooltip]="originalTooltip(key)"
                  tooltipPosition="top"
                  (click)="revert(key)"
                >
                  <i class="pi pi-undo text-[1em]!" aria-hidden="true"></i>
                </button>
              }
            </span>
            <input
              type="color"
              [value]="designerService.resolveColor(preset().primitive[key]['500'])"
              (change)="onColorChange($event, key)"
            />
          </div>
          <design-color-palette [value]="preset().primitive[key]" class="flex-1" />
        </section>
      }
    </p-fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimitiveColors {
  protected readonly designerService = inject(ThemeDesignerService);

  protected readonly preset = computed(() => this.designerService.designer().theme!.preset);

  protected readonly colorKeys = computed(() =>
    Object.keys(this.preset().primitive).filter((key) => key !== 'borderRadius'),
  );

  protected isChanged(key: string): boolean {
    if (!this.designerService.hasKnownOriginal()) {
      return false;
    }
    const original = this.designerService.originalValueAt(`primitive.${key}`);
    return JSON.stringify(this.preset().primitive[key]) !== JSON.stringify(original);
  }

  protected originalTooltip(key: string): string {
    const original = this.designerService.originalValueAt(`primitive.${key}.500`);
    return `Revert to original: ${original === undefined ? '(not set)' : String(original)}`;
  }

  protected revert(key: string): void {
    const original = this.designerService.originalValueAt(`primitive.${key}`);
    if (original !== undefined) {
      this.setPalette(key, structuredClone(original));
    }
  }

  protected onColorChange(event: Event, color: string): void {
    const hex = (event.target as HTMLInputElement).value;
    this.setPalette(color, palette(hex));
  }

  private setPalette(color: string, value: unknown): void {
    this.designerService.designer.update((prev) => ({
      ...prev,
      theme: {
        ...prev.theme!,
        preset: {
          ...prev.theme!.preset,
          primitive: {
            ...prev.theme!.preset.primitive,
            [color]: value,
          },
        },
      },
    }));
    this.designerService.refreshACTokens();
  }
}
