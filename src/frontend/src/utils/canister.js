import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/backend/backend.did.js"

//change this Canister 
const TravelDeskCANISTER_ID = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
const HOST = "http://localhost:8000"

export const TravelDeskCanister=async()=>{
 return await getCanister(TravelDeskCANISTER_ID,idlFactory);
}

async function getCanister(canisterId, idl) {
  const authClient = window.auth.client;
  const agent = new HttpAgent({
    host: HOST,
    identity: authClient.getIdentity(),
  });
  await agent.fetchRootKey(); // This is equivalent to await agent.fetchRootKey() in the previous example
  return Actor.createActor(idl, {
    agent,
    canisterId,
  });
}