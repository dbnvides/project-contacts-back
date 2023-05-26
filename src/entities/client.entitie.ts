import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from "typeorm";
import { Contact } from "./contact.entitie";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 200 })
  fullName: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @Column({ type: "varchar", length: 11 })
  telephone: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string | Date;

  @OneToMany(() => Contact, (contacts) => contacts.client)
  contacts: Contact[];
}

export { Client };
