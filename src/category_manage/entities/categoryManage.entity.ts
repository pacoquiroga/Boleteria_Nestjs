import { EventCategory } from "src/event_category/entities/eventCategory.entity";
import { EventEntity } from "src/event_entity/entities/eventEntity.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('category_manage')
export class CategoryManage {
    @PrimaryGeneratedColumn({ name: 'id_category_manage' })
    idCategoryManage: number;

    @ManyToOne(() => EventCategory)
    @JoinColumn({ name: 'id_event_category' })
    eventCategory: EventCategory;

    @ManyToOne(() => EventEntity)
    @JoinColumn({ name: 'id_event' })
    eventEntity: EventEntity;
}
