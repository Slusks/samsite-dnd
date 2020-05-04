
export class FirebaseUserModel {
  image: string;
  name: string;
  provider: string;
  role: string;
  thursdayCampaign: Boolean;
  menagerieCoast: Boolean

  constructor(){
    this.image = "";
    this.name = "";
    this.provider = "";
    this.role= "";
    this.thursdayCampaign = true;
    this.menagerieCoast = true;

  }
}