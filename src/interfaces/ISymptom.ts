export interface ISymptom {
	name: string,
	description: string,
	isChecked?: boolean
}

export interface ISymptomResponse {
	name: string,
	description: string,
	response?: boolean,
	onDate: Date
}

export interface ISymptomTable {
	name: string,
	description: string,
	response?: boolean
}
