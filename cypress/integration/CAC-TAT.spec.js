// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe ('Central de Atendimento ao Cliente TAT', function() {

    //Visita o site inicial antes de todos os testes

    beforeEach(function() {
        cy.visit('/src/index.html')
    })

    it('verifica o título da aplicação', function() {
        
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {

        const LongText = 'teste, teste, teste, teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste'

        cy.get('input[id="firstName"]')
        .type('Luiz')
    
        cy.get('input[id="lastName"]')
        .type('Lucena')

        cy.get('input[id="email"]')
        .type('lg@lg.com')

        cy.get('textarea[id="open-text-area"]')
        .type(LongText, {delay: 0})

        cy.contains('button', 'Enviar')
        .click()

        cy.get('span[class="success"]')
        .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        
        cy.get('input[id="firstName"]')
        .type('Luiz')
    
        cy.get('input[id="lastName"]')
        .type('Lucena')

        cy.get('input[id="email"]')
        .type('lg@lg,com')

        cy.get('textarea[id="open-text-area"]')
        .type('Teste')

        cy.contains('button', 'Enviar')
        .click()

        cy.get('.error')
        .should('be.visible')
  
    })

    it('campo telefone continua vazio quando preenchido com valor nao numerico', function() {

        cy.get('#phone')
            .type('sadsadsadsa')
            .should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

        cy.get('input[id="firstName"]').type('Luiz')
    
        cy.get('input[id="lastName"]').type('Lucena')

        cy.get('input[id="email"]').type('lg@lg.com')

        cy.get('#phone-checkbox').check()

        cy.get('textarea[id="open-text-area"]').type('Teste')

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {

        cy.get('input[id="firstName"]').type('Luiz').should('have.value', 'Luiz')

        cy.get('input[id="firstName"]').clear().should('have.value', '')
    
        cy.get('input[id="lastName"]').type('Lucena').should('have.value', 'Lucena')

        cy.get('input[id="lastName"]').clear().should('have.value', '')

        cy.get('input[id="email"]').type('lg@lg.com').should('have.value', 'lg@lg.com')

        cy.get('input[id="email"]').clear().should('have.value', '')

        cy.get('#phone').type('1155555555').should('have.value', '1155555555')

        cy.get('#phone').clear().should('have.value', '') 
        
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('span[class="success"]')
        .should('be.visible')
        
    })

    it('seleciona um produto (YouTube) por seu texto', function() {

        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
        
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {

        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
        
    })

    it('seleciona um produto (Blog) por seu índice', function() {

        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
        
    })

    it('marca o tipo de atendimento "Feedback', function() {

            cy.get('input[value="feedback"]')
            .check()
            .should('have.value', 'feedback')
        
    })

    it('marca cada tipo de atendimento', function() {

        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {

        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        
    })

    it('seleciona um arquivo da pasta fixtures', function() {

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')

            })
        
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')

            })
        
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {

        cy.fixture('example.json').as('SampleFile')
        cy.get('input[type="file"]')
            .selectFile('@SampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
        
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {

        cy.get('#privacy a').should('have.attr', 'target', '_blank')
            
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {

        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

})