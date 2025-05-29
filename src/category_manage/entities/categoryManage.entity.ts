import { EventCategory } from 'src/event_category/entities/eventCategory.entity';
import { EventEntity } from 'src/event_entity/entities/eventEntity.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category_manage')
export class CategoryManage {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => EventCategory)
  @JoinColumn({ name: 'event_category_id' })
  eventCategory: EventCategory;

  @ManyToOne(() => EventEntity)
  @JoinColumn({ name: 'event_id' })
  eventEntity: EventEntity;
}
