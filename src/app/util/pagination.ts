export interface SortQuery {
    property: string,
    direction: string
}

export interface PageQuery {
    pageNumber: number,
    pageSize: number
}

export interface QueryBuilder {
    pageQuery: PageQuery;
   // sortQuery: SortQuery;
    aditionalQuery: Map<string, string>;
    buildQueryMap(): Map<string, string>;
    buildQueryString(): string;
    buildPageQueryMap(): Map<string, string>;
 //   buildSortQueryMap(): Map<string, string>;
}



export class PageRequest implements QueryBuilder {

    constructor(public pageQuery: PageQuery, public aditionalQuery: Map<string, string>) { }
       

    buildQueryMap(): Map<string, string> {

        let buildQueryMap = new Map<string, string>([...this.buildPageQueryMap()]);

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
        // this.pageQuery.pageNumber = this.pageQuery.pageNumber * this.pageQuery.pageSize

        buildPageQueryMap.set("offset", `${(this.pageQuery.pageNumber)}`);
        buildPageQueryMap.set("limit", `${this.pageQuery.pageSize}`);

        return buildPageQueryMap;

    }

}

export class Page<T> {

    constructor(public content: T[], public totalElements: number){}

    static fromResponse<T>(response:any){
        return new Page<T>(response.body, parseInt(response.body));
    }
    
}