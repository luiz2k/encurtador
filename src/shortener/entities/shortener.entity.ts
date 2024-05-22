import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'shortener' })
export class ShortenerEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  url: string;

  @Column()
  shortened_url: string;

  @Column()
  visits: number;

  @Column()
  created_at: number;
}
