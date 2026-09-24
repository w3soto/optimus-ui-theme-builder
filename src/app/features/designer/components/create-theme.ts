import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from '@openng/optimus-ui/button';
import { Dialog } from '@openng/optimus-ui/dialog';

import {
  CUSTOM_STARTER_THEME,
  STARTER_THEMES,
  StarterThemeId,
} from '../../../starter-themes';
import { SavedTheme, SavedThemesService } from '../services/saved-themes.service';
import { ThemeDesignerService } from '../services/theme-designer.service';

@Component({
  selector: 'design-create-theme',
  standalone: true,
  imports: [Button, DatePipe, Dialog, FormsModule],
  templateUrl: './create-theme.html',
  styleUrl: './create-theme.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTheme implements OnInit {
  private readonly designerService = inject(ThemeDesignerService);
  protected readonly savedThemes = inject(SavedThemesService);

  protected readonly starterThemes = [CUSTOM_STARTER_THEME, ...STARTER_THEMES];
  protected readonly themeName = signal('');
  protected readonly selectedStarter = signal<StarterThemeId>('custom');
  protected readonly importValue = signal('');
  protected readonly importError = signal('');
  protected readonly pendingDelete = signal<SavedTheme | null>(null);

  ngOnInit(): void {
    this.selectStarter('custom');
  }

  protected selectStarter(id: StarterThemeId): void {
    const starter = this.starterThemes.find((theme) => theme.id === id);
    if (!starter) {
      return;
    }

    this.selectedStarter.set(starter.id);
    this.designerService.previewThemeFromPreset(starter.name, starter.preset, {
      fontFamily: starter.fontFamily,
      fontSize: starter.fontSize,
    });
  }

  protected create(): void {
    const name = this.themeName().trim();
    if (!name) {
      return;
    }

    const starter = this.starterThemes.find((theme) => theme.id === this.selectedStarter());
    if (!starter) return;

    this.designerService.createThemeFromPreset(name, starter.preset, {
      fontFamily: starter.fontFamily,
      fontSize: starter.fontSize,
    });
  }

  protected openSavedTheme(id: string): void {
    this.designerService.openSavedTheme(id);
  }

  protected confirmDelete(): void {
    const theme = this.pendingDelete();
    if (theme) {
      this.designerService.deleteSavedTheme(theme.id);
    }
    this.pendingDelete.set(null);
  }

  protected onDeleteDialogVisibleChange(visible: boolean): void {
    if (!visible) {
      this.pendingDelete.set(null);
    }
  }

  protected importTheme(): void {
    const value = this.importValue().trim();
    if (!value) {
      return;
    }

    this.importError.set('');
    const success = this.designerService.importTheme(value);
    if (!success) {
      this.importError.set('Invalid theme token. Please check the value and try again.');
    }
  }
}
