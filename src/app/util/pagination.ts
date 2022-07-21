export interface SortQuery {
    property: string,
    direction: string,
    sort:string,
    order:boolean
}

export interface PageQuery {
    pageNumber: number,
    pageSize: number
}

export interface QueryBuilder {
    pageQuery: PageQuery;
    sortQuery: SortQuery;
    aditionalQuery: Map<string, string>;
    buildQueryMap(): Map<string, string>;
    buildQueryString(): string;
    buildPageQueryMap(): Map<string, string>;
    buildSortQueryMap(): Map<string, string>;
    buildSortQueryMap2(): Map<string, string>;
}



export class PageRequest implements QueryBuilder {

    constructor(public pageQuery: PageQuery,
                public sortQuery: SortQuery,
                public aditionalQuery: Map<string, string>,
                public offset: number
                ) { }
   
    buildQueryMap(): Map<string, string> {

        let buildQueryMap = new Map<string, string>([...this.buildPageQueryMap(),...this.buildSortQueryMap(),...this.buildSortQueryMap2()]);

        if (this.aditionalQuery) {
            buildQueryMap = new Map<string, string>([...buildQueryMap, ...this.aditionalQuery])
        }

        return buildQueryMap;
    }

    buildQueryString(): string {

        return Array.from(this.buildQueryMap()).map(itemArray => `${itemArray[0]}=${itemArray[1]}`).join("&");

    }

    buildPageQueryMap(): Map<string, string> {
       

        let buildPageQueryMap = new Map<string, string>();
        this.offset = (this.pageQuery.pageNumber * this.pageQuery.pageSize)

        buildPageQueryMap.set("offset", `${(this.offset)}`);
        buildPageQueryMap.set("limit", `${this.pageQuery.pageSize}`);

        return buildPageQueryMap;

    }
    
    buildSortQueryMap(): Map<string, string> {

        let buildPageQueryMap = new Map<string, string>();

        buildPageQueryMap.set("order", `${this.sortQuery.property}`);
        buildPageQueryMap.set("sort", `${this.sortQuery.direction}`);
       
        return buildPageQueryMap;

    }
    buildSortQueryMap2(): Map<string,string>{

        let buildPageQueryMap = new Map<string,string>();

        if (this.sortQuery.direction == "asc"){
            buildPageQueryMap.set("sort", `${this.sortQuery.sort = "asc"}`);
            buildPageQueryMap.set("asc", `${this.sortQuery.sort = "true"}`);
        }else{
            buildPageQueryMap.set("sort", `${this.sortQuery.sort = "desc"}`);
            buildPageQueryMap.set("desc", `${this.sortQuery.sort = "true"}`);
        }

        return buildPageQueryMap;
    }

}

export class Page<T> {

    constructor(public content: T[], public totalElements: number){}

    static fromResponse<T>(response:any){
        return new Page<T>(response.body, parseInt(response.body));
    }
    
}