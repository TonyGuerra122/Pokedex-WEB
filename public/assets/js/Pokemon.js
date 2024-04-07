export default class Pokemon {
  constructor(data) {
    this.data = data;
  }

  render(domLocation) {
    const { name, id, image } = domLocation;

    if (this.data === null) {
      id.innerHTML = "0";
      name.innerHTML = "Not Found :C";
      image.src = "/public/images/Question-Mark.png";
      return;
    }

    name.innerHTML = this.data.name ?? "Not Found :";
    id.innerHTML = this.data.id ?? "0";
    image.src =
      this.data["sprites"]["versions"]["generation-v"]["black-white"][
        "animated"
      ]["front_default"];
  }
}
