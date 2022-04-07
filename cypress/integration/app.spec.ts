context('Data Table Functionality', () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000");
    waitForFetchingData();
	});

  const waitForFetchingData = () => {
    cy.log('Waiting for the data to be fetched from the backend Server');
    cy.intercept('getData').as('getData');
    cy.wait('@getData');
  };

  it('Data Fetched from the API Successfully', () => {
    cy.log('Assert that Data Table does not have data-error attribute to confirm Data has been fetched successfully!');
		cy.get("div.PageIndex").should('not.attr', 'data-error', 'true');  
  });

  it('Check if Data Table has rows', () => {
    cy.log('Assert if Data Table has data samples for the data to be visualized!');
    cy.get(".DataTable").find("tr[data-sample-name]").its('length').should('be.gte', 2)
  });

  it('Check if Sorting works by Metric Name', () => {
    const original : any= [];
    const sorted : any = [];
    cy.log('Obtaining all metric names inside an array');
    cy.get('td.MetricColumn').each(sample => {original.push(sample.text())});
    cy.get('th.SortMetric').click();
    cy.log('Obtaining all metric names after sorting button has been clicked');
    cy.get('td.MetricColumn').each(sample => {sorted.push(sample.text())}).then(() => {
      const sortedTest = original.sort((a : any, b : any) => {
        if (a.toUpperCase() < b.toUpperCase()) {
          return -1;
        }
        return 1;
      });
      cy.log('Assert that sorted array programatically and from the UI is same');
      expect(sorted).to.eql(sortedTest);
    });
  });

  it('Check if Graph is empty at the start', () => {
    cy.log('Assert that Graph does have data-empty-graph attribute to confirm Graph is empty!');
    cy.get("div.GraphChart").should('have.attr', 'data-empty-graph', 'true');  

  });

  it('Check if Graph Populates after selecting metric', () => {
    cy.get("div.GraphChart").should('have.attr', 'data-empty-graph', 'true');  
    cy.log('Click on the input for the Metric to confirm if it\'s visible on the Graph');
    cy.get('.DataTable').find("tr[data-sample-name]").first().find('input').check();
    cy.get("div.GraphChart").should('not.attr', 'data-empty-graph', 'true');  

  });
});