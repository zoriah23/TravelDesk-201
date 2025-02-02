
//activities
export async function addActivity(activity) {
  return window.canister.TravelDeskApi.addActivity(activity);
}

//book activity
export async function bookActivity(activityId, activityCard) {
  return window.canister.TravelDeskApi.bookActivity(activityId, activityCard);
}

//get all activities
export const getActivities = async () => {
  return window.canister.TravelDeskApi.getActivities();
};

//get activity by id
export async function getActivity(activityId) {
  try {
    return await window.canister.TravelDeskApi.getActivity(activityId);
  }
  catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//get activities by location
export async function getActivitiesByLocation(location) {
  try {
    return await window.canister.TravelDeskApi.searchActivities(location);
  }
  catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}
//get activity cards
export async function getActivityCards() {
  try {
    return await window.canister.TravelDeskApi.getActivityCards();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//get activity card for an activity
export async function getActivityCard(adoptionCardId) {
  try {
    return await window.canister.TravelDeskApi.getActivityCard(adoptionCardId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//hotels
//add hotel
export async function addHotel(hotel) {
  return window.canister.TravelDeskApi.addHotel(hotel);
}

//book hotel
export async function bookHotel(hotelId, booking) {
  return window.canister.TravelDeskApi.bookHotel(hotelId, booking);
}

//get all hotels
export async function getHotels() {
  try {
    return await window.canister.TravelDeskApi.getHotels();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//get hotel by id
export async function getHotel(hotelId) {
  try {
    return await window.canister.TravelDeskApi.getHotel(hotelId);
  }
  catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//get hotel cards
export async function getHotelCards() {
  try {
    return await window.canister.TravelDeskApi.getHotelCards();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

 //get hotel card for a hotel
export async function getHotelCard(hotelCardId) {
  try {
    return await window.canister.TravelDeskApi.getHotelCard(hotelCardId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//get hotels by location
export async function getHotelsByLocation(location) {
  try {
    return await window.canister.TravelDeskApi.searchHotels(location);
  }
  catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}


//flights
//add flight
export async function addFlight(flight) {
  return window.canister.TravelDeskApi.addFlight(flight);
}

//book flight
export async function bookFlight(ticket, flightId) {
  return window.canister.TravelDeskApi.bookFlight(ticket, flightId);
}

//get all flights
export async function getFlights() {
  try {
    return await window.canister.TravelDeskApi.getFlights();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//get flight by id
export async function getFlight(flightId) {
  try {
    return await window.canister.TravelDeskAPi.getFlight(flightId);
  }
  catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}


//get tickets
export async function getTickets() {
  try {
    return await window.canister.TravelDeskApi.getTickets();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//get ticket by id
export async function getTicket(ticketId) {
  try {
    return await window.canister.TravelDeskAPi.getTicket(ticketId);
  }
  catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//get tickets by flight id
export async function getTicketsByFlight(flightId) {
  try {
    const tickets = await window.canister.TravelDeskAPi.getTicketsByFlight(
      flightId
    );
    console.log("Fetched tickets:", tickets); // Debugging line
    return tickets;
  } catch (err) {
    console.error("Error fetching tickets:", err); // Log error
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}




//get flights by location
export async function getFlightsByLocation(location) {
  try {
    return await window.canister.TravelDeskAPi.searchFlights(location);
  }
  catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}










