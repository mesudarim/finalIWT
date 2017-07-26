export class Event {
  public id: number = null;
  public eventOwner: string = "";
  public eventName: string = "";
  public startDate : Date;
  public endDate : Date;
  public place: any = {};
  public imageUrl: string = "";
  public users = [];
  public chat = [];
  public galery = [];



  constructor(id, eventName, startDate, endDate, eventOwner, place) {
    this.id = id;
    this.eventName = eventName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.eventOwner = eventOwner;
    this.place = place;
  }
}
