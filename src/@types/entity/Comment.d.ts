import { Identifiable } from "./Identifiable";
import { Task } from  "./Task"

export interface Comment extends Identifiable {
	id: number;
	taskId: Task;
	commentText: string;
}