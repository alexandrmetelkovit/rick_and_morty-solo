describe('Rick and Morty Characters Page', () => {
  beforeEach(() => {
    // 1️⃣ МОК ЗАПРОСА - просто указываем фикстуру
    cy.intercept('GET', '**/api/character*', {
      fixture: 'characters.json' // ← просто фикстура, без колбэка
    }).as('getCharacters');

    cy.visit('/rick_and_morty-solo/');
  });

  it('должен отобразить 5 персонажей', () => {
    cy.wait('@getCharacters');
    cy.get('[data-testid="characterCard"]').should('have.length', 5);
  });

  // 3️⃣ ПРОВЕРКА КОЛИЧЕСТВА ПЕРСОНАЖЕЙ
  it('должен отобразить ровно 5 персонажей', () => {
    cy.wait('@getCharacters');
    cy.get('[data-testid="characterCard"]').should('have.length', 5);
  });

  // 4️⃣ ПРОВЕРКА ИМЁН ПЕРСОНАЖЕЙ
  it('должен отобразить правильные имена из фикстуры', () => {
    cy.wait('@getCharacters');

    // Проверяем каждое имя
    cy.contains('Rick Sanchez').should('be.visible');
    cy.contains('Morty Smith').should('be.visible');
    cy.contains('Summer Smith').should('be.visible');
    cy.contains('Beth Smith').should('be.visible');
    cy.contains('Jerry Smith').should('be.visible');
  });

  // 5️⃣ ПРОВЕРКА ФИЛЬТРАЦИИ ПО ИМЕНИ
  it('должен фильтровать персонажей по имени', () => {
    // Мок для поиска "Rick"
    cy.intercept('GET', '**/api/character?*name=Rick*', {
      fixture: 'filtered-rick.json' // отдельная фикстура с одним Rick
    }).as('filterRick');

    cy.wait('@getCharacters');

    // Вводим "Rick" в поле поиска
    cy.get('input[placeholder*="Filter by name"]').type('Rick');

    // Ждём запрос с фильтром
    cy.wait('@filterRick');

    // Проверяем что остался только Rick
    cy.get('[data-testid="characterCard"]').should('have.length', 1);
    cy.contains('Rick Sanchez').should('be.visible');
    cy.contains('Morty Smith').should('not.exist');
  });
});
