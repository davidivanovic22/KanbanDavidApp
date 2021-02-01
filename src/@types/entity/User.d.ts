import { Identifiable } from "./Identifiable";
import { Project } from  "./Project"
import { Role } from  "./Role"

export interface User extends Identifiable {
	id: number;
	firstName: string;
	lastName: string;
	profPIC: string;
	email: string;
	username: string;
	password: string;
	projects: Project[];
	roles: Role[];
}