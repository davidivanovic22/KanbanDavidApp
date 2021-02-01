import { Identifiable } from './Identifiable';
import { Project } from './Project';

export interface Status extends Identifiable {
	name?: string;
	projects?: Project[];
}
