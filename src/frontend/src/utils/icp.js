import { TravelDeskCanister } from "./canister";
import { getAuthClient } from "./auth";

export async function Contract(){
    const authClient = await getAuthClient();
    window.auth = {};
    window.canister = {};
    window.auth.client = authClient;
    window.auth.isAuthenticated = await authClient.isAuthenticated();
    window.auth.identity = authClient.getIdentity();
    window.auth.principal = authClient.getIdentity()?.getPrincipal();
    window.auth.principalText = authClient.getIdentity()?.getPrincipal().toText();
    window.canister.TravelDeskApi= await TravelDeskCanister();
}