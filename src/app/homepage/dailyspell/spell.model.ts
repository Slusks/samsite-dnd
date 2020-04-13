export interface spell {
	"id": string;
	"index": string;
	"name": string;
	"desc": Array<string>;
	"range": string;
	"components": Array<string>;
	"material": string;
	"ritual": boolean;
	"duration": string;
	"concentration": boolean;
	"casting_time": string;
	"level": number;
	"school": {
		"name": string;
		"url": string;
	};
	"classes":Array<any>;
	"subclasses":Array<any>;
	"url": string
}