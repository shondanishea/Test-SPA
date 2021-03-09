import html from "html-literal";

export default (st) => html`
<nav>
  <i class="fas fa-bars"></i>
   <ul class="hidden--mobile nav-links">
    ${st
      .map(
        (link) => `<li><a href="/${link.title}" data-navigo>${link.title}</a></li>`
      )
      .join()}
    </ul>
  </ul>
</nav>
`;


