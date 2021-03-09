import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";

import Navigo from "navigo";
import { capitalize} from "lodash";

const router = new Navigo(window.location.origin);

// import {
//   AddPicturesToGallery,
//   GalleryPictures,
//   PrintFormOnSubmit
// } from "./lib";

router.on({
  "/": () => render(state.Home),
  ":page": params => {
    let page = capitalize(params.data.page);
    render(state[page]);

  }})
   .resolve();


function render(st = state.Home) {
  console.log(st);
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
`;
router.updatePageLinks();
}



// add menu toggle to bars icon in nav bar document
 document
  .querySelector(".fa-bars")
  .addEventListener("click", () =>
   document.querySelector("nav > ul").classList.toggle("hidden--mobile")
   );

// populating gallery with pictures
const gallerySection = document.querySelector("#gallery");
// using modules to populate gallery with pictures
AddPicturesToGallery(GalleryPictures, gallerySection);

// handle form submission with PrintFormOnSubmit module
const form = document.querySelector("form");
PrintFormOnSubmit(form);
