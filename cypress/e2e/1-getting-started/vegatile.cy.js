describe("Abrir Aplicación Correctamente", () => {
  beforeEach(() => {
    cy.visitarURL("/login");
  });

  it("Index Correcto", function () {
    cy.contains("Bienvenido a Vetagile App").should("be.visible");
  });
});

describe("Login Incorrecto", () => {
  beforeEach(() => {
    cy.visitarURL("/login");
  });

  it("Email/contraseña faltante", function () {
    cy.contains("Iniciar sesión").click();
    cy.contains("Email es obligatorio.").should("be.visible");
    cy.contains("Contraseña es obligatorio.").should("be.visible");
  });
});

describe("Login Correcto", () => {
  beforeEach(() => {
    cy.visitarURL("/login");
  });

  it("Contraseña Correcta", function () {
    cy.logIn("ludk17@gmail.com", "123456qwerty");
  });
});

describe("Especies/Razas", () => {
  beforeEach(() => {
    cy.visitarURL("/login");
    cy.logIn("ludk17@gmail.com", "123456qwerty");
    cy.visitarURL("/admin/species");
    cy.contains("Administración").should("be.visible");
  });
  it("Buscar Especies", function () {
    cy.get("input[name='query.name']").type("mono");
    cy.contains("Buscar").click();
    cy.wait(1000);
    cy.get("table td").eq(1).invoke("text").should("contain", "Mono");
  });
  it("Crear Especies", function () {
    cy.contains("Crear Especie").click();
    cy.get("input[name='form.name']").type("1 Especie");
    cy.contains("Guardar").click();
  });
  it("Mostrar Especies", function () {
    cy.wait(1000);
    cy.get("table tr")
      .eq(1)
      .find("td")
      .eq(1)
      .invoke("text")
      .should("contain", "1 Especie");
  });
  it("Editar Especie", function () {
    cy.wait(1000);
    cy.get("table tr").eq(1).find("a").contains("Editar").click();
    cy.get("input[name='form.name']").clear().type("1 Especie 1.1");
    cy.contains("Guardar").click();
    cy.wait(1000);
    cy.get("table tr")
      .eq(1)
      .find("td")
      .eq(1)
      .invoke("text")
      .should("contain", "1 Especie 1.1");
  });
  it("Eliminar Servicio", function () {
    cy.wait(1000);
    cy.get("table tr").eq(1).find("a").last().click();
    cy.get("button").contains("Eliminar").click();
  });
});

describe("Razas", () => {
  beforeEach(() => {
    cy.visitarURL("/login");
    cy.wait(1000);
    cy.logIn("ludk17@gmail.com", "123456qwerty");
    cy.visitarURL("/admin/species");
    cy.contains("Administración").should("be.visible");

    cy.get("table td").eq(2).find("a").first().click();
    cy.contains("Razas").should("be.visible");
    cy.get(":nth-child(1) > .form-group > .form-control").select("number:2");
    cy.wait(1000);
    cy.contains("Buscar").click();
    cy.wait(1000);
  });
  it("Ver razas canino", function () {
    cy.get("table td").eq(2).invoke("text").should("contain", "Canino");
  });
  it("Editar razas/Incorrecto", function () {
    cy.get("table td").eq(3).find("a").first().click();
    cy.get("input[name='form.name']").clear();
    cy.contains("Guardar").click();
    cy.contains("Nombre es obligatorio.").should("be.visible");
  });

  it("Editar razas/Correcto", function () {
    cy.get("table td").eq(3).find("a").first().click();
    cy.get("input[name='form.name']").clear().type("Canino 2");
    cy.contains("Guardar").click();
    cy.get("table td").eq(1).invoke("text").should("contain", "Canino 2");
  });

  it("Crear razas/Correcto", function () {
    cy.contains("Nueva Raza").click();
    cy.get(".input-group-btn > .btn").click();
    cy.get("#ui-id-3").click();
    cy.get("input[name='form.name']").clear().type("1 Canino Prueba");
    cy.contains("Guardar").click();
    cy.get("table td")
      .eq(1)
      .invoke("text")
      .should("contain", "1 Canino Prueba");
  });

  it("Eliminar razas", function () {
    cy.get("table td").eq(3).find("a").last().click();
    cy.get("button").contains("Eliminar").click();
  });
});

describe("Servicios de Veterinaria", () => {
  beforeEach(() => {
    cy.visitarURL("/login");
    cy.wait(1000);
    cy.logIn("ludk17@gmail.com", "123456qwerty");
    cy.visitarURL("/admin/services");
    cy.contains("Administración").should("be.visible");
  });

  it("Crear Nuevo servicio", function () {
    cy.contains("Nuevo Servicio").click();
    cy.get("input[name='form.name']").type("Servicio 1");
    cy.get("input[name='form.default_price']").type("85");
    cy.contains("Guardar").click();
  });
  it("Mostrar Servicio", function () {
    cy.wait(1000);
    cy.get("table tr")
      .eq(2)
      .find("td")
      .eq(1)
      .invoke("text")
      .should("contain", "Servicio 1");
  });
  it("Editar Servicio", function () {
    cy.wait(1000);
    cy.get("table tr").eq(2).find("a").first().click();
    cy.get("input[name='form.name']").clear().type("Servicio 1.1");
    cy.get("input[name='form.default_price']").type("85");
    cy.contains("Guardar").click();
    cy.wait(1000);
    cy.get("table tr")
      .eq(2)
      .find("td")
      .eq(1)
      .invoke("text")
      .should("contain", "Servicio 1.1");
  });
  it("Eliminar Servicio", function () {
    cy.wait(1000);
    cy.get("table tr").eq(2).find("a").last().click();
    cy.get("button").contains("Eliminar").click();
  });
});

describe("Baño y Peluqería", () => {
  beforeEach(() => {
    cy.visitarURL("/login");
    cy.wait(1000);
    cy.logIn("ludk17@gmail.com", "123456qwerty");
    cy.visitarURL("/admin/grooming");
    cy.contains("Administración").should("be.visible");
  });

  it("Crear Nuevo servicio", function () {
    cy.contains("Nuevo Servicio").click();
    cy.get("input[name='form.name']").type("Baño 1");
    cy.get("input[name='form.default_price']").type("85");
    cy.contains("Guardar").click();
  });
  it("Mostrar Servicio", function () {
    cy.wait(1000);
    cy.get("table tr")
      .eq(1)
      .find("td")
      .eq(1)
      .invoke("text")
      .should("contain", "Baño 1");
  });
  it("Editar Servicio", function () {
    cy.wait(1000);
    cy.get("table tr").eq(1).find("a").first().click();
    cy.get("input[name='form.name']").clear().type("Baño 1.1");
    cy.get("input[name='form.default_price']").type("85");
    cy.contains("Guardar").click();
    cy.wait(1000);
    cy.get("table tr")
      .eq(1)
      .find("td")
      .eq(1)
      .invoke("text")
      .should("contain", "Baño 1.1");
  });
  it("Eliminar Servicio", function () {
    cy.wait(1000);
    cy.get("table tr").eq(1).find("a").last().click();
    cy.get("button").contains("Eliminar").click();
  });
});
