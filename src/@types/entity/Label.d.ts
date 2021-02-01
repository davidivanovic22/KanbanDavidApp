import { Identifiable } from "./Identifiable";
import { Task } from  "./Task"

export interface Label extends Identifiable {
	id: number;
	name: string;
	tasks: Task[];
}