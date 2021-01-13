import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert} from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export default class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @BeforeInsert()
    async saveEncryptedPassword() {
    this.password = await bcrypt.hash(this.password, 5);
  }

  comparePassword(password: string): boolean {
    return bcrypt.compare(password, this.password);
  }

  static async register(
    email: string,
    password: string,
    username: string
  ): Promise<User | undefined> {
    
    const { id } = (
      await this.createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            email,
            password,
            username,
          }
        ])
        .execute()
    ).identifiers[0]; 
    return this.findOne({ id });
  }

  static async changeInfo(id: number, data: object): Promise<User | boolean> {
    const result = await this.createQueryBuilder()
      .update(User)
      .set(data)
      .where("id = :id", { id })
      .execute();

    if (result.raw.affectedRows === 0) {
      return false;
    }

    return this.findOne({ id });
  }

}
