import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './core/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, 
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [AuthService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'prueba-angular' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('prueba-angular');
  });


  // Podemos agregar más pruebas específicas para la funcionalidad de autenticación
  it('should have AuthService injected', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const authService = fixture.debugElement.injector.get(AuthService);
    expect(authService).toBeTruthy();
  });
});