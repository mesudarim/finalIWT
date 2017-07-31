export class Event {
  //public id: number = null;
  public eventOwner: string = "";
  public eventName: string = "";
  public when : Date;
  public duration : string;
  public place: any = {};
  public imageUrl: string = "";
  public users = [];
  public galery = [];
  //public chat = [];


  constructor(eventName, when, duration, eventOwner, place) {
    //this.id = id;
    this.eventOwner = eventOwner;
    this.eventName = eventName;
    this.when = when;
    this.duration = duration;
    this.place = place;
  }
}
