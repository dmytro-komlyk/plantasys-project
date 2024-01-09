import { appRouter } from "@server/domain/trpc/trpc.router";
import { httpBatchLink } from "@trpc/client";

import { SERVER_URL, TRPC } from "../../(lib)/constants";

const url = SERVER_URL + "/" + TRPC;

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url,
    }),
  ],
});
