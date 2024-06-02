export class WarehouseItem {
  #state = "arriving";
  #locationId = null;
  #address = null;
  #states;

  constructor(id, initialState) {
    this.id = id;
    this.#state = initialState; // arriving, stored, delivered
    this.#locationId = null;
    this.#address = null;
    this.#states = {
      arriving: new ArrivingState(
        this.#changeState.bind(this),
        this.#setLocationId.bind(this)
      ),
      stored: new StoredState(
        this.#changeState.bind(this),
        this.#setLocationId.bind(this),
        this.#setAddress.bind(this)
      ),
      delivered: new DeliveredState(),
    };
  }

  describe() {
    switch (this.#state) {
      case "arriving":
        return `Item ${this.id} is on its way to the warehouse.`;
      case "stored":
        return `Item ${this.id} is stored in location ${this.#locationId}.`;
      case "delivered":
        return `Item ${this.id} was delivered to ${this.#address}.`;
    }
  }

  #changeState(state) {
    if (["arriving", "stored", "delivered"].includes(state)) {
      if (this.#state === state) {
        return;
      }

      if (state === "arriving") {
        throw new Error("Cannot transition to arriving state.");
      }

      if (this.#state === "delivered" && state === "stored") {
        throw new Error("Cannot transition from delivered to stored.");
      }

      this.#state = state;
    } else {
      throw new Error("Invalid state:", state);
    }
  }

  #setLocationId(locationId) {
    this.#locationId = locationId;
  }

  #setAddress(address) {
    this.#address = address;
  }

  store(locationId) {
    this.#states[this.#state].store(locationId);
  }

  deliver(address) {
    this.#states[this.#state].deliver(address);
  }
}

class ArrivingState {
  constructor(changeState, setLocationId) {
    this.changeState = changeState;
    this.setLocationId = setLocationId;
  }

  store(locationId) {
    this.changeState("stored");
    this.setLocationId(locationId);
  }

  deliver(address) {
    throw new Error("Cannot deliver an item that hasn't been stored.");
  }
}

class StoredState {
  constructor(changeState, setLocationId, setAddress) {
    this.changeState = changeState;
    this.setLocationId = setLocationId;
    this.setAddress = setAddress;
  }

  store(locationId) {
    throw new Error("Item is already stored.");
  }

  deliver(address) {
    this.changeState("delivered");
    this.setLocationId(null);
    this.setAddress(address);
  }
}

class DeliveredState {
  store(locationId) {
    throw new Error("Item has already been delivered.");
  }

  deliver(address) {
    throw new Error("Item has already been delivered.");
  }
}
