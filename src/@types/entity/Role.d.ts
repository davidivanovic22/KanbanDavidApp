import { Identifiable } from "./Identifiable";
import { User } from  "./User"

export interface Role extends Identifiable {
	id: number;
	name: string;
	users: User[];
}