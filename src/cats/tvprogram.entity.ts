import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Timestamp } from 'rxjs';

@Entity()
export class TvProgram {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  categoryId: string;

  @Column()
  cmsId: string;

  @Column()
  status: number;

  @Column()
  title: string;  
}