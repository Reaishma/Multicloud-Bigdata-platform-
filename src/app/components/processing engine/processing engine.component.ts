import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessingEngine } from '../../models/platform.model';

@Component({
  selector: 'app-processing-engine',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="processing-engine">
      <button 
        *ngFor="let engine of engines"
        class="engine-btn"
        [class]="engine.id"
        [class.active]="currentEngine === engine.id"
        (click)="selectEngine(engine.id)">
        <i [class]="engine.icon"></i>
        {{ engine.name }}
      </button>
    </div>
  `,
  styles: [`
    .processing-engine {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
    }

    .engine-btn {
      flex: 1;
      padding: 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      &.hadoop { 
        background: var(--hadoop-yellow); 
        color: #333; 
      }
      
      &.spark { 
        background: var(--spark-orange); 
        color: white; 
      }
      
      &.active { 
        transform: scale(1.05); 
      }

      &:hover {
        opacity: 0.9;
      }
    }

    @media (max-width: 768px) {
      .processing-engine {
        flex-direction: column;
        gap: 10px;
      }
      
      .engine-btn {
        padding: 15px;
        font-size: 0.9rem;
      }
    }
  `]
})
export class ProcessingEngineComponent {
  @Input() currentEngine: ProcessingEngine = 'hadoop';
  @Output() engineChanged = new EventEmitter<ProcessingEngine>();

  engines = [
    { id: 'hadoop' as ProcessingEngine, name: 'Hadoop MapReduce', icon: 'fas fa-server' },
    { id: 'spark' as ProcessingEngine, name: 'Apache Spark', icon: 'fas fa-bolt' }
  ];

  selectEngine(engine: ProcessingEngine): void {
    this.engineChanged.emit(engine);
  }
}