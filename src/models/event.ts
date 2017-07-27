export class Event {
  //public id: number = null;
  public eventOwner: string = "";
  public eventName: string = "";
  public startDate : Date;
  public duration : string;
  public place: any = {};
  public imageUrl: string = "";
  public users = [];
  public galery = [];
  //public chat = [];


  constructor(eventName, startDate, duration, eventOwner, place) {
    //this.id = id;
    this.eventOwner = eventOwner;
    this.eventName = eventName;
    this.startDate = startDate;
    this.duration = duration;
    this.place = place;
  }
}
