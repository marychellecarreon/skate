export class Spot {
  constructor(
    public average_rating: number,
    public builder: string,
    public builder_url: string,
    public city : string,
    public country : string,
    public description : string,
    public designer : string,
    public designer_url : string,
    public featured_image : string,
    public features : string,
    public id : number,
    public images : string,
    public latitude : any,
    public longitude : any,
    public name : string,
    public postcode : string,
    public state : string,
    public street_name : string,
    public street_number : string,
    public address : string,
    public school_holidays: boolean
  ) {}
}
