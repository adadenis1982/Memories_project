'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('postMessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: { 
        type: Sequelize.STRING 
      },
      message: { 
        type: Sequelize.STRING 
      },
      name: { 
        type: Sequelize.STRING 
      },
      creator: { 
        type: Sequelize.STRING 
      },
      tags: { 
        type: Sequelize.ARRAY(Sequelize.STRING) 
      },
      selectedFile: { 
        type: Sequelize.TEXT 
      },
      likes: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      comments: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('postMessages');
  }
};
