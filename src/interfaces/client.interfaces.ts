import { z } from "zod";
import {
  clientContactSchemaResponse,
  clientInfoSchemaResponse,
  clientListAllSchema,
  clientSchema,
  clientSchemaRequest,
  clientSchemaResponse,
} from "../schemas/client.schema";
import { DeepPartial } from "typeorm";

type TClient = z.infer<typeof clientSchema>;
type TClientRequest = z.infer<typeof clientSchemaRequest>;
type TClientResponse = z.infer<typeof clientSchemaResponse>;
type TClientContactResponse = z.infer<typeof clientContactSchemaResponse>;
type TClientUpdateRequest = DeepPartial<TClientRequest>;
type TClientListAll = z.infer<typeof clientListAllSchema>;
type TClientAllContactResponse = z.infer<typeof clientInfoSchemaResponse>;

export {
  TClient,
  TClientRequest,
  TClientResponse,
  TClientUpdateRequest,
  TClientContactResponse,
  TClientListAll,
  TClientAllContactResponse,
};
