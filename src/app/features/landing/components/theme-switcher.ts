import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { fromEvent } from 'rxjs';

import { Popover } from '@openng/optimus-ui/popover';
import { ToggleSwitch } from '@openng/optimus-ui/toggleswitch';

import { ThemeStateService } from '../services/theme-state.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [FormsModule, Popover, ToggleSwitch],
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcher implements OnInit {
  protected readonly themeState = inject(ThemeStateService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly popover = viewChild<Popover>('op');
  protected readonly ripple = signal(false);
  protected readonly rtl = signal(false);

  ngOnInit(): void {
    fromEvent(window, 'scroll', { passive: true })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.popover()?.hide());
  }
}
