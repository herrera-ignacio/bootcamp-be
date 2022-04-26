import {
  IsNotEmpty,
  IsInt,
} from "class-validator";
import { BookingCreateBody } from "../../types/Booking/BookingCreateRequest";

/*
 * Validate slot body create request
 */

export default class BookingCreateBodyValidator implements BookingCreateBody {
  [x: string]: string | number,

  @IsNotEmpty()
  @IsInt()
  public slotId: number;

  @IsNotEmpty()
  public startDate: string;

  @IsNotEmpty()
  public endDate: string;

}
