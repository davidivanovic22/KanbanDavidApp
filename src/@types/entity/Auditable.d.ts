import { Identifiable } from "./Identifiable";

export interface Auditable extends Identifiable {
	createdDate: Date;
	lastModifiedDate: Date;
	lastModifiedBy: string;
}