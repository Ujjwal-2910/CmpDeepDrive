import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online');
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log(this.currentStatus());
    });
  }

  ngOnInit() {
    console.log('ON INIT');
    const interval = setInterval(() => {
      const rand = Math.random();

      if(rand < 0.5) {
        this.currentStatus.set('online');
      } else if(rand < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    })
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT');
  }
}
