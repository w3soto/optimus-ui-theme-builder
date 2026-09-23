import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideOptimus } from '@openng/optimus-ui/config';
import Aura from '@openng/optimus-ui-themes/aura';

import { SidebarBadgesPreview } from './sidebar-badges';

describe('SidebarBadgesPreview', () => {
  let component: SidebarBadgesPreview;
  let fixture: ComponentFixture<SidebarBadgesPreview>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarBadgesPreview],
      providers: [provideOptimus({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarBadgesPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 6 menu items', () => {
    const items = el.querySelectorAll('nav a');
    expect(items.length).toBe(6);
  });

  it('should render badges for items that have them', () => {
    const badges = el.querySelectorAll('p-badge');
    expect(badges.length).toBe(3);
  });
});
