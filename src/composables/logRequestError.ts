import {AxiosError} from "axios";

export default function logRequestError(methodName: string, err: AxiosError | unknown): void {
  console.error(`Error in method ${methodName}: ${err instanceof Error ? err.message : String(err)}`);
}
