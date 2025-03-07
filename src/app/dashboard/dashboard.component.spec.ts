import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('Dashboard Tests', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeAll(() => {
    console.log('beforeAll');
  });

  beforeEach(async () => {
    console.log('beforeEach');
    /*await TestBed.configureTestingModule({
          imports: [DashboardComponent],
          declarations: [DashboardComponent]
        }).compileComponents();*/
  });

  it('should create', () => {
    console.log('test 1');

    const value1 = Math.random();
    const value2 = Math.random();

    expect(suma(value1, value2)).toEqual(value1 + value2);

    
  });

  it('show title', () => {
    console.log('test 2');    
  });

  afterAll(() => {
    console.log('afterAll');
  });
  afterEach(() => {
    console.log('afterEach');
  });

  function suma(a: number, b: number): number {
    return a + b;
  }
});
