class Appointment {
  public id?: number;
  schedule_at: Date;
  serviceId: string;
  customerId: string;
  status: string;

  constructor(
    schedule_at: Date,
    serviceId: string,
    customerId: string,
    status: string
  ) {
    this.schedule_at = schedule_at;
    this.serviceId = serviceId;
    this.customerId = customerId;
    this.status = status;
  }
}

export { Appointment };
