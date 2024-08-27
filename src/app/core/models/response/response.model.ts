export interface RespData<T> {
    success: boolean;
    message: string;
    content: T;
  }

  export interface RespAuth {
    id: string;
    name: string;
    status_id: string;
    email: string;
    photo: string;
    profile_id:string;
    profile: string;
    token: string;
  }