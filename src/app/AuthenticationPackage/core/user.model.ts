
export class FirebaseUserModel {
  image: string;
  name: string;
  provider: string;
  role: Roles;
  thursdayCampaign: Boolean;
  menagerieCoast: Boolean

  constructor(){
    this.image = "";
    this.name = "";
    this.provider = "";
    this.role;
    this.thursdayCampaign;
    this.menagerieCoast;

  }
}

export interface Roles {
  admin?: boolean;
  guest?: boolean;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: string;
  thursdayCampaign: Boolean;
  menagerieCoast: Boolean;

}