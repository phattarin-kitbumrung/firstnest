import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Timestamp } from 'rxjs';

@Entity()
export class Forecast {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  ts: Date;

  @Column()
  province: string;

  @Column()
  climate: string;

  @Column()
  lowTemp: string;

  @Column()
  highTemp: string;  
}