import UserModel from "@/models/userModel";

export class AccountInfoManager {
  #userdata: string;

  constructor(userdata: string) {
    this.#userdata = userdata;
  }

  async getAccountInfo(
    request: Request,
    { params }: { params: { accountid: string } }
  ) {
    try {
      const d = await UserModel.findById(params.accountid);
    } catch (err: any) {}
  }
  async UpdateAccountInfo() {
    try {
      const d = await UserModel.findByIdAndUpdate();
    } catch (err: any) {}
  }
}
