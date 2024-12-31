import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let router: Router;
  let historyBackSpy: jasmine.Spy;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    historyBackSpy = spyOn(window.history, 'back');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 404 title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('404');
  });

  it('should call window.history.back() when clicking back button', () => {
    const backButton = fixture.nativeElement.querySelector('button:first-child');
    backButton.click();
    expect(historyBackSpy).toHaveBeenCalled();
  });

  it('should navigate to home when clicking home button', () => {
    const homeButton = fixture.nativeElement.querySelector('button:last-child');
    homeButton.click();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display error message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('página que estás buscando');
  });
});