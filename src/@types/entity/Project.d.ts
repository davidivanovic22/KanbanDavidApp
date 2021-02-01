import { Identifiable } from "./Identifiable";
import { User } from  "./User"
import { Status } from  "./Status"

export interface Project extends Identifiable {
	id: number;
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	users: User[];
	statuses: Status[];
}