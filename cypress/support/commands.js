// Vegatile
Cypress.Commands.add("visitarURL", (ruta) => {
  const url = `http://demo.vetagile.com${ruta}`;
  cy.visit(url);
});

Cypress.Commands.add("logIn", (correo, contraseña) => {
  cy.get("input[name='email']").type(correo);
  cy.get("input[name='password']").type(contraseña);
  cy.contains("Iniciar sesión").click();
  cy.contains("Dashboard").should("be.visible");
});
