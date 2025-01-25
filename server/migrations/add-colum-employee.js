module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'Employees', 
        'employeeGender', 
        {
          type: Sequelize.STRING,
          allowNull: false, 
        }
      );
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Employees', 'employeeGender');
    }
  };
  