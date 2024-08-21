import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, input, OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-nx-table',
  templateUrl: './nx-table.component.html',
  styleUrl: './nx-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxTableComponent<T> implements OnInit, AfterViewInit, AfterContentInit, OnChanges{
  public data = input.required<T[]>();
  @ContentChildren(ChildComponent) children: QueryList<ChildComponent>;


  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  ngAfterContentInit(): void {

  }
  
  

}
