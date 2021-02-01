import { Identifiable } from "./Identifiable";
import { Project } from  "./Project"
import { Status } from  "./Status"
import { User } from  "./User"
import { Label } from  "./Label"

export interface Task extends Identifiable {
	id: number;
	projectId: Project;
	statusId: Status;
	userId: User;
	name: string;
	description: string;
	dueDate: Date;
	labels: Label[];
}