declare global {
  interface ApiResponse<T = BodyInit> {
    success: boolean;
    data?: T;
    error?: string;
  }

  interface IPatient {
    id: string;
    name: string;
  }

  interface IOrder {
    id: string;
    message: string;
  }
}
