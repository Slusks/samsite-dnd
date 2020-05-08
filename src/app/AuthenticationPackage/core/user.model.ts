
export class FirebaseUserModel {
  name: string;
  provider: string;
  role: string;
  thursdayCampaign: Boolean;
  menagerieCoast: Boolean

  constructor(){
    this.name = "";
    this.provider = "";
    this.role= "";
    this.thursdayCampaign = true;
    this.menagerieCoast = true;

  }
}